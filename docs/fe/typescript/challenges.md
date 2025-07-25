# 类型体操

## 引言

在学习完 `TypeScript`的一些基础知识后，基本的概念已经熟悉了，但是对于`TypeScript` 的一些特殊的复杂的用法，理解上还是有些困难。简言之就是~~看似会了，其实不会~~。还得找点项目或者题目练练

我选择使用[Type-Challenges](https://github.com/type-challenges/type-challenges)来巩固所学的知识

`Type-Challenges`跟`Leet Code`感觉差不多，都是一系列题目，难度分为简单(`easy`)、中等(`medium`)、困难(`hard`)以及地狱(`extreme`)难度，通过这些题目去巩固以及精进我们所学的知识，帮助我们把`Typescript`的知识点给融会贯通了

## 前置知识

写之前有一些东西还是需要提前了解下：

- 题目测试用例中有一些像`Expect`、`Case`等`type-challenges`自己定义的类型别名，也不需要将这些类型别名内部逻辑搞太明白，只需要知道`Expect`的传入类型参数`T`必须是`true`，`Equal`传入的两个类型参数`X`和`Y`必须相等，不太明白也没啥关系，写点题目慢慢就懂了

- 题目中有个特殊的注释`@ts-expect-error`，意思是告诉编辑器，这行注释下一行代码会产生一个类型错误，如果它飘红，一般是某些边缘情况没有考虑到

- 写这些题目用到了大量的`TypeScript`类型运算符，提前了解并熟悉很有必要，具体可以看阮一峰老师的[TypeScript 类型运算符](https://wangdoc.com/typescript/operator)，不熟悉也没关系，遇到了再回头看就行

下面是我挑选的一些不是特别偏门的题目，不多说，开写！

## Easy 简单

### 4-实现 `Pick` 选取

**题目描述**

实现 `TS` 内置的 `Pick<T, K>` 的功能。它的作用是：从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
```

**解题思路**

要想实现从类型 `T` 中选出符合 `K` 的属性，就需要遍历`T`，在`T`中找出`K`对应的属性，并返回一个新类型

遍历的话可以使用`in`操作符

另外，还需要注意下错误的测试用例，当联合类型`K`中的某一个类型不是`T`的属性值时，需要要报错，所以我们必须限制`K`对应的这一系列属性在`T`中存在，需要使用`extends` 和`keyof`

**题解**

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

**心得与知识点**

1. `in`操作符遍历
2. 使用`extends` 和 `keyof`做类型限定
3. 需要注意错误的的测试用例

### 7-实现 `Readonly`只读

**题目描述**

实现内置的`Readonly<T>`。它的作用是：接收一个泛型参数，并返回一个完全一样的类型，只是所有属性都会是只读 `(readonly)` 的。即不可以再对该对象的属性赋值。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
```

**解题思路**

只需要在遍历的时候将属性设置为只读即可，此处需要用到`typescript`中的修饰符`readonly`

**题解**

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

**心得与知识点**

::: tip [typescript 中的修饰符](TS中的类和修饰符)

1. public：公共修饰符，可以被类的实例、子类和外部访问。默认情况下，类的成员都是公共的。
2. private：私有修饰符，只能被类的内部访问。私有成员对于外部是不可见的，子类也无法访问。
3. protected：受保护修饰符，可以被类的内部和子类访问，对于外部是不可见的。
4. readonly：只读修饰符，表示成员只能在声明时或构造函数内部被赋值，之后不可修改。
5. static：静态修饰符，用于定义类级别的成员，而不是实例级别的成员。静态成员可以通过类名直接访问，而不需要创建实例。
6. abstract：抽象修饰符，用于声明抽象类和抽象方法。抽象类不能被实例化，只能被继承，并且子类必须实现抽象方法。

:::

### 11-元组转换为对象

**题目描述**

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const sym1 = Symbol(1);
const sym2 = Symbol(2);
const tupleSymbol = [sym1, sym2] as const;
const tupleMix = [1, "2", 3, "4", sym1] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      { tesla: "tesla"; "model 3": "model 3"; "model X": "model X"; "model Y": "model Y" }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; "2": "2"; 3: 3; "4": "4"; [sym1]: typeof sym1 }>
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
```

**解题思路**

第一步还是得看懂题目，有几个关键点需要提前了解下

首先是[`as const`](https://juejin.cn/post/7181833448464580645)，它是一种类型断言，用于将一个表达式（如数组、对象或字面量）视为常量值，从而推导出更具体的类型，它有以下几个特点

1. 禁止重新赋值：变量本身不能被重新赋值。
2. 精确的类型推导：TypeScript 不会将变量的类型泛化为 string 或 number，而是直接使用字面量类型。
3. 适用于字面量类型：主要用于数组、对象或基本类型的字面量。

在此处会将`['tesla', 'model 3']` 推导为常量元组表示其不能新增、删除、修改元素（即 `readonly ["tesla", "model 3", "model X", "model Y"]`）

然后是[`typeof`](https://juejin.cn/post/7096869746481561608#heading-3)，它作为类型查询操作符，用来获取变量的类型。

```ts
const p = {
  name: "CJ",
  age: 18,
};

type Person = typeof p;

// 等同于
type Person = {
  name: string;
  age: number;
};
```

了解了这两个知识点，这题的解法就呼之欲出了，其实就是遍历元组，将元组中的元素作为键，元组中的元素对应的值作为值，并返回一个对象类型

遍历元组目前还不知道怎么办，通过之前的题目，我们已经知道了如何使用 `in` 操作符遍历联合类型，先写一个参数为联合类型的简单版本

```ts
// PropertyKey 是 ts 内置类型：type PropertyKey = string | number | symbol
type Test<K extends PropertyKey> = {
  [P in K]: P;
};

type Case1 = Test<"a" | "b">;
// 相当于 type Case1 = { a: 'a', b: 'b' }
```

目前，我们的参数是联合类型，但是题目给的是元组，我们需要把元组转换成联合类型：

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};
```

:::tip `T[number]`是什么

此处用了`T[number]`，它的意思是“取出 T 这个数组/元组的所有元素类型，组成一个联合类型”。

```ts
type Arr = [1, 2, 3];
type Element = Arr[number]; // 1 | 2 | 3
```

:::

但是这样写之后，错误测试用例没有触发，还需要限制一下参数的类型

此处使用`PropertyKey`，它相当于`type PropertyKey = string | number | symbol`

**题解**

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};
```

**心得与知识点**

1. [`as const`](https://juejin.cn/post/7181833448464580645)
2. [`typeof`](https://juejin.cn/post/7096869746481561608#heading-3)
3. `T[number]`可以将获取元祖的元素类型（联合类型）
4. `PropertyKey`是`ts`的内置类型，它相当于`type PropertyKey = string | number | symbol`

### 14-第一个元素

**题目描述**

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
```

**解题思路**

看到这题的时候，我下意识的这样写

```ts
type First<T extends any[]> = T[0];
```

但是测试用例`Expect<Equal<First<[]>, never>>,` 没有通过，空数组应该返回`never`

所以，我尝试这样写

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

成功了，这里是通过`extends`判断`T`是否是`[]`的子类型判断来`T`是否为空数组，关于 `extends`的这种三元表达式的用法，可以参考[这里](https://wangdoc.com/typescript/operator#extends-%E6%9D%A1%E4%BB%B6%E8%BF%90%E7%AE%97%E7%AC%A6)

看了下其他答案，也有比较好的写法，比如：

```ts
type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
```

它通过`T["length"]`是否是`0`来判断数组是否是空数组。

还有另一个写法

```ts
type First<T extends any[]> = T extends [infer F, ...infer _] ? F : never;
```

关于`infer`的用法，可以参考[精读《Typescript infer 关键字》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/207.%E7%B2%BE%E8%AF%BB%E3%80%8ATypescript%20infer%20%E5%85%B3%E9%94%AE%E5%AD%97%E3%80%8B.md)

**题解**

```ts
type First<T extends any[]> = T extends [] ? never : T[0];

// type First<T extends any[]> = T["length"] extends 0 ? never : T[0];
// type First<T extends any[]> = T extends [infer F, ...infer _] ? F : never;
```

**心得与知识点**

1. 条件运算符 `extends...?:`可以根据当前类型是否符合某种条件，返回不同的类型。

```ts
T extends U ? X : Y

```

上面式子中的`extends`用来判断，类型 T 是否可以赋值给类型`U`，即`T`是否为`U`的子类型，这里的`T`和`U`可以是任意类型。

2. [精读《Typescript infer 关键字》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/207.%E7%B2%BE%E8%AF%BB%E3%80%8ATypescript%20infer%20%E5%85%B3%E9%94%AE%E5%AD%97%E3%80%8B.md)

### 18-获取数组长度

**题目描述**

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = ["FALCON 9", "FALCON HEAVY", "DRAGON", "STARSHIP", "HUMAN SPACEFLIGHT"] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];
```

**解题思路**

元组有一个方法`T['length']`可以获取`T`对象的`length`属性值，在这里可以直接获取到`T`的数组长度

**题解**

```ts
type Length<T extends readonly any[]> = T["length"];
```

**心得与知识点**

1. `T['length']`可以获取`T`元组的长度

### 43-实现`Exclude`

**题目描述**

实现内置的 `Exclude <T, U>`类型，它的作用是：从联合类型 `T` 中排除 `U` 的类型成员，来构造一个新的类型

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>
];
```

**解题思路**

这题主要是使用了条件类型中的[分布式条件类型概念](./advanced.md#分布式条件类型)

了解了这个概念，答案就呼之欲出了。这里我们需要反向思考，比如`MyExclude<"a" | "b" | "c", "a">, "b" | "c">`这个测试用例，我们需要将`"a"`从`"a" | "b" | "c"`中排除掉，也就是将`"a"`作为条件类型，如果匹配，则返回`never`，否则返回原类型

**题解**

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

### 189-实现`Awaited`

**题目描述**

假如我们有一个 `Promise` 对象，这个 `Promise` 对象会返回一个类型。在 `TS` 中，我们用 `Promise` 中的 `T` 来描述这个 `Promise` 返回的类型。请你实现一个类型，可以获取这个类型。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];
```

**解题思路**

其实就是想要拿到`Promise`的返回值，这里需要用到 [infer](./advanced.md#infer)来帮助我们推断`Promise`的返回值。我的第一反应：

```ts
type MyAwaited<T> = T extends Promise<infer R> ? R : never;
```

只有测试前两个测试用例通过了，看来我们还需要考虑嵌套的情况，这里需要使用递归思想：

```ts
type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T;
```

拿第一个例子（无嵌套）举例：

- 第一次循环判断为`true`，推断`R`为`string`，走`MyAwaited<string>`
- 第二次循环判断为`false`，直接返回`false`

拿第二个例子（有嵌套）举例：

- 第一次循环判断为`true`，推断`R`为`Promise<string | number>`，走`MyAwaited<Promise<string | number>>`
- 第一次循环判断为`true`，推断`R`为`string | number>`，走`MyAwaited<string | number>`
- 第三次循环判断为`false`，直接返回`string | number`

最后一个测试用例还是没通过，仔细看下，这是一个类`Promise`的场景，太复杂的解法这里就不再涉及了，偷懒直接用`extends`把它包裹进来就行了，

**\*题解**

```ts
type MyAwaited<T> = T extends
  | Promise<infer R>
  | { then: (onfullfilled: (arg: infer R) => any) => any }
  ? MyAwaited<R>
  : T;
```

### 268-实现`if`

**题目描述**

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>,
  Expect<Equal<If<boolean, "a", 2>, "a" | 2>>
];

// @ts-expect-error
type error = If<null, "a", "b">;
```

**解题思路**

这题乍一看，很简单，可以这样写：

```ts
type If<C, T, F> = C extends true ? T : F;
```

但是错误的测试用例没有通过，也就是当 `C` 为 `null` 时，需要报错

我们需要对`C`做类型限制，只能是 `boolean` 类型

**题解**

```ts
type If<C extends Boolean, T, F> = C extends true ? T : F;
```

### 533-实现`Concat`

**题目描述**

在类型系统里实现 `JavaScript` 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const tuple = [1] as const;

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<["1", 2, "3"], [false, boolean, "4"]>, ["1", 2, "3", false, boolean, "4"]>>
];

// @ts-expect-error
type error = Concat<null, undefined>;
```

**解题思路**

这个题目乍一看，好像没有什么思路，但是实际上非常简单，`ts`继承自`js`，所以天然支持 `...` 扩展运算符，再针对参数做下限制，限制其只能是数组类型，很容易写出第一个版本：

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

发现只有一个测试用例没有通过

```ts
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
```

报错信息为：`类型“readonly [1]”不满足约束“any[]”。 类型 "readonly [1]" 为 "readonly"，不能分配给可变类型 "any[]"。ts(2344)`

由于 `tuple` 被 `as const` 做了类型断言，`tuple` 的类型其实为 `readonly [1]`，我们又规定 `Concat` 的参数 `T` 必须由 `any[]`约束，经过测试发现这两种类型不存在约束关系：

```ts
type Q = readonly any[] extends any[] ? true : false; // false
```

为了解决这个问题，我们可以将约束扩大

```ts
type Q = any[] extends readonly any[] ? true : false; // true
```

:::tip 为什么 `any[] extends readonly any[]` 会是`true`

你可能觉得：

- `any[]` 是可变数组
- `readonly any[]` 是只读数组
  可变的怎么能赋值给只读的？可变为什么是只读的子类型?（现实中反过来才安全）

`TypeScript` 的解释：

1. 结构型类型系统
   `TypeScript` 判断类型兼容性时，采用结构型类型系统，只看结构，不看“意图”。
   `readonly` `any[]` 的结构是“有数字索引，值类型为 `any`，不能通过可变方法修改”
   `any[]` 的结构是“有数字索引，值类型为 `any`，可以修改”
2. `extends` 的判断逻辑
   `any[]` 里的每个元素都可以赋值给 `readonly any[]` 的每个元素（因为都是 `any`）
   `TypeScript` 只检查“能不能赋值”，不检查“能不能安全地赋值”
   所以 `any[]` 可以赋值给 `readonly any[]`，即 `any[] extends readonly any[]` 为 `true`
3. 只读修饰符的本质
   `readonly` 只影响赋值给变量后能不能改，不影响类型兼容性判断
   换句话说，`readonly any[]` 是 `any[]` 的超集，任何 `any[]` 都可以当成 `readonly any[]` 用

例子：

```ts
let arr1: any[] = [1, 2, 3];
let arr2: readonly any[] = arr1; // ✅ 合法

arr2[0] = 10; // ❌ 报错，只读
arr1[0] = 10; // ✅ 可以改
```

反过来就不行：

```ts
let arr3: readonly any[] = [1, 2, 3];
let arr4: any[] = arr3; // ❌ 报错，不能把只读数组赋值给可变数组
```

:::

**题解**

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
```

### 898-实现`includes`

**题目描述**

在类型系统里实现 `JavaScript` 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>>,
  Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
```

**解题思路**

第一反应是使用`extends`：

```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
```

但是很多测试用例都过不了，看来得想其他方法

遍历是个不错的方法，遍历元祖`T`的每一项，只要有一项与 `U` 完全相等，就返回 `true`，否则返回 `false`

关于如何精准的判断两个类型相等，可以参考[ts 官方 issues 谈论](https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650)，`type-challenges` 测试用例中的`Equal`也是参考这个实现的

```ts
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;
```

可能是判断的边缘条件太多，属实看不懂其内部逻辑，就这样吧，知道就行

至于遍历的方法，可以使用匹配推断的方式:

```ts
type Traverse<T extends any[]> = T extends [infer F, ...infer R] ? [F, ...Traverse<R>] : [];

// Case1 = [1, 2, 3];
type Case1 = Traverse<[1, 2, 3]>;
```

先推断是第一个元素的类型，假设其为`F`，再递归判断剩余的元素类型，临界条件是元祖`T`数量为`0`，此时返回空数组

了解了元祖的遍历后，再结合`Equal`函数，这题的思路就清晰了

**题解**

```ts
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? MyEqual<F, U> extends true
    ? true
    : Includes<R, U>
  : false;
```

**心得与知识点**

1. 元祖遍历的第一种方式：`T[number]`
2. 元祖遍历的第二种方式：`T extends [infer F, ...infer R]`
3. 了解完全相等`Equal`

### 3057-实现`Push`

**题目描述**

在类型系统里实现通用的 `Array.push`

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
```

**解题思路**

这题很简单，使用 `...` 扩展运算符就行

**题解**

```ts
type Push<T extends any[], U> = [...T, U];
```

### 3057-实现`Unshift`

**题目描述**

在类型系统里实现通用的 `Array.unshift`

**测试用例**

```ts
// ============= Test Cases =============
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<["1", 2, "3"], boolean>, [boolean, "1", 2, "3"]>>
];
```

**解题思路**

这题跟上面的`Push`思路差不多，只是使用 `...` 扩展运算符的位置不同

**题解**

```ts
type Unshift<T extends any[], U> = [U, ...T];
```

### 3312-实现`Parameters`

**题目描述**

实现内置的 Parameters 类型，而不是直接使用它，可[参考 TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: "A" }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
```

**解题思路**

`MyParameters` 的参数是函数的类型，返回一个元祖，元祖内容是函数参数的类型

这题乍一看没啥思路，看了别人的答案才知道怎么写：函数类型的参数完全可以由`infer`自己推断而得。`infer`是一个典型的**难理解但是很好用**的东西，还是得多理解多使用

**题解**

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer R) => any
  ? R
  : never;
```

## 中等

### 2-获取函数返回类型

**题目描述**

不使用 `ReturnType` 实现 `TypeScript` 的 `ReturnType<T>` 泛型

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);
```

**解题思路**

这题与[3312-实现 parameters](#3312-实现parameters)差不多，一个是处理参数一个是处理返回结果，都得使用神奇的`infer`

**题解**

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### 3-实现`Omit`

**题目描述**

不使用 `Omit` 实现 `TypeScript` 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

**测试用例**

```ts
// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  Expect<Equal<Expected3, MyOmit<Todo1, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}
```

**解题思路**

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象

`Omit` 的作用是从`T`中排除`K`
