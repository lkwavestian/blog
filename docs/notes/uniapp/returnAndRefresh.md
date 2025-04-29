在 Uniapp 开发中，页面跳转是经常涉及的功能。<br/>
我们经常会遇到这样的场景：在列表页进入详情页时，在详情页进行了一些操作，比如：删除，修改，编辑，提交等，成功之后再返回到列表页。这个时候，如果我们的列表页不进行数据的刷新，就会给用户一种错觉——刚才进行操作的那条数据会不会没成功？如果我们下拉刷新下列表或者重新进入列表页，这个数据就变成最新的。<br/>
这个是很常见的一个交互场景，那么如何让用户不进行下拉刷新或者重新进入列表页，就可以获得最新的数据呢，总结以下几种方法。

## 生命周期：onShow

使用 `uniapp` 页面生命周期 `onShow` 这个钩子函数，在`onShow`中直接调用请求列表接口，

```vue
onShow() { getList() }
```

此方法虽然简单粗暴，但是有个很大的缺陷——页面从详情页返回到列表页时，就算什么都不做，也会刷新列表，这肯定是我们不希望看到的。

## 页面通讯：uni.$emit 和 uni.$on

这个方法是使用`uniapp`自己的页面通讯机制，[如何使用 uni.$emit()和uni.$on() 进行页面间通讯
](https://uniapp.dcloud.net.cn/tutorial/page.html#%E9%A1%B5%E9%9D%A2%E9%80%9A%E8%AE%AF)，也是我认为比较靠谱的方法。

使用方法也比较简单，首先在`onLoad`中使用`uni.$on`监听事件

```vue
onLoad() { uni.$on("reloadList", (params) => {getList(params)} )}
```

之后在详情页中，使用`uni.$emit`触发事件

```vue
uni.$emit("reloadList",{ params } )
```

使用 `uni.$emit` 触发事件后，对应的 `uni.$on`就会监听到事件触发，在回调中去执行相关的逻辑。

需要注意一点是，在`onLoad`中监听事件，在`onUnload`中还需要使用`uni.$off`移除监听事件，避免内存泄漏。

```vue
<script>
onUnLoad() { uni.$off("reloadList")}
</script>
```

## 路由方法：uni.navigateBack

`uniapp`本身就提供了一个返回上一页的方法 `uni.navigateBack()`，这个方法可以指定返回的页数，默认为 1，即返回上一页。

在详情页中，通过`uni.navigateBack()`返回上一页，并传递数据

```vue
<!-- 详情页 -->
<template>
  <view>
    <button @click="goBackAndRefresh">返回上一页并刷新</button>
  </view>
</template>

<script>
export default {
  methods: {
    goBackAndRefresh() {
      // 传递参数给上一页
      uni.navigateBack({
        delta: 1,
        success: () => {
          const pages = getCurrentPages()
          const prevPage = pages[pages.length - 2]
          prevPage.setData({
            dataToPrevPage: '数据已刷新',
          })
        },
      })
    },
  },
}
</script>
```

在列表页的`onShow`中，使用 [getCurrentPages
](https://zh.uniapp.dcloud.io/api/window/window.html#getcurrentpages)获得当前页面栈，找到上一页的页面对象之后，我们可以获得传递的参数，并根据参数执行刷新操作

```vue
<!-- 上一页 -->
<template>
  <view>
    <text>{{ dataFromNextPage }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dataFromNextPage: '',
    }
  },
  onShow() {
    // 获取上一页传递的参数并执行刷新操作
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    this.dataFromNextPage = prevPage.data.dataToPrevPage
  },
}
</script>
```
