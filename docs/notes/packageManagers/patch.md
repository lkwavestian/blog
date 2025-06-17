# 修改 node_modules 中的依赖（打补丁）

## 引言

当开发时，有时会遇到这样一种情况：依赖的库有 `bug` 或者不满足要求，这时就需要对 `node_modules` 中的依赖进行修改。

## 常见做法

对依赖进行更改通常又下面几种做法：

1. 提 `issue` 等待作者修复。或者 `fork` 源码，修复 `bug` 然后提交 `pr`，等待作者合并

   - 等待周期长，有的库甚至作者已经放弃维护

2. `fork` 该库的代码到自己仓库，修改后，从自己仓库安装这个插件

   - 增加维护成本，需要和原仓库保持同步，否则会丢失更新
   - 后期可能会和原仓库出现难以合并的分歧
   - 需要注意合法性问题，可能需要原作者授权

3. 直接修改 `node_modules` 中的依赖

   - 适合应急，周期短
   - 修改只在本地生效

4. 对 `node_modules` 中的依赖打补丁

   - 适合应急，周期短
   - 提交补丁文件后修改可在本地和远程生效

综合来看这几种方法，首先我们的开发时间紧张，不可能去一直等待作者的修复或者合并，`fork` 该库代码到自己仓库又会增加我们的维护成本，直接修改 `node_modules`包只在本地生效，对多人协作有影响。所以对 `node_modules` 中的依赖打补丁应该是最适合的解决方式。

## 打补丁是什么

打补丁是一种在不修改原始文件的情况下对文件进行增量修改的技术，它可以用来修复 `bug`、添加功能、或者依赖内部的某些逻辑。

打补丁的原理是使用 `diff` 工具来比较两个文件（或目录）之间的差异，并生成一个补丁文件`（patch file）`，这个补丁文件记录了如何从一个文件（或目录）变成另一个文件（或目录）所需要做的修改，然后使用 `patch` 工具来将补丁文件应用到原始文件（或目录）上，从而实现修改。

打补丁有以下优点：

- 补丁文件通常很小，可以节省磁盘空间和网络带宽
- 补丁文件可以被提交到版本控制系统中，方便追踪和管理
- 补丁文件可以在不同的平台和环境中使用，提高兼容性和可移植性
- 补丁文件可以在安装或更新依赖包后自动应用，减少手动操作

## 如何打补丁

不同的包管理器，打补丁的方法也不同，但其原理都是一样的

- 在项目目录下生成一个 `patches` 文件夹，里面存放着所有的补丁文件（其补丁内容为 `diff` 格式）
- 在 `npm install` 后自动应用补丁

### 使用 `pnpm`或 `yarn v2+`

`pnpm` 和 `yarn v2+` 都提供了 `patch` 命令，可以直接使用

**以 `pnpm` 为例**

假设我们接下来要对 `vitePress` 这个包进行打补丁操作，先执行 `pnpm patch` 命令

```sh
pnpm patch <pkg name>@<version>

# 🌰
$ pnpm patch vitepress@1.6.3

# 执行结果
You can now edit the following folder: C:\Users\ADMINI~1\AppData\Local\Temp\6a81218255b3018ed09bed2c60e32659

Once you're done with your changes, run "pnpm patch-commit C:\Users\ADMINI~1\AppData\Local\Temp\6a81218255b3018ed09bed2c60e32659"
```

该命令会将指定的软件包提取到一个可以随意编辑的临时目录中供我们修改，我们打开给定的文件夹`C:\Users\ADMINI~1\AppData\Local\Temp\6a81218255b3018ed09bed2c60e32659`进行更改

更改完之后运行 `pnpm patch-commit` 命令，并且传入临时目录的路径

```sh
# <path> 是之前提取的临时目录
pnpm patch-commit <path>

# 注意：如果使用 windows 系统并且使用 git bash 的话，请将路径中的 \ 替换为 \\
pnpm patch-commit C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\6a81218255b3018ed09bed2c60e32659
```

该命令会生成相应的补丁文件到项目中（默认保存在项目根目录下的 `patches` 目录中）

![pnpm-patch](/public/notes/pnpm-patch-result.png)

并且 `package.json` 也会有相应内容

```json
{
  "pnpm": {
    "patchedDependencies": {
      "vitepress@1.6.3": "patches/vitepress@1.6.3.patch" // [!code ++]
    }
  }
}
```

这样后续只要我们运行 `pnpm install` 等安装命令时，补丁文件就会自动应用到项目中

### 使用 `npm` 或 `yarn v1` 时

使用 `npm` 或 `yarn v1` 管理依赖时，需要借助第三方工具 `patch-package` 来实现对 `node_modules` 中的依赖打补丁

**以 `npm` 为例**

```sh
# 1. 安装 patch-package
npm i -D patch-package

# 2. 添加 postinstall 脚本，以便在每次 npm install 后自动应用补丁
npm pkg set scripts.postinstall="patch-package"

# 3. 修改 node_modules 指定依赖包

# 4. 生成补丁 <pkg name> 是上一步修改的依赖包名称
npx patch-package <pkg name>
```
