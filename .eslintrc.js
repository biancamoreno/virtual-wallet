module.exports = {
  env: {
    browser: true,
    es6: true,
    serviceworker: true,
    jest: true
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "never"],
    "prettier/prettier": "error",
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
}
