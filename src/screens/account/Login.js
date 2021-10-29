import React, { Component } from 'react';
import { TextInput, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { View, Button } from 'react-native-ui-lib';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UStyle from "../../system/UStyle";
import { auth } from '../../../firebaseConfig';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: Login.usernameLastTime,
            email: 'Nguyen111@gmail.com',
            password: '1234hi',

            userData: {},

            hidePassword: true,
        };
    }

    static usernameLastTime = '';

    // /**
    //  *
    //  * @returns {boolean}
    //  */
    // validate = () => {
    //     if (!this.state.username.trim()) {
    //         toast('Your username cannot be empty, please check again!');
    //         return false;
    //     } else if (!this.state.password.trim()) {
    //         toast('Your password cannot be empty, please check again!');
    //         return false;
    //     }
    //
    //     return true;
    // };
    //
    // componentDidMount() {
    //     this._getUser().then();
    // }
    //
    //
    // _getUser = async () => {
    //     let userData = await AsyncStorage.getItem(ACCESS_TOKEN);
    //     this.setState({userData: JSON.parse(userData)});
    // };
    //
    //
    // login = () => {
    //     const {navigation} = this.props;
    //     const {userData, username, password} = this.state;
    //
    //     if(this.validate()){
    //         if(username===userData.username && password===userData.password){
    //             navigation.navigate('Root');
    //             toast('Login Success');
    //             Login.usernameLastTime = this.state.username;
    //         } else toast('You need register first!');
    //     }
    // };

    onLogin = async () => {
        const { email, password } = this.state;
        try {
            if (email !== '' && password !== '') {
                await auth.signInWithEmailAndPassword(email, password);
                this.props.navigation.navigate('Root');
            }
        } catch (error) {
            setLoginError(error.message);
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

                <KeyboardAwareScrollView>
                    <View style={{ height: topSpace + 20 + 20, width: UStyle.deviceWidth }} />

                    <View style={styles.container} onLayout={this.measureComponentHeight}>

                        <FormLogin iconName={'people-sharp'}>
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
                        </FormLogin>

                        <FormLogin iconName={'key-sharp'} top>
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
                                onSubmitEditing={() => navigation.navigate('Root')}
                            />
                        </FormLogin>

                        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                            label="SIGN IN"
                            labelStyle={{ fontWeight: '600' }}
                            style={{ marginTop: 40, height: 50, borderRadius: 4 }}
                            onPress={this.onLogin}
                            fullWidth
                        />

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

/**
 *
 * @param children
 * @param iconName
 * @param iconColor
 * @param top
 * @constructor
 */
const FormLogin = ({ children, iconName = '', iconColor, top }) => {
    return (
        <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: top ? 20 : 0,
            borderRadius: 4,
            backgroundColor: '#FFF',
            paddingHorizontal: 15,
            opacity: 0.7
        }}>
            <Ionicons name={iconName} size={24} color={iconColor} style={{ marginRight: 5 }} />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    }
})
