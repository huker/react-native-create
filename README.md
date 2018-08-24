## react native 项目基础搭建

- rn 0.55.4
- react-native-navigation v1
- redux
- redux-thunk
- axios
- ant-design-mobile-rn

### 路由设置，使用react-native-navigation
使用的是react-native-navigation的V1版本，2我看还在开发中就没用- -
> 配置进ios和Android项目，可以参考官方文档(https://wix.github.io/react-native-navigation/#/installation-ios)
使用方式文档也描述的比较清楚，我写一下适应登录页面和Tabs页面切换的场景。
具体代码在App.js里面，思路是:
- 首先项目中使用了redux，并且使用redux-persist来存储我需要存的state，这儿存了'auth'
- 存了auth的话，如果已经登录，就可以在getState()里取到auth里的token
- 设置Navigation的方式的之前，先判断token是否存在，存在则走tabs，不存在则走single
- 监听store的变化，检测到token有变化的话，就重新渲染nav

### 打包ios的ipa包
首先要生成bundle文件，在xcode中把bundle添加项目中（加进去的时候要选上create folder references，这样bundle文件变化了也会关联到xcode中的变化），然后再archive打出生产/测试的ipa包
具体执行参考makefile中的make release-ios和make build-ios-dev，前者是生成bundle，后者是打了测试的ipa

bundle文件生成具体操作可以参考(https://www.jianshu.com/p/6d1ee919ded3)

### 打包Android的apk生产包
安卓比较方便，通过gradle就可以，前提是要把签名加进Android项目里
```
keytool -genkey -alias appname.keystore -keyalg RSA -validity 20000 -keystore appname.keystore
```
具体执行参考makefile中的make release-android

### 调用真机的permission设置
试了一下扫一扫的功能，使用了react-native-camera,首先安装和把包添加进项目里：
```
npm install react-native-camera --save
react-native link react-native-camera
```
如果link失败的话需要手动添加进去，网上看下有相关教程的，在xcode中把包手动添加进去。
然后就是添加permission（就是那种第一次调用的时候会谈个框，问你允不允许app使用相机啥啥的），ios就直接在xcode的info里面手动加
调试的时候要在真机调试，虚拟机里调用相机的话会报错

### 开发、生产环境下的api配置
平时都是用.json文件配置好，然后通过ENV全部暴露出来，在build的时候@cross-env APP_ENV=dev之类的命令来读取配置文件，但是在react-native这边试了不行，网上说没这边只有debug和release两种场景
就只好用这种方式来区别（有好的方式的话希望指教，我觉得这种方式不合适）
```
let api;
if (__DEV__) {
    api = "http://xxxx"
} else {
    api = "http://xxxx"
}

export { api }
```
