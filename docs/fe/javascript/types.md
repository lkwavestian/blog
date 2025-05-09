# 数据类型

::: tip 温馨提示
阅读[《JavaScript 高级程序设计（第 4 版）》](https://www.ituring.com.cn/book/2472)和各个大佬的文章所归纳的总结，**如有异议按你的理解为主**
:::

`JavaScript` 中的数据类型分为基本数据类型和引用数据类型

## 基本类型

> 注: 基本数据类型也可以叫原始数据类型

在 `ES2020` 标准下的 `JavaScript` 一共有以下 7 种基本类型

- **`number`** 数值
- **`string`** 字符串
- **`boolean`** 布尔值
- **`undefined`** 未定义
- **`null`** 空指针
- **`symbol`** 独一无二的值 ([ES6 引入](https://es6.ruanyifeng.com/#docs/symbol))
- **`bigint`** 大整数 ([ES2020 引入](https://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B))

**基本类型的赋值操作：**

```js
let a = 10
let b = a // 赋值操作
b = 20
console.log(a) // 10值
```

`a` 的值是一个基本类型，是存储在栈中，将 `a` 的值赋给 `b`，虽然两个变量的值相等，但其实在复制的过程中，新开辟了一个内存空间，两个变量分别保存了两个不同的内存地址，所以赋值操作不会影响原变量的值

::: tip 基本类型总结

- 基本类型仅保存原始值，不存在属性和方法
- 基本类型存储在 **栈内存** 中
- 保存基本类型的变量是 **按值 (by value) 访问** 的，操作的就是存储在变量中的实际值
- 复制基本类型时会创建该值的第二个副本 (独立使用，互不干扰)

:::

::: tip 为什么原始值不存在属性和方法，但 `hello world.toString()` 可以正确执行？
在 `JavaScript` 中，原始值（如字符串、数字、布尔值）本身确实没有属性和方法，但通过**临时包装对象**机制可以调用方法。
具体的原理：每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，在执行完后再销毁这个包装对象
:::

```js
// 举个 🌰
let str = 'hello world'
str.toString()
str.length

/**
 * 在执行上面的代码时 `JavaScript` 都会执行以下 3 步
 * 1. 创建一个 String 类型的实例
 * 2. 调用实例上的特定方法或属性
 * 3. 销毁刚刚创建的实例
 */
// 原始值 'hello world' 被临时转换为 String 对象
const temp = new String('hello world')
temp.toString() // 调用方法
temp.length // 属性
temp = null // 立即销毁
```

::: tip 为什么`hello world'.toString()`会有效？
通过`new String()`方法创造出来的实例查找方法时，会先去寻找本身的属性和方法，如果找不到就去原型对象中找，如果还找不到就去原型对象的原型对象中找，依次类推，直到找到为止。
在此例中，相当于`temp._proto_ === String.prototype`，具体可以看[原型与原型链相关](https://github.com/chenqf/frontEndBlog/issues/10)
:::

## 引用类型

在 `JavaScript` 中除了基本类型，其他的都是引用类型，常见的引用类型如下

- **`Object`** 对象
- **`Array`** 数组
- **`Function`** 函数
- **`Date`** 日期与时间
- **`RegExp`** 正则表达式
- **`Set`** 类似于数组但成员的值都是唯一的 ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#Set))
- **`WeakSet`** ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#WeakSet))
- **`Map`** 类似于对象也是键值对的集合 ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#Map))
- **`WeakMap`** ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#WeakMap))

**引用类型的赋值操作：**

```js
var obj1 = {}
var obj2 = obj1
obj2.name = 'Xxx'
console.log(obj1.name) // xxx
```

引用类型数据存放在堆中，每个堆内存对象都有对应的引用地址指向它，引用地址存放在栈中。

`obj1` 是一个引用类型，在赋值操作过程中，实际是将堆内存对象在栈内存的引用地址复制了一份给了 `obj2`，实际上他们共同指向了同一个堆内存对象，所以更改 `obj2` 会对 `obj1` 产生影响

::: tip 引用类型总结

- 因为 `JavaScript` 不允许直接访问内存位置(不能直接操作对象所在的内存空间)，所以引用类型在 **栈内存** 中存储的是地址(内存指针)，而引用类型中的数据(方法或属性)则是存储在 **堆内存** 中
- 保存引用类型的变量是 **按引用 (by reference) 访问** ，实际上操作的是对该对象的引用而非实际的对象本身
- 复制引用类型时只会复制内存指针

:::

::: tip 栈内存和堆内存

- **栈内存**
  - 存储基本数据类型和堆内存地址
  - 是连续的内存空间
- **堆内存**
  - 存储引用数据类型和闭包中的变量
  - 不是连续的内存空间
- 了解更多请点击 [JS 中的栈内存和堆内存](https://github.com/chenqf/frontEndBlog/issues/9)

:::

## 类型判断

常见的五种判断方式

- **`typeof`**
- **`instanceof`**
- **`constructor`**
- **`Array.isArray()`**
- **`Object.prototype.toString`**

### typeof

- 除 **`null`** 外的基本类型都能准确判断

<<< @/fe/javascript/code/typeof.js#primitive

::: tip 为什么 typeof null === 'object'
在 `JavaScript` 最初的实现中，`JavaScript` 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 `0`。由于 `null` 代表的是空指针（大多数平台下值为 `0x00`），因此`null` 的类型标签是 `0`，`typeof null` 也因此返回 `"object"` —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)
:::

- 除 **`function`** 外的引用类型均返回 `object`

<<< @/fe/javascript/code/typeof.js#object{3}

### instanceof

[`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 用于检测构造函数的 `prototype` 属性是否存在于实例对象的原型链上

<<< @/fe/javascript/code/instanceof.js#type

::: tip instanceof 总结

- `instanceof` 不能判断基本类型，对于引用类型只能判断原型链上的从属关系
- `instanceof` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改
  - 修改原型的方法
    - 使用 `ES6` 提供的 [`Reflect.setPrototypeOf()`](https://es6.ruanyifeng.com/?search=%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B&x=0&y=0#docs/reflect#Reflect-setPrototypeOfobj-newProto) 方法
    - 借助于非标准的 `__proto__` 伪属性

:::

**`instanceof`**的实现原理

关于`instanceof`的实现原理，可以参考下面的代码

<<< @/fe/javascript/code/instanceof.js#implement

原理还是挺简单的：照着原型链去找，直到找到相同的原型对象，返回`true`，否则返回`false`

### constructor

实例对象可以通过 [`constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 属性去访问它的构造函数

<<< @/fe/javascript/code/constructor.js

::: tip constructor 总结

- `constructor` 可以判断除 `undefined` 和 `null` 外的所有基本类型和引用类型(`undefined` 和 `null` 不存在构造函数)
- `constructor` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改，从而造成 `constructor` 属性指向不准确

:::

### Array.isArray()

[`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 用于判断一个值是否是数组 (`Array`)

<<< @/fe/javascript/code/isArray.js

### Object.prototype.toString

- 每个对象都有一个 [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用，默认情况下 `toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖 `toString()` 返回 `"[object type]"` 其中 `type` 是对象的类型
- 为了使每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用

<<< @/fe/javascript/code/toString.js

`toString` 方法的在 [`ECMAScript 5`](https://es5.github.io/#x15.2.4.2) 下的大致执行过程

1. 如果 `this` 是 `undefined` 返回 `[object Undefined]`
2. 如果 `this` 是 `null` 返回 `[object Null]`
3. 让 `O` 成为 `ToObject(this)` 的结果
4. 让 `class` 成为 `O` 的内部属性 `[[Class]]` 的值
5. 返回由 **`"[object "`** **`class`** **`"]"`** 三个部分组成的字符串

::: warning 注意点

不同 `ECMAScript` 版本对 `toString` 方法的规范都有所不同

[Object.prototype.toString 方法的原理](https://juejin.cn/post/6972878737582850062#heading-27)

:::

## `undefined`和`null`的区别

相同点:

- 在 `if` 判断语句中,值都默认为 `false`

差异:

- `null` 转为数字类型值为 `0`,而 `undefined` 转为数字类型为 `NaN(Not a Number)`
- `undefined` 是代表调用一个值而该值却没有赋值,这时候默认则为 `undefined`
- `null` 则表示“什么都没有”，即“空值”
- `typeof undefined === "undefined"` 但是 `typeof null === "object"`
- 设置为 `null` 的变量或者对象会被内存收集器回收

## 变量的声明

`var` 声明

- 变量被定义在函数作用域
- 如果定义变量时省略 `var` 操作符，可以创建一个全局变量
- 如果需要定义多个变量，可以在一条语句中用逗号分隔每个变量
- 存在变量提升
- 可以反复声明变量
- 其声明的变量会被当作 window 的属性

`let` 声明

- 变量被定义在块级作用域
- 不允许冗余声明
- 不存在变量提升
- 暂时性死区

`const` 声明

- `const`声明一个只读的常量。一旦声明，常量的值就不能改变。
- `const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效
- `const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- `const`声明的常量，也与`let`一样不可重复声明。
-
- 变量被定义在块级作用域
- 变量只读，一旦声明，不能修改
- 不可重复声明
- 不存在变量提升
- 暂时性死区
