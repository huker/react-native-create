import React, { Component } from 'react';
import { Text, View, Animated, StyleSheet, Easing } from 'react-native';
import { connect } from "react-redux";
import { RNCamera } from "react-native-camera";
@connect(
    (state) => ({}),
    {}
)

export default class Scan extends Component {

    static navigatorButtons = {
        leftButtons: [
            {
                title: '取消',
                id: 'cancel',
                buttonColor: 'white',
                buttonFontSize: 16,
                buttonFontWeight: '500',
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            moveAnim: new Animated.Value(0)
        };
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'cancel') {
                this.props.navigator.dismissModal();
            }
        }
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    handleOnBarCodeRead = (result) => {
        console.log("handleOnBarCodeRead======>", result)
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'开启相机权限'}
                    permissionDialogMessage={'若不允许,您将无法在应用中使用扫描、拍照等功能'}
                    onBarCodeRead={this.handleOnBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.state.moveAnim }] }]}>
                        </Animated.View>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#1890ff',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#1890ff',
    }
});