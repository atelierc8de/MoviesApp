import React, {Component} from 'react';
import {View, TextInput, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import UStyle from "../../system/UStyle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button} from "react-native-ui-lib";

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
            confirmpassword:'',

            hidePassword: true,
        };
    }

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
    //     } else if (!this.state.confirmpassword.trim()){
    //         toast('Your confirm password cannot be empty, please check again!');
    //     }
    //
    //     return true;
    // };
    //
    //
    // /**
    //  *
    //  */
    // onRegister = () => {
    //     const {navigation} = this.props;
    //
    //     if(this.validate()){
    //         if(this.state.password===this.state.confirmpassword){
    //             const user = {
    //                 username: this.state.username,
    //                 password: this.state.password,
    //                 confirmpassword: this.state.confirmpassword
    //             };
    //
    //             // UUser.user.push(user);
    //             AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(user));
    //
    //             toast('Register success!');
    //             navigation.navigate('Login');
    //         } else toast('err!')
    //
    //     }
    // };

    /**
     *
     * @param nativeEvent
     */
    measureComponentHeight = ({nativeEvent}) => this.setState({formHeight: nativeEvent.layout.height});

    render() {

        const {username, password, confirmpassword, hidePassword, formHeight = 500} = this.state;
        let topSpace = (UStyle.deviceHeight - formHeight) / 2;
        topSpace = topSpace > 0 ? topSpace : 0;
        const {navigation} = this.props;

        return(
            <ImageBackground source={require('../../images/background.jpeg')} resizeMode="cover" style={{flex: 1, height: UStyle.deviceHeight}}>
                <View style={{ marginTop: UStyle.statusBarHeight, paddingHorizontal: 10, position:'absolute', zIndex:2 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView>
                    <View style={{height: topSpace+20+20, width: UStyle.deviceWidth}}/>

                    <View style={styles.container} onLayout={this.measureComponentHeight}>

                        <FormRegister iconName={'people-sharp'}>
                            <TextInput
                                style={{flex: 1, fontSize: 16}}
                                placeholder='Enter...'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'emailAddress'}
                                keyboardType={'default'}
                                returnKeyType={'next'}
                                value={username}
                                onChangeText={username => this.setState({username})}
                                onSubmitEditing={() => {
                                    this.passwordTextInput.focus();
                                }}
                            />
                        </FormRegister>

                        <FormRegister iconName={'key-sharp'} top>
                            <TextInput
                                style={{flex: 1, fontSize: 16}}
                                ref={(input) => {
                                    this.passwordTextInput = input;
                                }}
                                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'password'}
                                returnKeyType={'next'}
                                value={password}
                                secureTextEntry={hidePassword}
                                onChangeText={password => this.setState({password})}
                                onSubmitEditing={() => {}}
                            />
                        </FormRegister>

                        <FormRegister iconName={'key-sharp'} top>
                            <TextInput
                                style={{flex: 1, fontSize: 16}}
                                ref={(input) => {
                                    this.passwordTextInput = input;
                                }}
                                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'password'}
                                returnKeyType={'done'}
                                value={confirmpassword}
                                secureTextEntry={hidePassword}
                                onChangeText={confirmpassword => this.setState({confirmpassword})}
                                onSubmitEditing={()=>navigation.navigate('Login')}
                            />
                        </FormRegister>

                        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                                label="REGISTER"
                                labelStyle={{fontWeight: '600'}}
                                style={{marginTop: 40, height: 50, borderRadius: 4}}
                                onPress={()=>navigation.navigate('Login')}
                                fullWidth
                        />

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
const FormRegister = ({children, iconName = '', iconColor, top}) => {
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
            <Ionicons name={iconName} size={24} color={iconColor} style={{marginRight: 5}}/>
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
