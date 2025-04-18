# CSS 语法相关

## 滚动条样式

```css
/* 滚动条 */
::-webkit-scrollbar {
  /* 纵向 */
  width: 8px;
  /* 横向 */
  height: 8px;
  background-color: #ededed;
}
/* 滚动条上的按钮(上下箭头) */
::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #ededed;
}
/* 滚动条轨道，没有滑块 */
::-webkit-scrollbar-track-piece {
  background-color: #ededed;
}
/* 垂直滚动条和水平滚动条交汇的部分 */
::-webkit-scrollbar-corner {
  background-color: #ededed;
}
/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d6d6d6;
}
/* 右下角拖动块 */
::-webkit-resizer {
  display: none;
}
```

[关于::-webkit-scrollbar](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)

## 超宽文本替换为省略号

```css
.text {
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 文本超出一行时，显示省略号 */
  text-overflow: ellipsis;
  /* 禁止换行 */
  white-space: nowrap;
}
```
