import React, {Component} from 'react';
import {TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UStyle from "../../system/UStyle";

const ButtonSpace = 20;
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'movies_app',
            password: '123123',

            hidePassword: true,
        };
    }

    /**
     *
     * @param nativeEvent
     */
    measureComponentHeight = ({nativeEvent}) => this.setState({formHeight: nativeEvent.layout.height});


    render() {

        const {username, password, hidePassword, formHeight = 500} = this.state;

        let topSpace = (UStyle.deviceHeight - formHeight) / 2;
        topSpace = topSpace > 0 ? topSpace : 0;

        const {navigation} = this.props;

        return (
            <ImageBackground source={require('../../images/background.jpeg')} resizeMode="cover" style={{flex: 1, height: UStyle.deviceHeight}}>

                <KeyboardAwareScrollView>
                    <View style={{height: topSpace+20+20, width: UStyle.deviceWidth}}/>

                    <View style={[styles.container, {paddingHorizontal: 20}]} onLayout={this.measureComponentHeight}>

                        <FormLogin iconName={'people-sharp'}>
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
                        </FormLogin>

                        <FormLogin iconName={'key-sharp'} top>
                            <TextInput
                                style={{flex: 1, fontSize: 16}}
                                ref={(input) => {
                                    this.passwordTextInput = input;
                                }}
                                placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                                placeholderTextColor='#6B7B8B'
                                textContentType={'password'}
                                returnKeyType={'done'}
                                value={password}
                                secureTextEntry={hidePassword}
                                onChangeText={password => this.setState({password})}
                                onSubmitEditing={() => navigation.navigate('Root')}
                            />
                        </FormLogin>

                        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                                label="SIGN IN"
                                labelStyle={{fontWeight: '600'}}
                                style={{marginTop: 40, height: 50, borderRadius: 4}}
                                onPress={() => navigation.navigate('Root')}
                                fullWidth
                        />

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            }} style={{padding:5, backgroundColor:'rgba(255,255,255,0.9)', borderRadius:4}} >
                                <Ionicons name={'logo-google'} size={30} color={'#4267B2'}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            }} style={{marginLeft: 10, padding:5, backgroundColor:'rgba(255,255,255,0.9)', borderRadius:4}}>
                                <Ionicons name={'logo-facebook'} size={30} color={'#4267B2'}/>
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
const FormLogin = ({children, iconName = '', iconColor, top}) => {
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
    }
})
