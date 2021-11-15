import React, { Component } from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import UStyle from "../../system/UStyle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-ui-lib";
import { auth } from '../../../firebaseConfig';
import { toast } from "../../components/common/Toast/Toast";
import {TextInputForm} from "../../components/common/TextInputFilter";

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            hidePassword: true,
        };
    }

    /**
     *
     * @returns {boolean}
     */
    validate = () => {
        if (!this.state.email.trim()) {
            toast('Your email cannot be empty, please check again!');
            return false;
        } else if (!this.state.password.trim()) {
            toast('Your password cannot be empty, please check again!');
            return false;
        }

        return true;
    };

    /**
    *
    */
    register = async () => {
        const { email, password } = this.state;
        try {
            if (this.validate()) {
                await auth.createUserWithEmailAndPassword(email, password);
                this.props.navigation.navigate('Login');
                toast('Register success.');
            }
        } catch (e) {
            toast('Register fail.');
        }
    };

    /**
     *
     * @param nativeEvent
     */
    measureComponentHeight = ({ nativeEvent }) => this.setState({ formHeight: nativeEvent.layout.height });

    render() {

        const { email, password, hidePassword, formHeight = 500 } = this.state;
        let topSpace = (UStyle.deviceHeight - formHeight) / 2;
        topSpace = topSpace > 0 ? topSpace : 0;

        const { navigation } = this.props;

        return (
            <ImageBackground source={require('../../images/background.jpeg')} resizeMode="cover" style={{ flex: 1, height: UStyle.deviceHeight }}>
                <View style={{ marginTop: UStyle.statusBarHeight, paddingHorizontal: 10, position: 'absolute', zIndex: 2 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView>
                    <View style={{ height: topSpace + 20 + 20, width: UStyle.deviceWidth }} />

                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }} onLayout={this.measureComponentHeight}>

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
                                onSubmitEditing={this.register}
                            />
                        </TextInputForm>

                        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                            label="REGISTER"
                            labelStyle={{ fontWeight: '600' }}
                            style={{ marginTop: 40, height: 50, borderRadius: 4 }}
                            onPress={this.register}
                            fullWidth
                        />

                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}
