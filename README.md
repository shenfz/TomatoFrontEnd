# Tomato FrontEnd

## Directory
- [api](./src/api)    接口
- [assets](./src/assets) 静态资源
- [components](./src/components) 全局组件,每个子组件都有对应的目录结构，方便统一元数据全局导入和使用
- [bmod](./src/bmod) 存放基础业务模块
- [config](./src/config) 全局配置文件
- [controller](./src/controller) 全局控制器
- [localer](./src/locales) 拓展模块 语言包文件
- [router](./src/router) 路由
- [store](./src/store) 全局状态管理
- [utils](./src/utils) 全局公共方法
- [views](./src/views) 组件
- [types](./src/types) 放置声明文件 (.d.ts)
- [App.vue](./src/App.vue) 入口页面

## vite config plugins
- vant  ui  自定义导入插件
>yarn add unplugin-vue-compents -D
-  autoImport 开发阶段，自动帮你从创建声明文件，不需要每次导入vue API
> yarn install -d unplugin-auto-import


 