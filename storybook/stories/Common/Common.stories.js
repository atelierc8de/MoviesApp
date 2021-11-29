import React from "react";
import {TextInput, View} from 'react-native';
import {storiesOf} from "@storybook/react-native";
import {number, text, date, color, boolean, withKnobs} from "@storybook/addon-knobs";
import {CButton} from "../../../src/components/Button";
import {TextInputForm} from "../../../src/components/TextInputFilter";
import {MoviesItem} from "../../../src/components/MoviesItem";
import moment from 'moment';
import {action} from "@storybook/addon-actions";

/**
 *
 * @param children
 * @constructor
 */
const Component = ({children}) => <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>{children}</View>;

/**
 * Button
 */
storiesOf('Submit', module)
    .addDecorator(withKnobs)

    .add('Submit', () =>
        <Component>
            <CButton
                label={text('label', 'Button')}
                backgroundColor={text('backgroundColor', 'rgba(48, 182, 80, 0.8)')}
                onSubmit={action('Submit')}
                isLoading={true}
                animating={boolean('animating', false)}
            />
        </Component>
    );

/**
 * TextInput
 */
storiesOf('TextInput', module)
    .addDecorator(withKnobs)

    .add('TextInput', () => {
        return <Component>
            <TextInputForm
                height={number('height', 50)}
                borderRadius={number('borderRadius', 4)}
                backgroundColor={color('backgroundColor', '#FFF')}
                style={{borderWidth: 1}}
            >
                <TextInput
                    style={{flex: 1, fontSize: 16}}
                    placeholder={text('placeholder', 'Enter...')}
                    placeholderTextColor={color('placeholderTextColor', '#6B7B8B')}
                    textContentType={text('textContentType', 'emailAddress')}
                    keyboardType={text('keyboardType', 'default')}
                    returnKeyType={text('returnKeyType', 'next')}
                    onSubmitEditing={action('onSubmitEditing')}
                />
            </TextInputForm>
        </Component>
    });

/**
 * MoviesItem
 */
storiesOf('MoviesItem', module)
    .addDecorator(withKnobs)

    .add('MoviesItem', () =>
        <Component>
            <MoviesItem
                title={text('title', 'FILM NAME')}
                image={text('image', 'https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg')}
                vote={number('vote', 1000)}
                date={moment(date('date', new Date())).format('DD-MMM-YYYY')}
                language={text('language', 'US')}
                idmb={number('idmb', 8.6)}
                goToMoviesDetail={action('To go Movies Detail')}
            />
        </Component>
    );
