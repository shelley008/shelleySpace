
1.vuex2做了一个移动端的demo，并封装成了app并调用了手机的一些硬件(相机，扫码等)，所用到的技术有vue2，vue-router，vue-resource，vuex，mint，vue-ydui, scss
### [vue2高仿网易云应用](https://github.com/raintao/musicWebapp.git)
### [vu2移动端的架构，封装app](https://github.com/raintao/vue2_app_template.git)

2.字体文件用的是[阿里巴巴矢量图标库](http://www.iconfont.cn/),可以自定义需要哪些图标，用着比较方便。
    // 阿里字体图标
### import './static/css/neat-min.css'
### import './static/css/iconfont.css'

3.vuex和vue-resource的使用
  &emsp;&emsp;vue-resource的使用比较简单，对于具体怎么使用请参考官方手册。vuex这里把store的action,getters,mutation封装成了一个独立的文件。对于他们的调用和映射等，我总结了一下，可以做个参考，如下：
  ![总结](https://github.com/raintao/vue2_app/blob/master/src/assets/6.png?raw=true)

4打包平台
###目前能打包成app的平台很多，随着淘宝weex的开源，让webapp又火了一把，目前可以打包成app的平台总结了几个：pnonegap ，APICloud，appcan，wex5 ，weex，IUAP Mobile具体怎么应用大家可以自己去各自的官网详细了解。

5调用底层
###Cordova提供了一组设备相关的API，通过这组API，移动应用能够以JavaScript访问原生的设备功能，如摄像头、麦克风等。Cordova还提供了一组统一的JavaScript类库，以及为这些类库所用的设备相关的原生后台代码。
