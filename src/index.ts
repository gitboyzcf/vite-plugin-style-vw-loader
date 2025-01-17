interface IdefaultsProp {
  unitToConvert: string;
  viewportWidth: number;
  unitPrecision: number;
  viewportUnit: string;
  fontViewportUnit: string;
  minPixelValue: number;
}

// 默认参数
const defaultsProp: IdefaultsProp = {
  unitToConvert: "px", // 需要转换的单位，默认为"px"
  viewportWidth: 750, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
  unitPrecision: 5, // 单位转换后保留的精度
  viewportUnit: "vw", // 希望使用的视口单位
  fontViewportUnit: "vw", // 字体使用的视口单位
  minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
};
function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(
  viewportSize: number,
  minPixelValue: number,
  unitPrecision: number,
  viewportUnit: any
) {
  return function ($0: any, $1: any) {
    if (!$1) return;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return;
    return toFixed((pixels / viewportSize) * 100, unitPrecision) + viewportUnit;
  };
}

// 匹配 template 标签的内容
const templateReg = /<template>([\s\S]+)<\/template>/gi;
// 匹配 style 属性内的内容
const styleRegex = /style="([^"]*)"/gi;
// 在 style 属性的内容中匹配 px 值
const pxRegex = /(\d+(\.\d+)?)px/gi;

function vitePluginStyleVWLoader(customOptions: IdefaultsProp = defaultsProp) {
  return {
    // 插件名称
    name: "vite-plugin-style-vw-loader",
    // 构建阶段的通用钩子：在每个传入模块请求时被调用：在每个传入模块请求时被调用，主要是用来转换单个模块
    transform(code: any, id: any) {
      customOptions = Object.assign(defaultsProp, customOptions);
      if (/.vue$/.test(id)) {
        let _source = "";
        if (templateReg.test(code)) {
          _source = code.match(templateReg)[0];
        }
        const convertedTemplate: string = _source.replace(
          styleRegex,
          (styleMatch, styleContent) => {
            const $_source: string = styleContent.replace(
              pxRegex,
              createPxReplace(
                customOptions.viewportWidth,
                customOptions.minPixelValue,
                customOptions.unitPrecision,
                customOptions.viewportUnit
              )
            );
            return `style="${$_source}"`; // 返回更新后的 style 属性
          }
        );
        code = code.replace(_source, convertedTemplate);
      }
      return { code };
    },
  };
}
export default vitePluginStyleVWLoader;
