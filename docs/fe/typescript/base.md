# TypeScript 基础知识

## 基本概念

`TypeScript` 作为 `JavaScript` 语言的超集，它为 `JavaScript` 添加了可选择的类型标注，大大增强了代码的可读性和可维护性。同时，它提供最新和不断发展的 `JavaScript` 特性，能让我们建立更健壮的组件。

引用[官网](https://www.typescriptlang.org/zh/)的定义

> TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale Try Type.
>
> `TypeScript`是一种基于`JavaScript`的强类型编程语言，适用于任何规模的项目。

它强调了 `TypeScript` 的两个最重要的特性——类型系统、适用于任何规模。

### 类型系统

从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。

我们知道，`JavaScript` 是一门**非常灵活**的编程语言：

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 `JavaScript` 中的[一等公民](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch2.html#%E4%B8%BA%E4%BD%95%E9%92%9F%E7%88%B1%E4%B8%80%E7%AD%89%E5%85%AC%E6%B0%91)，可以赋值给变量，也可以当作参数或返回值。

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

**TypeScript 是静态类型**

类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。

JavaScript 是一门[解释型语言](https://web.stanford.edu/class/cs98si/slides/overview.html)，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：

```js
let foo = 1;
foo.split(" ");
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。

TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 TypeScript 是静态类型，这段 TypeScript 代码在编译阶段就会报错了

```ts
let foo: number = 1;
foo.split(" ");
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

**TypeScript 是弱类型**

类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的，运行时数字 1 会被隐式类型转换为字符串 '1'，加号 + 被识别为字符串拼接，所以打印出结果是字符串 '11'。

```ts
console.log(1 + "1");
// 打印出字符串 '11'
```

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型。

作为对比，Python 是强类型，以下代码会在运行时报错：

```python
print(1 + '1')
# TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

若要修复该错误，需要进行强制类型转换：

```python
print(str(1) + '1')
# 打印出字符串 '11'
```

这样的类型系统体现了 TypeScript 的[核心设计理念](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Goals)：在完整保留 JavaScript 运行时行为的基础上，通过引入静态类型系统来提高代码的可维护性，减少可能出现的 bug。

### 适用于任何规模

TypeScript 非常适用于大型项目——这是显而易见的，类型系统可以为大型项目带来更高的可维护性，以及更少的 bug。

在中小型项目中推行 TypeScript 的最大障碍就是认为使用 TypeScript 需要写额外的代码，降低开发效率。但事实上，由于有[类型推论][]，大部分类型都不需要手动声明了。相反，TypeScript 增强了编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构等，这在很大程度上提高了开发效率。而且 TypeScript 有近百个[编译选项][]，如果你认为类型检查过于严格，那么可以通过修改编译选项来降低类型检查的标准。

一些第三方库原生支持了 TypeScript，在使用时就能获得代码补全了，比如 [Vue 3.0](https://vuejs.org/guide/typescript/overview.html)：

有一些第三方库原生不支持 TypeScript，但是可以通过安装社区维护的[类型声明库](https://github.com/DefinitelyTyped/DefinitelyTyped)（比如通过运行 npm install --save-dev @types/react 来安装 React 的类型声明库）来获得代码补全能力——不管是在 JavaScript 项目中还是在 TypeScript 中项目中都是支持的。

### Typescript 的概念总结

- 它是添加了类型系统的 JavaScript，适用于任何规模的项目。
- 它是一门静态类型、弱类型的语言。
- 它是完全兼容 `JavaScript` 的，它不会修改 `JavaScript` 运行时的特性。
- 它可以编译为 `JavaScript`，然后运行在浏览器、`Node.js` 等任何能运行 `JavaScript` 的环境中。
- 它拥有很多编译选项，类型检查的严格程度由你决定。
- 它可以和 `JavaScript` 共存，这意味着 `JavaScript` 项目能够渐进式的迁移到 它
- 它增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- 它拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- 它与标准同步发展，符合最新的 `ECMAScript` 标准（stage 3）。

## 原始类型

`TypeScript` 提供了和 `JavaScript` 一样的原始类型

**boolean 布尔类型**

布尔类型就是简单的 `true / false` 值

```ts
let isFlag: boolean = true;
```

**string 字符串类型**

```ts
let name: string = "qianxun";
name = "Tom";
```

**number 数字类型**

和 `JavaScript` 一样，`TypeScript` 里的所有数字都是浮点数。这些浮点数的类型是 `number`。除了支持十进制和十六进制字面量，`TypeScript` 还支持 `ES6` 中引入的二进制和八进制字面量。

```ts
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;
```

**bigint**

`bigint` 类型表示一个任意精度的整数，它可以用来处理超出 `JavaScript` `number` 类型范围的整数

```ts
let big: bigint = 19961996n;
```

**symbol**

`symbol` 类型表示独一无二的值，其必须通过 `Symbol` 函数生成，常用于创建对象属性的唯一标识符

```ts
let sym: symbol = Symbol("qianxun");
sym = Symbol("Tom"); // OK
sym = "Tom"; // Error
```

## 特殊类型

除以上被提到的一些原始类型外，在 TypeScript 中，还存在一些特殊的类型

### void

`JavaScript` 没有空值（Void）的概念，在 `TypeScript` 中，可以用 `void` 表示没有任何返回值的函数

```ts
function sayHello(): void {
  console.log("Hello, world");
}
```

也可以定义一个 `void` 类型的变量，不过这样的变量并没有什么意义，因为你只能为它赋予 `undefined` 和 `null`

```ts
let value: void = undefined;
```

### null 和 undefined

在 `TypeScript` 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型

```ts
let u: undefined = undefined;
let n: null = null;
```

与 `void`的区别是，默认情况下 `null` 和 `undefined` 是所有类型的子类型。就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

```ts
// 这样不会报错
let num: number = undefined;
```

```ts
// 这样也不会报错
let u: undefined;
let num: number = u;
```

而 `void` 类型的变量不能赋值给 `number` 类型的变量：

```ts
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

当编译选项指定了 `--strictNullChecks`（开启严格空值检查模式）时，`null` 和 `undefined` 只允许赋值给自己或 `any` 类型的变量，这能避免很多常见的问题

### any 任意值

`any` 是一个特殊的类型，当一个值是 `any` 类型的时候，`TypeScript` 将不会对其进行类型检查。  
也就是说即使定义之后，也可以随意改变一个值的类型。

```ts
let myFavoriteNumber: any = "seven";
myFavoriteNumber = 7;
```

在任意值上访问任何属性都是允许的：

```ts
let anyThing: any = "hello";
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任何方法：

```ts
let anyThing: any = "Tom";
anyThing.setName("Jerry");
anyThing.setName("Jerry").sayHello();
anyThing.myName.setFirstName("Cat");
```

可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**。

事实上，变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```ts
let something; // 相当于 let something: any;
something = "seven";
something = 7;
something.setName("Tom");
```

:::warning 注意点
无论是开发者指定或是由 `TypeScript` 隐式推断出的 `any` 类型，都会导致 `TypeScript` 失去准确的类型推断能力，这可能会导致遗漏一些运行时错误，违背了使用 `TypeScript` 的初衷
:::

### unknown 未知类型

unknown 类型用于描述一个我们还不知道其类型的变量

就像所有类型都可以被归为 any，所有类型也都可以被归为 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false; // 也可以是个 boolean
```

:::tip unknown 和 any
相比于 any 类型不会对变量进行任何检查，对于 unknown 类型的变量在执行大多数操作时必须进行相应的检查，因此 unknown 类型相对更加严格
:::

### never

never 类型表示的是那些永不存在的值的类型，常用于一个从来不会有返回值的函数，或者一个总是会抛出错误的函数

```ts
// 不会有返回值
function infiniteLoop(): never {
  while (true) {}
}

// 总是会抛出错误的函数
function error(message: string): never {
  throw new Error(message);
}
```

never 类型仅能被赋值给另外一个 never 类型

## 类型推断

如果没有明确的指定类型，那么 `TypeScript` 会依照类型推论`（Type Inference）`的规则推断出一个类型。

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myFavoriteNumber = "seven";
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myFavoriteNumber: string = "seven";
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

`TypeScript` 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查:**

```ts
let myFavoriteNumber;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

## 联合类型

联合类型`（Union Types）`表示取值可以为多种类型中的一种。

### 简单的例子

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

联合类型使用 `|` 分隔每个类型。  
这里的 `let myFavoriteNumber: string | number` 的含义是，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。

### 访问联合类型的属性或方法

当 `TypeScript` 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法：**

```ts
function getLength(something: string | number): number {
  return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的：

```ts
function getString(something: string | number): string {
  return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第一次赋值时， `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错。

而第二次赋值时， `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了。

## 对象的类型——接口 Interfaces

在 `TypeScript` 中，我们使用接口`（Interfaces）`来定义对象的类型。

### 什么是接口

在面向对象语言中，接口`Interfaces`是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类`（classes）`去实现`（implement）`。

`TypeScript` 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状`（Shape）`」进行描述。

### 简单的例子

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};
```

上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 致。

接口一般首字母大写。[有的编程语言中会建议接口的名称加上 I 前缀](<https://learn.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/8bc1fexb(v=vs.71)?redirectedfrom=MSDN>)。

定义的变量比接口少了一些属性是不允许的：

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

多一些属性也是不允许的：

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见，**赋值的时候，变量的形状必须和接口的形状保持一致。**

### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom",
};
```

```ts
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};
```

可选属性的含义是该属性**可以不存在**。

但是这时**仍然不允许添加未定义的属性：**

```ts
interface Person {
  name: string;
  age?: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};
```

使用 [propName: string] 定义了任意属性取 string 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 age 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: "Tom",
  gender: "male",
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

注意，**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：**

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。

第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。

## 数组的类型

在 `TypeScript` 中，数组类型有多种定义方式，比较灵活。

### 「类型 + 方括号」表示法

最简单的方法是使用「类型 + 方括号」来表示数组：

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

数组的项中**不允许**出现其他的类型：

```ts
let fibonacci: number[] = [1, "1", 2, 3, 5];

// Type 'string' is not assignable to type 'number'.
```

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push("8");

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

上例中，`push `方法只允许传入 `number` 类型的参数，但是却传了一个 `"8"` 类型的参数，所以报错了。这里 `"8"` 是一个字符串字面量类型，会在后续章节中详细介绍。

### 数组泛型

我们也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

关于泛型，可以参考泛型一章。

### 用接口表示数组

接口也可以用来描述数组：

```ts
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

`NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。

不过有一种情况例外，那就是它常用来表示类数组。

### 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```ts
function sum() {
  let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

```ts
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```

在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

```ts
function sum() {
  let args: IArguments = arguments;
}
```

其中 `IArguments` 是 `TypeScript` 中定义好了的类型，它实际上就是：

```ts
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

关于内置对象，可以参考内置对象一章。

### any 在数组中的应用

一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：

```ts
let list: any[] = ["xcatliu", 25, { website: "http://xcatliu.com" }];
```

## 函数的类型

> [函数是 JavaScript 中的一等公民](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch2.html#%E4%B8%BA%E4%BD%95%E9%92%9F%E7%88%B1%E4%B8%80%E7%AD%89%E5%85%AC%E6%B0%91)

### 函数声明

在 `JavaScript` 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：

```js
// 函数声明（Function Declaration）
function sum(x, y) {
  return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
  return x + y;
};
```

一个函数有输入和输出，要在 `TypeScript` 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的：**

```ts
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2, 3);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```

```ts
function sum(x: number, y: number): number {
  return x + y;
}
sum(1);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```

### 函数表达式

如果要我们现在写一个函数表达式（Function Expression）的定义，可能会写成这样：

```ts
let mySum = function (x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```

注意不要混淆了 `TypeScript` 中的 => 和 `ES6` 中的 =>（箭头函数）。

在 `TypeScript` 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

### 用接口定义函数形状

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

### 可选参数

前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了：**

```ts
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + " " + lastName;
  } else {
    return lastName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName(undefined, "Tom");

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```

### 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**`TypeScript` 会将添加了默认值的参数识别为可选参数：**

```ts
function buildName(firstName: string, lastName: string = "Cat") {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

此时就不受「可选参数必须接在必需参数后面」的限制了：

```ts
function buildName(firstName: string = "Tom", lastName: string) {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let cat = buildName(undefined, "Cat");
```

### 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```ts
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a: any[] = [];
push(a, 1, 2, 3);
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

注意，`rest `参数只能是最后一个参数，关于 `rest` 参数，可以参考 [ES6 中的 rest 参数](https://es6.ruanyifeng.com/#docs/function#rest%E5%8F%82%E6%95%B0)。

### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，`TypeScript `会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

```text
值 as 类型
```

或

```text
<类型>值
```

::::tip
在 `tsx` 语法（`React` 的 `jsx` 语法的 `ts` 版）中必须使用前者，即 值 as 类型。

因为形如 `<Foo> `的语法在 tsx 中表示的是一个 `ReactNode`，在 `ts` 中除了表示类型断言之外，也可能是表示一个泛型。

故建议大家在使用类型断言时，统一使用 值 `as` 类型 这样的语法，我们也会贯彻这一思想。
::::

### 类型断言的用途

类型断言的常见用途有以下几种：

#### 将一个联合类型断言为其中一个类型

之前提到过，当 `TypeScript` 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法：**

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  return animal.name;
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === "function") {
    return true;
  }
  return false;
}

// index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

上面的例子中，获取 `animal.swim` 的时候会报错。

此时可以使用类型断言，将 `animal` 断言成 `Fish：`

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
```

这样就可以解决访问 `animal.swim` 时报错的问题了。

需要注意的是，类型断言只能够「欺骗」`TypeScript` 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom: Cat = {
  name: "Tom",
  run() {
    console.log("run");
  },
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
```

上面的例子编译时不会报错，但在运行时会报错：

```ts
Uncaught TypeError: animal.swim is not a function`
```

原因是 `(animal as Fish).swim()` 这段代码隐藏了 `animal` 可能为 `Cat` 的情况，将 `animal` 直接断言为 `Fish` 了，而 `TypeScript` 编译器信任了我们的断言，故在调用 `swim() `时没有编译错误。

可是 `swim` 函数接受的参数是 `Cat | Fish`，一旦传入的参数是 `Cat` 类型的变量，由于 `Cat` 上没有 `swim` 方法，就会导致运行时错误了。

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

#### 将一个父类断言为更加具体的子类

当类之间有继承关系时，类型断言也是很常见的：

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

上面的例子中，我们声明了函数 `isApiError`，它用来判断传入的参数是不是 `ApiError `类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 `Error`，这样的话这个函数就能接受` Error` 或它的子类作为参数了。

但是由于父类 `Error `中没有 `code` 属性，故直接获取 `error.code` 会报错，需要使用类型断言获取 `(error as ApiError).code`。

大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 `ApiError`，那就是使用 `instanceof：`

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (error instanceof ApiError) {
    return true;
  }
  return false;
}
```

上面的例子中，确实使用 `instanceof` 更加合适，因为 `ApiError` 是一个 `JavaScript` 的类，能够通过 `instanceof` 来判断 error 是否是它的实例。

但是有的情况下 `ApiError` 和 `HttpError` 不是一个真正的类，而只是一个 `TypeScript` 的接口（`interface`），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 `instanceof` 来做运行时判断了：

```ts
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (error instanceof ApiError) {
    return true;
  }
  return false;
}

// index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
```

此时就只能用类型断言，通过判断是否存在 `code` 属性，来判断传入的参数是不是 `ApiError` 了：

```ts
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

#### 将任意一个类型断言为 `any`

理想情况下，`TypeScript` 的类型系统运转良好，每个值的类型都具体而精确。

当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const foo: number = 1;
foo.length = 1;

// index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
```

上面的例子中，数字类型的变量 `foo` 上是没有 `length` 属性的，故 `TypeScript` 给出了相应的错误提示。

这种错误提示显然是非常有用的。

但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

```ts
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 `window` 上添加一个属性 foo，但 `TypeScript` 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

此时我们可以使用 `as` `any` 临时将 `window` 断言为 `any` 类型：

```ts
(window as any).foo = 1;
```

在 `any` 类型的变量上，访问任何属性都是允许的。

需要注意的是，将一个变量断言为 `any` 可以说是解决 `TypeScript` 中类型问题的最后一个手段。

**它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 `as` `any`。**

上面的例子中，我们也可以通过扩展 `window` 的类型解决这个错误，不过如果只是临时的增加 `foo` 属性，`as` `any` 会更加方便。

总之，**一方面不能滥用 `as` `any`，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**[（这也是 `TypeScript` 的设计理念之一）](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)，才能发挥出 `TypeScript` 最大的价值。

#### 将`any`断言为一个具体的类型

在日常的开发中，我们不可避免的需要处理 `any` 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 `TypeScript` 类型系统的限制而无法精确定义类型的场景。

遇到 `any` 类型的变量时，我们可以选择无视它，任由它滋生更多的 `any`。

我们也可以选择改进它，通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any：`

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

### 断言类型的限制

从上面的例子中，我们可以总结出：

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 `any`
- `any` 可以被断言为任何类型

那么类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？

答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。

具体来说，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

下面我们通过一个简化的例子，来理解类型断言的限制：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: "Tom",
  run: () => {
    console.log("run");
  },
};
let animal: Animal = tom;
```

我们知道，`TypeScript` 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。

在上面的例子中，`Cat` 包含了 `Animal` 中的所有属性，除此之外，它还有一个额外的方法 ` run``。TypeScript ` 并不关心 `Cat` 和 `Animal` 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 `Cat extends Animal` 是等价的：

```ts
interface Animal {
  name: string;
}
interface Cat extends Animal {
  run(): void;
}
```

那么也不难理解为什么 `Cat` 类型的 `tom` 可以赋值给 `Animal` 类型的 `animal` 了——就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量。

我们把它换成 `TypeScript` 中更专业的说法，即：`Animal` 兼容 `Cat`。

当 `Animal` 兼容 `Cat` 时，它们就可以互相进行类型断言了：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

function testAnimal(animal: Animal) {
  return animal as Cat;
}
function testCat(cat: Cat) {
  return cat as Animal;
}
```

这样的设计其实也很容易就能理解：

- 允许 `animal as Cat` 是因为「父类可以被断言为子类」，这个前面已经学习过了
- 允许 `cat as Animal` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，而实际上 `TypeScript` 在判断类型的兼容性时，比这种情况复杂很多，详细请参考 类型的兼容性 章节。

总之，若 `A` 兼容 `B`，那么 `A`能够被断言为 `B`，`B` 也能被断言为 `A`。

同理，若 `B` 兼容 `A`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

所以这也可以换一种说法：

要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。

综上所述：

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 `any`
- `any` 可以被断言为任何类型
- 要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

其实前四种情况都是最后一个的特例。

### 双重断言

既然：

- 任何类型都可以被断言为 `any`
- `any` 可以被断言为任何类型
- 那么我们是不是可以使用双重断言 `as any as Foo` 来将任何一个类型断言为任何另一个类型呢？

```ts
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}

function testCat(cat: Cat) {
  return cat as any as Fish;
}
```

在上面的例子中，若直接使用 `cat as Fish` 肯定会报错，因为 `Cat` 和 `Fish` 互相都不兼容。

但是若使用双重断言，则可以打破「要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可」的限制，将任何一个类型断言为任何另一个类型。

若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。

**除非迫不得已，千万别用双重断言。**

### 类型断言 vs 类型转换

类型断言只会影响 `TypeScript` 编译时的类型，类型断言语句在编译结果中会被删除：

```ts
function toBoolean(something: any): boolean {
  return something as boolean;
}

toBoolean(1);
// 返回值为 1
```

在上面的例子中，将 `something` 断言为 `boolean` 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

```ts
function toBoolean(something) {
  return something;
}

toBoolean(1);
// 返回值为 1
```

所以类型断言不是类型转换，它不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：

```ts
function toBoolean(something: any): boolean {
  return Boolean(something);
}

toBoolean(1);
// 返回值为 true
```

### 类型断言 vs 类型声明

在这个例子中：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

我们使用 `as Cat` 将 `getCacheData` 函数的返回值由 `any` 类型断言为了 `Cat` 类型。

但实际上还有其他方式可以解决这个问题：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom: Cat = getCacheData("tom");
tom.run();
```

上面的例子中，我们通过类型声明的方式，将 `tom` 声明为 `Cat`，然后再将 `any` 类型的 `getCacheData('tom')` 赋值给 `Cat` 类型的 `tom`。

这和类型断言是非常相似的，而且产生的结果也几乎是一样的——`tom` 在接下来的代码中都变成了 `Cat` 类型。

它们的区别，可以通过这个例子来理解：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
let tom = animal as Cat;
```

在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `animal` 断言为 `Cat` 赋值给 `tom`。

但是若直接声明 `tom` 为 `Cat` 类型：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

const animal: Animal = {
  name: "tom",
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```

则会报错，不允许将 `animal` 赋值为 `Cat` 类型的 `tom`。

这很容易理解，`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。

深入的讲，它们的核心区别就在于：

- `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
- `animal` 赋值给 tom，需要满足 `Cat` 兼容 `Animal` 才行

但是 `Cat` 并不兼容 `Animal`。

而在前一个例子中，由于 `getCacheData('tom')` 是 `any` 类型，`any` 兼容 `Cat`，`Cat` 也兼容 `any`，故

```ts
const tom = getCacheData("tom") as Cat;
```

等价于

```ts
const tom: Cat = getCacheData("tom");
```

知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。

所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。

### 类型断言 vs 泛型

还是这个例子：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData("tom") as Cat;
tom.run();
```

我们还有第三种方式可以解决这个问题，那就是泛型：

```ts
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData<Cat>("tom");
tom.run();
```

通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。
