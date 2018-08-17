import { Navigation } from 'react-native-navigation';
import { registerTabs } from './src/container/index';
import { Provider } from "react-redux";
import store from "./src/redux/store";

// 执行注册页面方法
registerTabs(store, Provider);

// export default class App {
//
//     constructor() {
//
//     }
// }

// 启动app
Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'home',
            screen: 'home',
            title: '首页'
        },
        {
            label: 'center',
            screen: 'center',
            title: '我的'
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
