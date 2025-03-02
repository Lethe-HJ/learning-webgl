# learning-webgl
学习webgl


## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）。

## TypeScript 中 `.vue` 导入的类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` CLI 进行类型检查。在编辑器中，我们需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 来使 TypeScript 语言服务能够识别 `.vue` 类型。

## 自定义配置

查看 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

安装 nvm
```zsh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

```sh
nvm install 22.14.0
nvm use 22.14.0
npm install -g yarn
yarn
```

### 开发环境的编译和热重载

```sh
yarn dev
```

### 生产环境的类型检查、编译和压缩

```sh
yarn build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
yarn test:unit
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
yarn lint
```
