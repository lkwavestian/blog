## 引言

`Composition API（组合式API）`是 `Vue3.0` 的一个新特性，它让我们可以更灵活的组合 `Vue` 的功能。虽然我也使用了挺长时间了，但是最近看了一些文章之后，关于`Composition API`的理解与使用感觉自己还是没有到位，写这篇文章也正是为了系统总结下`Composition API`相关概念与最佳实践。

## 什么是 Composition API（组合式 API）？

其实从名字就可以看出来：`Composition API`就是组合的`API`，也就是一系列`API`的集合。区别于`Vue2`的`Options API（选项式API）`，`Composition API`更强调使用函数思想去写组件。同时它也是一个概括性的术语，包涵以下方面的`API`。

- 响应式 `API`：例如 `ref` 和 `reactive`，使我们可以直接创建响应式状态、计算属性和侦听器。

- 生命周期钩子：例如 `onMounted()` 和 `onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。

- 依赖注入：例如 `provide()` 和 `inject()`，使我们可以在使用响应式 `API` 时，利用 `Vue` 的依赖注入系统。

::: warning
虽然这套 `API` 的风格是基于函数的组合，但组合式 `API` 并不是函数式编程。

组合式 `API` 是以 `Vue` 中数据可变的、细粒度的响应性系统为基础的，而函数式编程通常强调数据不可变。
:::

## 组合式 API 的优势

### 更好的逻辑复用

组合式 `API` 最基本的优势是它使我们能够通过组合函数来实现更加简洁高效的逻辑复用。在选项式 `API`中我们主要的逻辑复用机制是 `mixins`，而组合式 `API` 解决了 `mixins` 的所有缺陷。

::: details mixins 的缺陷以及 组合式 API 的解决方法

- 数据来源不清晰：当使用了多个 `mixin` 时，实例上的数据属性来自哪个 `mixin` 变得不清晰，而组合式 `API` 暴露给模板的数据来源十分清晰，因为它通过函数返回值来传递数据。

- 命名冲突：当我们使用了多个 `mixin` 时，这几个 `mixin` 内部可能会使用相同的属性名，造成命名冲突。若使用组合式函数，我们可以通过在解构变量时对变量进行重命名来避免相同的属性名。

- 隐式的跨 `mixin` 交流：多个 `mixin` 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。
  :::

### 更灵活的代码组织

在`vue2`中，使用`Options API`的主要思想是，将一个组件的不同部分（如 `data`、`methods`、`computed` 等）定义在不同的选项中。这种方式的优点是结构清晰，易于上手，编辑小组件比较方便。但是，当组件变得越来越复杂时，这种方式可能会导致代码的可读性和可维护性下降。

例如，假设我们有一个非常复杂的组件，它涉及到多个功能模块。在 `Options API` 中，我们需要将这些功能模块的代码分散到不同的选项中。这可能会让我们在阅读和理解代码时感到困惑，因为我们需要在不同的选项之间来回跳跃。另外，如果我们想要将一段逻辑抽离重构到一个可复用的工具函数中，需要从文件的多个不同部位找到所需的代码逻辑，这难免闲得有些麻烦。

但是如果使用组合式 `API`，我们就可以将相同功能模块的代码组织在一起，并使用组合式函数来组合这些功能模块（更符合高内聚、低耦合的要求）。这样，我们的代码结构会更加清晰，并且我们可以更轻松地找到所需的代码逻辑。

### 更好的类型推导

因为`Composition API`主要利用基本的变量和函数，它们本身就是类型友好的，会有更好的类型推导，使得我们可以更容易地在`TypeScript`中使用`Vue`。

### 更小的生产包体积

搭配 `<script setup>` 使用组合式 `API` 比等价情况下的选项式 `API` 更高效，对代码压缩也更友好。这是由于 `<script setup>` 形式书写的组件模板被编译为了一个内联函数，和 `<script setup>` 中的代码位于同一作用域。不像选项式 `API` 需要依赖 `this` 上下文对象访问属性，被编译的模板可以直接访问 `<script setup>` 中定义的变量，无需从实例中代理。这对代码压缩更友好，因为本地变量的名字可以被压缩，但对象的属性名则不能。

## 组合式函数

### 什么是组合式函数

在 Vue 应用的概念中，“组合式函数”(`Composables`) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了无状态的逻辑：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如我们可能已经用过的 `lodash` 或是 `date-fns`。

相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

### 鼠标跟踪器实例

如果我们要直接在组件中使用组合式 `API` 实现鼠标跟踪功能，它会是这样的：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);

function update(event) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => window.addEventListener("mousemove", update));
onUnmounted(() => window.removeEventListener("mousemove", update));
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

但是，如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中：

```js
// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // 通过返回值暴露所管理的状态
  return { x, y };
}
```

下面是它在组件中使用的方式：

```vue
<script setup>
import { useMouse } from "./mouse.js";

const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

如我们所见，核心逻辑完全一致，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。和在组件中一样，我们也可以在组合式函数中使用所有的组合式 `API`。现在，`useMouse()` 的功能可以在任何组件中轻易复用了。

更进一步，我们还可以嵌套多个组合式函数：一个组合式函数可以调用一个或多个其他的组合式函数。这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。实际上，这正是这一设计模式的 API 集合命名为组合式 API 的原因。

举例来说，我们可以将添加和清除 DOM 事件监听器的逻辑也封装进一个组合式函数中：

```js
// event.js
import { onMounted, onUnmounted } from "vue";

export function useEventListener(target, event, callback) {
  // 如果我们想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
```

有了它，之前的 `useMouse()` 组合式函数可以被简化为：

```js
// mouse.js
import { ref } from "vue";
import { useEventListener } from "./event";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, "mousemove", (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  });

  return { x, y };
}
```

::: tip
每一个调用 `useMouse()` 的组件实例会创建其独有的 `x`、`y` 状态拷贝，因此他们不会互相影响。如果我们想要在组件之间共享状态，请阅读状态管理这一章。
:::

### 异步状态式例

`useMouse()` 组合式函数没有接收任何参数，因此让我们再来看一个需要接收一个参数的组合式函数示例。在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

```vue
<script setup>
import { ref } from "vue";

const data = ref(null);
const error = ref(null);

fetch("...")
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err));
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

如果在每个需要获取数据的组件中都要重复这种模式，那就太繁琐了。让我们把它抽取成一个组合式函数：

```js
// fetch.js
import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
```

现在我们在组件里只需要：

```vue
<script setup>
import { useFetch } from "./fetch.js";

const { data, error } = useFetch("...");
</script>
```

### 接收响应式状态

`useFetch()` 接收一个静态 `URL` 字符串作为输入——因此它只会执行一次 `fetch` 并且就此结束。如果我们想要在 `URL` 改变时重新 `fetch` 呢？为了实现这一点，我们需要将响应式状态传入组合式函数，并让它基于传入的状态来创建执行操作的侦听器。

举例来说，`useFetch`() 应该能够接收一个 `ref`：

```js
const url = ref("/initial-url");

const { data, error } = useFetch(url);

// 这将会重新触发 fetch
url.value = "/new-url";
```

或者接收一个 `getter` 函数：

```js
// 当 props.id 改变时重新 fetch
const { data, error } = useFetch(() => `/posts/${props.id}`);
```

我们可以用 `watchEffect()` 和 `toValue() API` 来重构我们现有的实现：

```js
// fetch.js
import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
```

`toValue()` 是一个在 3.3 版本中新增的 `API。它的设计目的是将` `ref` 或 `getter` 规范化为值。如果参数是 `ref`，它会返回 `ref` 的值；如果参数是函数，它会调用函数并返回其返回值。否则，它会原样返回参数。它的工作方式类似于 `unref()`，但对函数有特殊处理。

注意 `toValue(url)` 是在 `watchEffect` 回调函数的内部调用的。这确保了在 `toValue()` 规范化期间访问的任何响应式依赖项都会被侦听器跟踪。

这个版本的 `useFetch()` 现在能接收静态 `URL` 字符串、`ref` 和 `getter`，使其更加灵活。`watch effect` 会立即运行，并且会跟踪 `toValue(url)` 期间访问的任何依赖项。如果没有跟踪到依赖项 (例如 `url` 已经是字符串)，则 `effect` 只会运行一次；否则，它将在跟踪到的任何依赖项更改时重新运行。

## 最佳实践

虽然`Composition API` 相比 `Options API` 更灵活，但同时灵活是把双刃剑，写`Composition API`对我们的`JS`要求会更高，使我们容易写出不好维护的代码，所以我们需要探索 `Composition API` 的最佳实践。具体来说就是如何组织 `setup` 中的代码，让代码的阅读性和可维护性更好。

### 命名

组合式函数约定用驼峰命名法命名，并以`use`作为开头。

### 编写顺序

为了减少在 `setup` 函数中太灵活的编写，导致代码逻辑散乱问题。约定编写顺序规范，可以从 `import` 语句、`Props（defineProps）`、`Emits（defineEmits）`、响应式变量定义、`Computed`、`Watch` 监听函数、生命周期钩子、自定义函数、`Expose（defineExpose）`等顺序编写，在团队中按照一定的逻辑顺序编写，可以使代码更具可读性和可维护性。

```vue
<script setup>
// import 语句
// Props（defineProps）
// Emits（defineEmits）
// 响应式变量定义
// Computed
// Watch 监听函数
// 生命周期钩子
// 自定义函数
// Expose（defineExpose）
</script>
```

### 逻辑关注点分离

不要把所有逻辑堆砌在 `setup()` 中，使用组合式函数思想，按功能拆分为独立函数：

```js
// 用户相关逻辑
function useUser() {
  const user = ref(null);
  const fetchUser = async () => {
    /* ... */
  };
  return { user, fetchUser };
}

// 订单相关逻辑
function useOrders() {
  const orders = ref([]);
  const loadOrders = async () => {
    /* ... */
  };
  return { orders, loadOrders };
}

export default {
  setup() {
    const { user, fetchUser } = useUser();
    const { orders, loadOrders } = useOrders();

    return { user, orders, fetchUser, loadOrders };
  },
};
```

### 逻辑拆分原则

如果需要提取的是公共的变量以及方法，将`use`文件放在`src/use`文件夹下

```text
src/
  use/
    useFetch.js
    ...
```

如果需要提取的是单一组件专用的变量以及方法，`use`文件的放置与组件层级相同

```text
components/
  UserProfile/
    index.vue
    useUserData.js
    useUserOrders.js
```

### 输入参数

即便不依赖于 `ref` 或 `getter` 的响应性，组合式函数也可以接收它们作为参数。如果我们正在编写一个可能被其他开发者使用的组合式函数，最好处理一下输入参数是 `ref` 或 `getter` 而非原始值的情况。可以利用 `toValue()` 工具函数来实现

```js
import { toValue } from "vue";

function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter);
}
```

如果我们的组合式函数在输入参数是 `ref` 或 `getter` 的情况下创建了响应式 `effect`，为了让它能够被正确追踪，请确保要么使用 `watch()` 显式地监视 `ref` 或 `getter`，要么在 `watchEffect()` 中调用 `toValue()`。

### 返回值

我们可能已经注意到了，我们一直在组合式函数中使用 `ref()` 而不是 `reactive()`。我们推荐的约定是组合式函数始终返回一个包含多个 `ref` 的普通的非响应式对象，这样该对象在组件中被解构为 `ref` 之后仍可以保持响应性：

```js
// x 和 y 是两个 ref
const { x, y } = useMouse();
```

从组合式函数返回一个响应式对象会导致在对象解构过程中丢失与组合式函数内状态的响应性连接。与之相反，`ref` 则可以维持这一响应性连接。

如果我们更希望以对象属性的形式来使用组合式函数中返回的状态，我们可以将返回的对象用 `reactive()` 包装一次，这样其中的 `ref` 会被自动解包，例如：

```js
const mouse = reactive(useMouse());
// mouse.x 链接到了原来的 x ref
console.log(mouse.x);
```

### 副作用

在组合式函数中的确可以执行副作用 (例如：添加 `DOM` 事件监听器或者请求数据)，但请注意以下规则：

确保在 `onUnmounted()` 时清理副作用。举例来说，如果一个组合式函数设置了一个事件监听器，它就应该在 `onUnmounted()` 中被移除 (就像我们在 `useMouse()` 示例中看到的一样)。当然也可以像之前的 `useEventListener()` 示例那样，使用一个组合式函数来自动帮我们做这些事。

```js
export default function useXxx {
onMounted(() => {
  const timer = setInterval(() => {
    // 定时任务
  }, 1000)

  onUnmounted(() => clearInterval(timer))
})

}

```

### 使用限制

组合式函数只能在 `<script setup>` 或 `setup()` 钩子中被调用。在这些上下文中，它们也只能被同步调用。在某些情况下，我们也可以在像 `onMounted()` 这样的生命周期钩子中调用它们。

这些限制很重要，因为这些是 `Vue` 用于确定当前活跃的组件实例的上下文。访问活跃的组件实例很有必要，这样才能：

- 将生命周期钩子注册到该组件实例上

- 将计算属性和监听器注册到该组件实例上，以便在该组件被卸载时停止监听，避免内存泄漏。

:::tip

`<script setup>` 是唯一在调用 await 之后仍可调用组合式函数的地方。编译器会在异步操作之后自动为我们恢复当前的组件实例。
:::

### 通过抽取组合式函数改善代码结构

抽取组合式函数不仅是为了复用，也是为了代码组织。随着组件复杂度的增高，我们可能会最终发现组件多得难以查询和理解。组合式 API 会给予我们足够的灵活性，让我们可以基于逻辑问题将组件代码拆分成更小的函数：

```vue
<script setup>
import { useFeatureA } from "./featureA.js";
import { useFeatureB } from "./featureB.js";
import { useFeatureC } from "./featureC.js";

const { foo, bar } = useFeatureA();
const { baz } = useFeatureB(foo);
const { qux } = useFeatureC(baz);
</script>
```

在某种程度上，我们可以将这些提取出的组合式函数看作是可以相互通信的组件范围内的服务。

## 和 React Hooks 的对比

组合式 `API` 提供了和 `React Hooks` 相同级别的逻辑组织能力，但它们之间有着一些重要的区别。

`React Hooks` 在组件每次更新时都会重新调用。这就产生了一些即使是经验丰富的 `React` 开发者也会感到困惑的问题。这也带来了一些性能问题，并且相当影响开发体验。例如：

- `Hooks` 有严格的调用顺序，并不可以写在条件分支中。

- `React` 组件中定义的变量会被一个钩子函数闭包捕获，若开发者传递了错误的依赖数组，它会变得“过期”。这导致了 `React` 开发者非常依赖 `ESLint` 规则以确保传递了正确的依赖，然而，这些规则往往不够智能，保持正确的代价过高，在一些边缘情况时会遇到令人头疼的、不必要的报错信息。

- 昂贵的计算需要使用 `useMemo`，这也需要传入正确的依赖数组。

- 在默认情况下，传递给子组件的事件处理函数会导致子组件进行不必要的更新。子组件默认更新，并需要显式的调用 `useCallback` 作优化。这个优化同样需要正确的依赖数组，并且几乎在任何时候都需要。忽视这一点会导致默认情况下对应用进行过度渲染，并可能在不知不觉中导致性能问题。

- 要解决变量闭包导致的问题，再结合并发功能，使得很难推理出一段钩子代码是什么时候运行的，并且很不好处理需要在多次渲染间保持引用 (通过 `useRef`) 的可变状态。

相比起来，`Vue` 的组合式 `API`：

- 仅调用 `setup()` 或 `<script setup>` 的代码一次。这使得代码更符合日常 `JavaScript` 的直觉，不需要担心闭包变量的问题。组合式 `API` 也并不限制调用顺序，还可以有条件地进行调用。

- `Vue` 的响应性系统运行时会自动收集计算属性和侦听器的依赖，因此无需手动声明依赖。

- 无需手动缓存回调函数来避免不必要的组件更新。`Vue` 细粒度的响应性系统能够确保在绝大部分情况下组件仅执行必要的更新。对 `Vue` 开发者来说几乎不怎么需要对子组件更新进行手动优化。

综合来说，`Vue` 的组合式函数是基于 `Vue` 细粒度的响应性系统，这和 `React hooks` 的执行模型有本质上的不同。

## 相关链接

[我的博客](https://docs.fe-qianxun.com/)<br/>
[Vue 官网-组合式 API 常见问答](https://cn.vuejs.org/guide/extras/composition-api-faq)<br/>
[Vue 3 新特性大解密：Options API vs. Composition API，谁才是实力派？](https://juejin.cn/post/7218837933359857719)<br/>
[Composition API 与 Options API 的区别](https://www.cnblogs.com/linxmouse/p/18671011)<br/>
[浅析 vue2 中 Options API 和 vue3 中 Composition API 的对比](https://blog.51cto.com/u_15049782/4295368)<br/>
[Composition API 簡介](https://book.vue.tw/CH6/6-1-composition-intro.html)
