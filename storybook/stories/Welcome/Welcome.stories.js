import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Welcome from '.';
import Login from "../../../src/screens/account/Login";

storiesOf('Login', module).add('Login', () => <Welcome />);
