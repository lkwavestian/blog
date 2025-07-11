## 引言

在学习完 `TypeScript`的一些基础知识后，基本的概念已经熟悉了，但是对于`TypeScript` 的一些特殊的复杂的用法，理解上还是有些困难。简言之就是~~看似会了，其实不会~~。还得找点项目或者题目练练

我选择使用[Type-Challenges](https://github.com/type-challenges/type-challenges)来巩固所学的知识

`Type-Challenges`跟`Leet Code`感觉差不多，都是一系列题目，难度分为简单(`easy`)、中等(`medium`)、困难(`hard`)以及地狱(`extreme`)难度，通过这些题目去巩固以及精进我们所学的知识，帮助我们把`Typescript`的知识点给融会贯通了

下面是我挑选的一些不是特别偏门的题目，开写！

## 前置知识

写这些题目用到了大量的`TypeScript`类型运算符`，提前了解并熟悉很有必要，具体可以看阮一峰老师的[TypeScript 类型运算符](https://wangdoc.com/typescript/operator)

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

也就是说，如何实现遍历是关键，主要使用 [`in` 和 `keyof`](https://juejin.cn/post/7105778922851139598) 这两个关键字，遍历方法如下

```ts
type Copy<T> = {
  [P in keyof T]: T[P];
};

type Case = Copy<{
  a: string;
  b: number;
}>;

let obj: Case = {
  a: "1",
  b: 1,
};
```

另外，还需要注意下错误的测试用例`MyPick<Todo, "title" | "completed" | "invalid">`，我们必须限制`K`对应的这一系列属性在`T`中存在

**题解**

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

**心得与知识点**

1. [`in` 和 `keyof`的使用](https://juejin.cn/post/7105778922851139598) 来实现遍历
2. 需要注意错误的的测试用例

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

目前，我们的参数是联合类型，但是题目给的是元组，我们需要把元组转换成联合类型。

此处用了`T[number]`，它可以用来获取元祖的元素类型（联合类型）。

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};
```

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
