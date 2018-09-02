## react native 项目基础搭建

- rn 0.55.4
- react-native-navigation v1
- redux
- redux-thunk
- axios
- ant-design-mobile-rn

### 路由 react-native-navigation
使用的是react-native-navigation的V1版本，2我看还在开发中就没用- -
> 配置进ios和Android项目，可以参考官方文档(https://wix.github.io/react-native-navigation/#/installation-ios)
使用方式文档也描述的比较清楚。

1.我写一下适应登录页面和Tabs页面切换的场景
具体代码在App.js里面，思路是:
- 首先项目中使用了redux，并且使用redux-persist来存储我需要存的state，这儿存了'auth'
- 存了auth的话，如果已经登录，就可以在getState()里取到auth里的token
- 设置Navigation的方式的之前，先判断token是否存在，存在则走tabs，不存在则走single
- 监听store的变化，检测到token有变化的话，就重新渲染nav

2.在另一个项目写的时候（这边只是试手搭建的代码），想要一个screen里弹个modal，然后dismiss modal的时候把值传过来，这时候可以穿一个callback过去，然后再dismiss then之后调用

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

### ant mobile rn碰到的问题

1.使用ImagePicker组件的时候报错，找不到方法。看了下是用的react-native-camera-roll-picker，这个基于CameraRoll，所以要把CameraRoll的包加入到项目中，在node_module/react-native/Libraries/CameraRoll里

2.使用Popover时，想要在nav上面加一个“...”的icon，点击弹出下拉菜单这样。因为这边用了react-native-navigation，翻了下文档，是支持nav上的button自定义，并且可以传一个component进去（先在全局导航那边注册好这个component），但是这个时候onNavigatorEvent没有触发，就唤起不了popover，尝试了dismissmodal传参数一个道理，传一个callback过去，但是结果发现this指向错误，拿不到refs。

所以暂时解决是：
方法一：
就只能切一张想要的大小的图，通过配置提供的icon去require，这种方式的话可以在event里监听到的。
这边要注意ref要设一下，官网的例子没说到，不加的话是取不到refs的
```
//nav event里
this.refs.mc.menuContextRef.toggleMenu('morePopover')

//render
<Popover
    ref="mc"
    name="morePopover"
    overlay={overlay}
    contextStyle={styles.contextStyle}
    overlayStyle={[
        styles.overlayStyle,
        Platform.OS === 'android' && styles.androidOverlayStyle,
    ]}
    triggerStyle={styles.triggerStyle}
    onSelect={() => {
        console.log("select popover option")
    }}
    >
</Popover>
```
（然后图片的2x 3x识别，比如图片是more.png，就再放两个more@2x.png和3x的，require的时候还是引more.png）
方法2：
还是用component的方式，然后通过事件来触发，这样做实在繁琐了

未解决：
1.组件的样式真的好难修改啊 有没有大佬可以提供下定制组件样式的方法