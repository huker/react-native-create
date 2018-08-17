/**
 * Created by huk on 2018/8/16.
 */
import { Navigation } from 'react-native-navigation';
import Center from "./Center/Center";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Loading from "./Loading/Loading";

export function registerTabs(store, Provider) {
    Navigation.registerComponent('home', () => Home, store, Provider);
    Navigation.registerComponent('center', () => Center, store, Provider);
    Navigation.registerComponent('login', () => Login, store, Provider);
    Navigation.registerComponent('loading', () => Loading, store, Provider);
}