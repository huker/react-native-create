import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { login } from "../../redux/action/authAction";
import { connect } from "react-redux";

@connect(
    (state) => ({ auth: state.auth }),
    { login }
)

export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    handleToLogin = () => {
        this.props.login({
            username: 'lyfy',
            password: '123456'
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
