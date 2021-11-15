import {storiesOf} from "@storybook/react-native";
import {withKnobs} from "@storybook/addon-knobs";
import React from "react";
import {TextInputForm} from '.';

const TextInput = storiesOf('TextInput', module).add('TextInput', () => <TextInputForm />);
TextInput.addDecorator(withKnobs);
