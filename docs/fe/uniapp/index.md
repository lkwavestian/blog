## Uniapp 的生命周期

uniapp 的生命周期分为三种：应用生命周期、页面生命周期和组件生命周期。

### 应用生命周期

应用生命周期是指应用程序从启动到关闭的整个过程，包裹应用程序的启动、前后台切换、退出等。
应用生命周期仅可在`APP.vue`中监听，在页面监听无效

```sh
# 当 uni-app 初始化完成时触发，全局只触发一次
onLaunch

# 当 uni-app 启动，或从后台进入前台显示时触发，一般用来监听用户是否进入小程序
onShow

# 当 uni-app 从前台进入后台时触发，一般用来监听用户是否离开小程序
onHide

# 当 uni-app 报错时触发
onError



```

### 页面生命周期

每个页面都有自己的生命周期

```sh
# 当页面加载时触发，参数为上个页面传递的数据，常用于接收路由参数、数据初始化、网络请求等操作
# 当其触发时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成,但元素还没开始渲染
# tab页面不加载
onLoad

# 页面每次出现在屏幕上都会触发， 包括从下级节点返回露出当前页面
onShow

# 页面初次渲染完成后就触发，页面只执行一次
onReady

# 页面隐藏时触发,
onHide

# 页面卸载时触发
onUnload

```

### 组件生命周期

组件生命周期与`vue`标准组件的生命周期相同，这里只简单说明下`vue3`的生命周期

```sh
# 在实例初始化之后被调用
beforeCreate

# 在实例创建完成后被立即调用
created

# 在挂载开始之前被调用
beforeMount

# 挂载到实例上去之后调用
mounted

# 数据更新时调用，发生在虚拟 DOM 打补丁之前
beforeUpdate

# 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
updated

# 实例销毁之前调用。在这一步，实例仍然完全可用
beforeDestroy

# Vue 实例销毁后调用
destroyed

```

### 生命周期执行顺序

```sh

# 进入应用
App Launch
App Show
page onLoad
page onShow
component beforeCreate
component created
component beforeMount
component mounted
page onReady

#应用后台
App Hide
page onHide

#应用关闭
APP onUnload
component beforeDestroy
component destroyed

#后台重新进入
App Show
page onLoad
page onShow

```
