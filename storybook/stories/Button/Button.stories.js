import {withKnobs} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import {ButtonForm} from '.';


export default {
    title: 'Submit',
    // argTypes: { onSubmit: { action: 'clicked' } },
    parameters: { actions: { argTypesRegex: '^on.*' } },
}

const Submit = storiesOf('Submit', module).add('Submit', () => <ButtonForm onSubmit={()=>console.log('Submit')} />);
Submit.addDecorator(withKnobs);
