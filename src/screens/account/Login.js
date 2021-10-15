import React from 'react';
import {View, Button, TextField} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

const ButtonSpace = 20;
export default function Login({navigation}) {

    return(
        <View style={[styles.container, {paddingHorizontal:20}]}>

            <TextField
                placeholder='Username'
            />

            <TextField
                placeholder='Password'
            />

            <Button backgroundColor="#30B650"
                    label="SUBMIT"
                    labelStyle={{fontWeight: '600'}}
                    style={{marginBottom: ButtonSpace}}
                    enableShadow
                    onPress={()=>navigation.navigate('Root')}
                    fullWidth
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
    }
})
