import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from "react-redux";

@connect(
    (state) => ({}),
    {}
)

export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    _onPressButton = () => {
        this.props.navigator.showModal({
            screen: 'scan',
            title: '扫一扫'
        })
    };

    render() {
        return (
            <View style={styles.content}>
                <TouchableOpacity onPress={this._onPressButton}>
                    <View style={styles.scanContent}>
                        <Text>扫一扫</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    scanContent: {
        display: "flex",
        flexDirection: "row",
        height: 160,
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#1890ff',
        borderRadius: 80,
        marginTop: 100
    }
});
