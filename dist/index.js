"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var defaultsProp = {
  unitToConvert: "px",
  // 需要转换的单位，默认为"px"
  viewportWidth: 750,
  // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
  unitPrecision: 5,
  // 单位转换后保留的精度
  viewportUnit: "vw",
  // 希望使用的视口单位
  fontViewportUnit: "vw",
  // 字体使用的视口单位
  minPixelValue: 1
  // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
};
function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}
function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function($0, $1) {
    if (!$1)
      return;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue)
      return;
    return toFixed(pixels / viewportSize * 100, unitPrecision) + viewportUnit;
  };
}
var templateReg = /<template>([\s\S]+)<\/template>/gi;
var pxGlobalReg = /(\d+)px/gi;
function vitePluginStyleVWLoader(customOptions = defaultsProp) {
  return {
    // 插件名称
    name: "vite-plugin-style-vw-loader",
    // 构建阶段的通用钩子：在每个传入模块请求时被调用：在每个传入模块请求时被调用，主要是用来转换单个模块
    transform(code, id) {
      customOptions = Object.assign(defaultsProp, customOptions);
      if (/.vue$/.test(id)) {
        let _source = "";
        if (templateReg.test(code)) {
          _source = code.match(templateReg)[0];
        }
        if (pxGlobalReg.test(_source)) {
          const $_source = _source.replace(
            pxGlobalReg,
            createPxReplace(
              customOptions.viewportWidth,
              customOptions.minPixelValue,
              customOptions.unitPrecision,
              customOptions.viewportUnit
            )
          );
          code = code.replace(_source, $_source);
        }
      }
      return { code };
    }
  };
}
var src_default = vitePluginStyleVWLoader;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
