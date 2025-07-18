## `object`

`object` 类型表示非原始类型，也就是除 `boolean` `string` `number` `bigint` `symbol` `null` `undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`

```ts
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

### 特殊类型

除以上被提到的一些原始类型外，在 `TypeScript` 中，还存在一些特殊的类型

- `any` 任意值
- `void` 空值
- `null`
- `undefined`

### `unknown` 未知类型

`unknown` 类型用于描述一个我们还不知道其类型的变量

就像所有类型都可以被归为 `any`，所有类型也都可以被归为 `unknown`。这使得 `unknown` 成为 `TypeScript` 类型系统的另一种顶级类型

```ts
let notSure: unknown = 4
notSure = 'maybe a string instead'
notSure = false // 也可以是个 boolean
```

:::tip `unknown` 和 `any`
相比于 `any` 类型不会对变量进行任何检查，对于 `unknown` 类型的变量在执行大多数操作时必须进行相应的检查，因此 `unknown` 类型相对更加严格
:::

### `never`

`never` 类型表示的是那些永不存在的值的类型，常用于一个从来不会有返回值的函数，或者一个总是会抛出错误的函数

```ts
// 不会有返回值
function infiniteLoop(): never {
  while (true) {}
}

// 总是会抛出错误的函数
function error(message: string): never {
  throw new Error(message)
}
```

`never` 类型仅能被赋值给另外一个 `never` 类型

### 类型推断与类型注解

- **类型注解**：显式指定变量的类型
- **类型推断**：由 `TypeScript` 根据上下文内容自动推断出变量类型

```ts
let name: string = 'qianxun'
let age = 18 // TypeScript 自动推断为 job: number
```

:::tip

- 在为变量赋值明确的值时，建议尽量使用 **类型注解** 的方式
- 对于函数返回值，始终显示指明返回类型是个更好的习惯

:::

### 数组

在 `TypeScript` 中，数组类型声明有 `类型[]` 以及**泛型**两种形式

通过**类型 + 方括号**定义数组类型：

```ts
// 只允许存储 string 类型
const strArray: string[] = ['1', '2', '3']
// 只允许存储 number 类型
const numArray: number[] = [1, 2, 3]
// 任意类型
const anyArray: any[] = ['qianxun', 18, {}]
```

通过**泛型**定义数组类型：

```ts
// 只允许存储 string 类型
const strArray: Array<string> = ['1', '2', '3']
// 只允许存储 number 类型
const numArray: Array<number> = [1, 2, 3]
// 任意类型
const anyArray: Array<any> = ['qianxun', 18, {}]
```

### 元组 Tuple

元组（Tuple）类型表示一个固定长度的数组，并且已知每项所对应的类型

当对元组类型的数据进行 **越界访问** 或 **分配错误的类型值** 时，`TypeScript` 将报错提示

```ts
const tuple: [string, number] = ['qianxun', 18]

console.log(tuple[2]) // Error
tuple[0] = 666 // Error
```

### 枚举类型 Enum

`enum` 类型是对 `JavaScript` 标准数据类型的一个补充。像 `C#` 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
const c: Color = Color.Green
```

默认情况下，从 `0` 开始为元素编号。你也可以手动的指定成员的数值。例如，我们将上面的例子改成从 `1` 开始编号：

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
const c: Color = Color.Green
```

或者全部都采用手动赋值：

```ts
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}

const c: Color = Color.Green
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为 `2`，但是不确定它映射到 `Color` 里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
const colorName: string = Color[2]

console.log(colorName) // 'Green' 因为上面代码里它的值是 2
```

::: tip 枚举总结

- 都没有初始值时，默认是从 `0` 开始自增
- 当第一个成员初始化赋值为 `10` 时，后面的成员从 `10` 开始增长
- 数字类型的枚举可以映射，字符串类型的枚举不可以映射
  - 当一个枚举都为数字类型时，被赋值的变量可以取超出枚举值的数值
  - 当一个枚举都为字符串类型时，被赋值的变量只能取枚举成员
- 如果第 n 个成员赋值为 `string` 类型时，则 n 只后的成员都需要初始化
- `const` 声明的枚举是常量枚举，会在编译后被移除
- 常量枚举会在编译时直接计算出结果，计算类型的枚举会在运行时计算出结果
- 不建议数字类型和字符串枚举混用

:::

### 对象的类型 —— 接口

在 `TypeScript` 中，我们使用接口（Interfaces）来定义对象的类型。
接口是一种用于描述对象形状的方式，它可以定义一个对象需要具备哪些属性和方法（接口只是对类型做出了一些限制，并不会在代码中创建新的对象，即不会编译到 `JavaScript` 中）

```ts
interface Person {
  name: string
  age: number
}

const person: Person = {
  name: 'qianxun',
  age: 18,
}
```

以上代码中，`person` 变量是 `Person` 类型的，因此它**只能接受接口规定的属性，且属性值的类型也必须和接口中规定的一致，当多一个或少一个属性时 `TypeScript` 都会编译出错**

```ts{5,9}
interface Person {
  name: string
  age: number
}

// Error: 缺少属性 "age"
const person1: Person = {
  name: 'qianxun'
}
// Error: "gender" 不在类型 "Person" 中
const person2: Person = {
  name: 'Tom',
  age: 18,
  gender: 'male'
}
```

#### 可选属性

当我们希望不要完全匹配一个形状时，可以**使用问号（?）来标记一个接口属性为可选的**（意味着这个属性可以不存在）

```ts
interface Person {
  name: string
  age?: number
}

const person: Person = {
  name: 'qianxun',
}
```

这时**仍然不允许添加未定义的属性**

```ts{6}
interface Person {
  name: string
  age?: number
}

// Error: "gender" 不在类型 "Person" 中
const person: Person = {
  name: 'Tom',
  age: 18,
  gender: 'male'
}
```

#### 任意属性

当我们希望一个接口允许有任意的属性时，可以使用如下方式：

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

const person: Person = {
  name: 'qianxun',
  gender: 'male',
}
```

**使用 `[propName: string]` 定义了任意属性取 `string` 类型的值**

注意点：**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts{7}
interface Person {
  name: string
  age?: number
  [propName: string]: string
}

// Error: 属性 "age" 与索引签名不兼容，不能将类型 "number" 分配给类型 "string"
const person: Person = {
  name: 'Tom',
  age: 18,
  gender: 'male'
}
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string | number
}

const person: Person = {
  name: 'Tom',
  age: 18,
  gender: 'male',
}
```

#### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts{15}
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

const person: Person = {
  id: 1,
  name: 'Tom',
  age: 18,
  gender: 'male'
}

// Error: 无法为 "id" 赋值，因为它是只读属性
person.id = 1996
```

**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**：

```ts{8,15}
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

// Error: 缺少属性 "id"
const person: Person = {
  name: 'Tom',
  age: 18,
  gender: 'male'
}

// Error: 无法为 "id" 赋值，因为它是只读属性
person.id = 1996
```

### 类型别名

类型别名使用 `type` 关键字定义，它可以给现有的类型起一个新的名字。其主要用于定义一些复杂的类型：如联合类型、交叉类型等

```ts
type ID = number

type Person = {
  name: string
  age: number
}
```

### 字面量类型

字面量类型是一种特殊的类型，表示一个固定的值

**字符串字面量类型**：

```ts
type Name = 'qianxun' | 'lkwavestian' | 'Tom'
```

**数字字面量类型**：

```ts
type Age = 18 | 19 | 20
```

**布尔字面量类型**：

```ts
type IsLoggedIn = true
```

使用字面量类型可以在编译时进行更严格的类型检查，避免因为传入了不正确的值导致运行时出错。同时字面量类型还可以用于定义联合类型、交叉类型等高级类型，提高代码的可读性和可维护性
