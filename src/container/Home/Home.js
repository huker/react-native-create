import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

@connect(
    (state) => ({}),
    {}
)

export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>跳转到登录页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
