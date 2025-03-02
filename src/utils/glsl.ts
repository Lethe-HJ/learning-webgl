/**
 * 处理 GLSL 标签模板字符串的工具函数
 * 用于格式化和清理着色器代码
 * @param strings 字符串数组
 * @param values 插值表达式的值
 * @returns 处理后的着色器代码字符串
 */
export function glsl(strings: TemplateStringsArray, ...values: any[]): string {
  // 将模板字符串和插值组合
  let result = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || '')
  }, '')

  // 清理代码
  result = result
    // 移除开头和结尾的空白
    .trim()
    // 移除多余的空行
    .replace(/\n+/g, '\n')
    // 移除行首的空白
    .replace(/^\s+/gm, '')
  // 移除注释（可选，取决于您的需求）
  // .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

  return result
}
