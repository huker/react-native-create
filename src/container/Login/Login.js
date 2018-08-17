import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Button, InputItem, List } from 'antd-mobile-rn';
import { login } from "../../redux/action/authAction";
import { connect } from "react-redux";

@connect(
    (state) => ({ auth: state.auth }),
    { login }
)
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleLogin = () => {
        const { username, password } = this.state;
        this.props.login({
            username,
            password
        })
    };

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List>
                    <InputItem
                        clear
                        value={this.state.username}
                        onChange={(value) => {
                            this.setState({
                                username: value,
                            });
                        }}
                        placeholder="输入账号"
                    >
                        账号
                    </InputItem>
                    <InputItem
                        clear
                        type="password"
                        value={this.state.password}
                        onChange={(value) => {
                            this.setState({
                                password: value,
                            });
                        }}
                        placeholder="输入密码"
                    >
                        密码
                    </InputItem>
                    <List.Item>
                        <Button
                            onClick={() => {
                                this.handleLogin();
                            }}
                            type="primary"
                        >
                            登录
                        </Button>
                    </List.Item>
                </List>
            </ScrollView>
        );
    }
}
