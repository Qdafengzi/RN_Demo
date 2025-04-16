module.exports = {
  // 箭头函数参数括号 'avoid' 能省略括号的时候就省略 | 'always' 总是有括号
  arrowParens: 'avoid',

  // 大括号内的首尾需要空格 true: { foo: bar } | false: {foo: bar}
  bracketSpacing: true,

  // 多属性html标签的'>'折行放置 true: 折行 | false: 不折行
  bracketSameLine: false,

  // 行尾逗号 'none' | 'es5' | 'all'
  trailingComma: 'es5',

  // 使用单引号 true: '' | false: ""
  singleQuote: true,

  // 缩进空格数
  tabWidth: 4,

  // 使用tab缩进，false时使用空格
  useTabs: false,

  // 分号结尾 true: 有 | false: 无
  semi: true,

  // 对象属性引号 'as-needed' 需要时使用 | 'consistent' 保持一致 | 'preserve' 保留用户输入
  quoteProps: 'as-needed',

  // 最大行长度
  printWidth: 100,

  // 在jsx中使用单引号而不是双引号
  jsxSingleQuote: false,

  // jsx标签的反尖括号需要换行
  jsxBracketSameLine: false,

  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,

  // 换行符使用 lf 结尾是 可选值 'auto' | 'lf' | 'crlf' | 'cr'
  endOfLine: 'lf',

  // 是否对嵌入式语言代码进行格式化
  embeddedLanguageFormatting: 'auto',

  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,

  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,

  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,

  // 使用默认的折行标准
  proseWrap: 'preserve',

  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css'
};
