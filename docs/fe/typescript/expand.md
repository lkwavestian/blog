# 扩展阅读

此处记录了[官方手册](http://www.typescriptlang.org/docs/handbook/basic-types.html)（[中文版](https://www.patrickzhong.com/TypeScript/)）中包含，但是本博客未涉及的概念。

我认为它们是一些不重要或者不属于 `TypeScript` 的概念，所以这里只给出一个简单的释义，详细内容可以点击链接深入理解。

- [装饰器 Decorators](https://ts.xcatliu.com/advanced/decorator.html)：`typescript`中装饰器的用法
- [Variable Declarations](http://www.typescriptlang.org/docs/handbook/variable-declarations.html)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Variable%20Declarations.html)）：使用 `let` 和 `const` 替代 `var`，这是 [ES6 的知识](http://es6.ruanyifeng.com/#docs/let)
- [`this`](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Functions.html#this)：箭头函数的运用，这是 [ES6 的知识](http://es6.ruanyifeng.com/#docs/function)
- [Using Class Types in Generics](http://www.typescriptlang.org/docs/handbook/generics.html#using-class-types-in-generics)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Generics.html#在泛型里使用类类型)）：创建工厂函数时，需要引用构造函数的类类型
- [Best common type](http://www.typescriptlang.org/docs/handbook/type-inference.html#best-common-type)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Inference.html#最佳通用类型)）：数组的类型推论
- [Contextual Type](http://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-type)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Inference.html#上下文类型)）：函数输入的类型推论
- [Type Compatibility](http://www.typescriptlang.org/docs/handbook/type-compatibility.html)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Type%20Compatibility.html)）：允许不严格符合类型，只需要在一定规则下兼容即可
- [Advanced Types 交叉类型](http://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/advanced-types.html?search=Advanced)）：使用 `&` 将多种类型的共有部分叠加成一种类型
- [Type Guards and Differentiating Types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/advanced-types.html?highlight=Differentiating#%E7%B1%BB%E5%9E%8B%E5%AE%88%E5%8D%AB%E4%B8%8E%E7%B1%BB%E5%9E%8B%E5%8C%BA%E5%88%86type-guards-and-differentiating-types)）：联合类型在一些情况下被识别为特定的类型
- [Discriminated Unions](http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/advanced-types.html?highlight=Discriminated#%E5%8F%AF%E8%BE%A8%E8%AF%86%E8%81%94%E5%90%88discriminated-unions)）：使用 `|` 联合多个接口的时候，通过一个共有的属性形成可辨识联合
- [Polymorphic `this` types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#polymorphic-this-types)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Advanced%20Types.html#多态的this类型)）：父类的某个方法返回 `this`，当子类继承父类后，子类的实例调用此方法，返回的 `this` 能够被 TypeScript 正确的识别为子类的实例。
- [Symbols](http://www.typescriptlang.org/docs/handbook/symbols.html)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/symbols.html#%E4%BC%97%E6%89%80%E5%91%A8%E7%9F%A5%E7%9A%84symbols)）：新原生类型，这是 [ES6 的知识](http://es6.ruanyifeng.com/#docs/symbol)
- [Iterators and Generators](http://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/iterators-and-generators.html)）：迭代器，这是 [ES6 的知识](http://es6.ruanyifeng.com/#docs/iterator)
- [Namespaces 命名空间](http://www.typescriptlang.org/docs/handbook/namespaces.html)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/namespaces.html)）：避免全局污染，现在已被 [ES6 Module](http://es6.ruanyifeng.com/#docs/module) 替代
- [Mixins 混入](http://www.typescriptlang.org/docs/handbook/mixins.html)（[中文版](https://www.patrickzhong.com/TypeScript/zh/reference/mixins.html?highlight=mixins#%E7%90%86%E8%A7%A3%E7%A4%BA%E4%BE%8B)）：一种编程模式，与 TypeScript 没有直接关系，可以参考 [ES6 中 Mixin 模式的实现](http://es6.ruanyifeng.com/#docs/class#Mixin模式的实现)
