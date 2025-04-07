---
outline: 2
---

# Uniapp 踩坑记录

## 使用`uni.uploadFile`方法上传图片，提示`errMsg: "uploadFile:fail`

使用`uni.uploadFile`方法进行图片上传时，提示`errMsg: "uploadFile:fail`，图片上传失败，上传图片的接口根本就没有调用。

##### 解决方法

url 不能只传接口地址，要把完整的服务器地址拼接上去。

```js
url: `${envConfig.APP_SERVER_URL}/${backend.baseService}/api/ocrResource/s/ocrResource/fileUpld`,
```

##### 解决过程

虽然问题已经解决，并且解决的方法很简单，但是寻找整个问题解决办法的过程着实花费了不少时间，所以还是有必要记录一下解决的过程。

首先，接口没有调用，说明肯定是图片上传失败了，但是报错的信息目前还没有暴露出来，我们知道了有错误也无法定位到错误原因，只能再仔细看`uni.uploadFile` 的文档：

| 参数名  |     类型 | 必填 |          说明          |
| ------- | -------: | ---: | :--------------------: |
| success | Function |   否 | 接口调用成功的回调函数 |
| file    | Function |   否 | 接口调用失败的回调函数 |

加上`file`参数后，就可以看到报错的信息了：发现报错信息是`errMsg: "uploadFile:fail`

谷歌搜索了一番，有博客说`url`必须得填完整，于是把整个服务器地址拼接上去：

```js
url: `${envConfig.APP_SERVER_URL}${backend.baseService}/api/ocrResource/s/ocrResource/fileUpld`,
```

还是不行，报错信息还是`errMsg: "uploadFile:fail`

又搜索了一番，没有太大的收获，就在快要放弃的时候，发现自己的`url`少写了一个`/`...

```js
url: `${envConfig.APP_SERVER_URL}${backend.baseService}/api/ocrResource/s/ocrResource/fileUpld` // [!code --],
url: `${envConfig.APP_SERVER_URL}/${backend.baseService}/api/ocrResource/s/ocrResource/fileUpld` // [!code ++],
```

原来是自己的`url`少写了一个`/`，也就是说根本原因还是路径不完整，导致图片上传失败。

> 说实话`uniapp`的报错信息真是有点坑，无论是什么错误，都是`errMsg: "uploadFile:fail`，根本无法分辨出来是什么错误。
> 我们只能靠调试的方式，来寻找问题的原因。
> 如果说是`url`错误好歹返回一个相对应的错误信息呗....

这次解决问题的过程也给我个教训：

1. 如果有`fail`函数相关的错误处理函数，一定要处理，不要忽略，不然报错了也无法知道问题所在。
2. 不要过度相信报错信息，要确保自己代码的逻辑、变量的正确性。

测试 222
