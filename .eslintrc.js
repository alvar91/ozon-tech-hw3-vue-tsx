module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@vue/typescript", "plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    "vue/multi-word-component-names": 0,
    "no-unused-vars": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
