import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { List } from 'antd-mobile-rn';
const Item = List.Item;

export default class Center extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <List style={{ marginTop: 10 }}>
                    <Item arrow="horizontal" onClick={() => {
                    }}>
                        我
                    </Item>
                    <Item arrow="horizontal" onClick={() => {
                    }}>
                        历史记录
                    </Item>

                </List>
                <List style={{ marginTop: 10 }}>
                    <Item arrow="horizontal" onClick={() => {
                    }}>
                        设置
                    </Item>
                </List>
            </View>
        );
    }
}
