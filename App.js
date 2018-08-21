import { Navigation } from 'react-native-navigation';
import { registerTabs } from './src/container/index';
import { Provider } from "react-redux";
import configStore from "./src/redux/store";
import home from "./src/assets/icon/home.png";
import mine from "./src/assets/icon/mine.png";

appRoot = 'loading';

let { store } = configStore();

console.log("process.env.ENV", process.env);

registerTabs(store, Provider);

checkToken();


// 启动app
function checkToken() {
    const token = store.getState()['auth'].token;
    this.appRoot = token ? 'tabs' : 'login';
    renderType();
    store.subscribe(onStoreUpdate)
}

function onStoreUpdate() {
    const token = store.getState()['auth'].token;
    const _appRoot = token ? 'tabs' : 'login';
    if (this.appRoot !== _appRoot) {
        this.appRoot = _appRoot;
        renderType();
    }
}

function renderType() {
    switch (this.appRoot) {
        case "tabs":
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: '首页',
                        screen: 'home',
                        title: '首页',
                        icon: home
                    },
                    {
                        label: '我的',
                        screen: 'center',
                        title: '我的',
                        icon: mine
                    }
                ],
                appStyle: {
                    navBarBackgroundColor: '#263136',//顶部导航栏背景颜色
                    navBarTextColor: 'white'//顶部导航栏字体颜色
                },
                tabsStyle: {
                    tabBarButtonColor: '#ccc',//底部按钮颜色
                    tabBarSelectedButtonColor: '#08cb6a',//底部按钮选择状态颜色
                    tabBarBackgroundColor: '#E6E6E6'//顶部条背景颜色
                }
            });
            break;
        case 'login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'login',
                    title: '登录'
                }
            });
            break;
        default:
            console.log("Error")
    }
}


