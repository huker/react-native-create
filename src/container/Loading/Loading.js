import React, { Component } from 'react';
import { Text, View } from 'react-native';


type Props = {};
export default class Loading extends Component<Props> {

    render() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
}
