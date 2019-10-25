module.exports = {
  // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
  env: {
    browser: true,
    es6: true
  },
  // 一个配置文件可以被基础配置中的已启用的规则继承。
  extends: ["airbnb", "plugin:jest/recommended", "plugin:prettier/recommended"],
  // 自定义全局变量
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    _: true,
    $: true,
    cy: true
  },
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
  plugins: ["react", "react-hooks"],
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    "no-unused-vars": [
      1,
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_|^err|^ev" // _xxx, err, error, ev, event
      }
    ],
    "no-useless-escape": 2,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [2, {
      "ignore": [
        "^containers"
      ]
    }],
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "global-require": 0
  }
};
