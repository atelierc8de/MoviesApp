import {withKnobs} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import {ButtonForm} from '.';

const Submit = storiesOf('Submit', module).add('Submit', () => <ButtonForm />);
Submit.addDecorator(withKnobs);
