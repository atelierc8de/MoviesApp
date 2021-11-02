import React, { Component } from 'react';
import { TextInput, TouchableOpacity, ImageBackground, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { View, Button } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UStyle from "../../system/UStyle";
import { auth } from '../../../firebaseConfig';
import {toast} from "../../components/common/Toast";
import UUser from "../../system/UUser";
import { mobxUser } from '../../mobx/mobxUser';
import {TextInputForm} from "../../components/common/Element";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: Login.emailLastTime,
            password: '',

            hidePassword: true,
            isLoginUserLoading: false,
        };
    }

    static emailLastTime = '';

    /**
     *
     * @returns {boolean}
     */
    validate = () => {
        if (!this.state.email.trim()) {
            toast('Your username cannot be empty, please check again!');
            return false;
        } else if (!this.state.password.trim()) {
            toast('Your password cannot be empty, please check again!');
            return false;
        }

        return true;
    };

    /**
     *
     * @returns {Promise<void>}
     */
    login = async () => {
        const { email, password } = this.state;
        try {
            if (this.validate() && !this.state.isLoginUserLoading) {
                this.setState({isLoginUserLoading: true});

                await auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        mobxUser.saveUID(user.uid);
                    })
                Login.emailLastTime = this.state.email;
                // this.setState({});
                toast('Login success.');
            }
            this.setState({isLoginUserLoading: false});
        } catch (error) {
            toast('Login fail.');
        }
    };

    /**
     *
     * @param nativeEvent
     */
    measureComponentHeight = ({ nativeEvent }) => this.setState({ formHeight: nativeEvent.layout.height });


    render() {

        const { email, password, hidePassword, isLoginUserLoading, formHeight = 500 } = this.state;
        let topSpace = (UStyle.deviceHeight - formHeight) / 2;
        topSpace = topSpace > 0 ? topSpace : 0;

        const { navigation } = this.props;

        return (
            <ImageBackground source={require('../../images/background.jpeg')} resizeMode="cover" style={{ flex: 1, height: UStyle.deviceHeight }}>

                <KeyboardAwareScrollView>
                    <View style={{ height: topSpace + 20 + 20, width: UStyle.deviceWidth }} />

                    <View style={styles.container} onLayout={this.measureComponentHeight}>

                        <TextInputForm iconName={'people-sharp'}>
                            <TextInput
                                style={{ flex: 1, fontSize: 16 }}
                                placeholder='Enter...'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'emailAddress'}
                                keyboardType={'default'}
                                returnKeyType={'next'}
                                value={email}
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => {
                                    this.passwordTextInput.focus();
                                }}
                            />
                        </TextInputForm>

                        <TextInputForm iconName={'key-sharp'} top>
                            <TextInput
                                style={{ flex: 1, fontSize: 16 }}
                                ref={(input) => {
                                    this.passwordTextInput = input;
                                }}
                                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'password'}
                                returnKeyType={'done'}
                                value={password}
                                secureTextEntry={hidePassword}
                                onChangeText={password => this.setState({ password })}
                                onSubmitEditing={this.login}
                            />
                        </TextInputForm>

                        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                                label="SIGN IN"
                                labelStyle={{ fontWeight: '600' }}
                                style={{ marginTop: 40, height: 50, borderRadius: 4 }}
                                onPress={this.login}
                                fullWidth
                        >
                            <ActivityIndicator animating={isLoginUserLoading} size="small" color="#FFF" style={{position: 'absolute', right: 50 / 2}}/>
                        </Button>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')} style={{ padding: 5, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4 }} >
                                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }}>Register account?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});
