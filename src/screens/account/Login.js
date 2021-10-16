import React, {Component} from 'react';
import {TextInput} from 'react-native';
import {View, Button} from 'react-native-ui-lib';
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

            <KeyboardAwareScrollView>
                <View style={{height: topSpace, width: UStyle.deviceWidth}}/>

                <View style={[styles.container, {paddingHorizontal: 20}]} onLayout={this.measureComponentHeight}>

                    <FormLogin name={'people-sharp'}>
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

                    <FormLogin name='key-sharp' top>
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

                    <Button backgroundColor="#30B650"
                            label="SIGN IN"
                            labelStyle={{fontWeight: '600'}}
                            style={{marginBottom: ButtonSpace, marginTop: 40, height: 50, borderRadius: 4}}
                            enableShadow
                            onPress={() => navigation.navigate('Root')}
                            fullWidth
                    />

                </View>
            </KeyboardAwareScrollView>
        );
    }
}

/**
 *
 * @param children
 * @param name
 * @param color
 * @param top
 * @constructor
 */
const FormLogin = ({children, name = '', color, top}) => {
    return (
        <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: top ? 20 : 0,
            borderColor: '#6B7B8B',
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: '#FFF',
            paddingHorizontal: 15,
            opacity: 0.7
        }}>
            <Ionicons name={name} size={24} color={color} style={{marginRight: 5}}/>
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
