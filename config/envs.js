/**
 * Created by huk on 2018/8/19.
 */
let asUrl;
if (__DEV__) {
    //本地地址
    asUrl = "http://10.16.15.132"
} else {
    //生产地址
    asUrl = ""
}

export { asUrl }