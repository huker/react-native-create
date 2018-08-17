import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type Props = {};
export default class Home extends Component<Props> {

    handleToLogin = () => {
        // this.props.navigator.push({
        //     screen: 'login',
        //     title: '登录'
        // })
        this.props.navigator.showModal({
            screen: 'login',
            title: '登录'
        })
    };

    render() {
        let that = this;
        return (
            <View>
                <TouchableOpacity onPress={this.handleToLogin}>
                    <Text>跳转到登录页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
