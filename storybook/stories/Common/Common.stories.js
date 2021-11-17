import {storiesOf} from "@storybook/react-native";
import {withKnobs} from "@storybook/addon-knobs";
import React from "react";
import {TextInputForm} from '.';
import {number} from "@storybook/addon-knobs";

export default {
    title: 'TextInput',

}

const TextInput = storiesOf('TextInput', module).add('TextInput', () => <TextInputForm height={number('height', 100)} />);
TextInput.addDecorator(withKnobs);
