import React from 'react';
import {View} from 'react-native';
import {Button} from "react-native-ui-lib";
import {mobxUser} from "../../mobx/mobxUser";

export default function Logout(){

    const logout = () => {
        mobxUser.uID = '';
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                    label="LOGOUT"
                    labelStyle={{fontWeight: '600'}}
                    style={{marginTop: 40, height: 50, borderRadius: 4}}
                    onPress={logout}
            />
        </View>
    );
}
