import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Button} from 'react-native-ui-lib';
import {color, number, text, boolean} from "@storybook/addon-knobs";

/**
 *
 * @param label
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export const ButtonForm = ({label='SUBMIT', onSubmit=()=>{}}) => {
  return(
      <Button backgroundColor={color('backgroundColor', "rgba(48, 182, 80, 0.8)")}
              label={text('label', label)}
              labelStyle={{ fontWeight: '600' }}
              style={{ marginTop: 40, height: 50, borderRadius: 4, marginHorizontal:20 }}
              onPress={onSubmit}
              fullWidth
      >
        <ActivityIndicator animating={boolean('Loading', false)} size="small" color="#FFF" style={{position: 'absolute', right: 50 / 2}}/>
      </Button>
  );
};
