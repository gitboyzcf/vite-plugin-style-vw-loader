# vite-plugin-style-vw-loader

一个可以将 Vue3 标签内样式 px 转换 vw 的 Loader

> [English](https://github.com/gitboyzcf/vite-plugin-style-vw-loader#readme) | 中文

## 安装

```
npm install vite-plugin-style-vw-loader -D

or
pnpm install vite-plugin-style-vw-loader -D

or
yarn add vite-plugin-style-vw-loader -D
```

## 使用

vite.config.js

```javascript
import vitePluginStyleVwLoader from "vite-plugin-style-vw-loader";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  plugins: [vitePluginStyleVwLoader(), vue()],
  //   plugins: [
  //     vitePluginStyleVwLoader({
  //       unitToConvert: "px",
  //       viewportWidth: 750,
  //       unitPrecision: 5,
  //       viewportUnit: "vw",
  //       fontViewportUnit: "vw",
  //       minPixelValue: 1,
  //     })
  //   ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

## 示例

### 输入

```html
<h3 style="font-size: 28px;margin-top: 10px" width="500px">Test</h3>
```

### 输出

```html
<h3 width="66.66667vw" style="font-size: 3.73333vw; margin-top: 1.33333vw;">
  Test
</h3>
```

## 配置参数

**默认配置：**

```javascript
{
    unitToConvert: "px", // 需要转换的单位，默认为"px"
    viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
    unitPrecision: 5, // 单位转换后保留的精度
    viewportUnit: "vw", // 希望使用的视口单位
    fontViewportUnit: "vw", // 字体使用的视口单位
    minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
}
```

## 参与

只支持 Vue3 模板的转换，React 模板未提供支持。如果你也有转换 style 的需求、欢迎参与完善该项目。
