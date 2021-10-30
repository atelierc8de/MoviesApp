import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from "react-native-ui-lib";
import {firebase} from '../../../firebaseConfig';
import {AuthenticatedUserContext} from "../../navigation/AuthenticatedUserProvider";

const auth = firebase.auth();

export default function Logout(){

    const { user } = useContext(AuthenticatedUserContext);

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (e) {
        }
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text>Email: {user.email}</Text>
            <Text>Your UID is: {user.uid}</Text>

            <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                    label="LOGOUT"
                    labelStyle={{fontWeight: '600'}}
                    style={{marginTop: 40, height: 50, borderRadius: 4}}
                    onPress={logout}
            />
        </View>
    );
}
