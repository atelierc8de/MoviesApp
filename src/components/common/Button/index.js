import {ActivityIndicator} from "react-native";
import React from "react";
import {Button} from 'react-native-ui-lib';
import PropTypes from 'prop-types';

/**
 *
 * @param label
 * @param animating
 * @param onSubmit
 * @param isLoading
 * @constructor
 */
export const CButton = ({label='', animating, onSubmit=()=>{}, isLoading=false}) => {
    return(
        <Button backgroundColor={"rgba(48, 182, 80, 0.8)"}
                label={label}
                labelStyle={{ fontWeight: '600' }}
                style={{ marginTop: 40, height: 50, borderRadius: 4 }}
                onPress={onSubmit}
                fullWidth
        >
            {isLoading?<ActivityIndicator animating={animating} size="small" color="#FFF" style={{position: 'absolute', right: 50 / 2}}/>:null}
        </Button>
    );
};
CButton.propTypes = {
    label: PropTypes.string,
    animating: PropTypes.object,
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
};
