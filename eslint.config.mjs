import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
// import { fixupConfigRules } from "@eslint/compat";
import pluginJest from "eslint-plugin-jest"

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      jest: fixupPluginRules(pluginJest),
    },
  },
  ...[
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
  ].map((conf) => ({
    ...conf,
    files: ["**/*.ts"],
    ignores: [
      ".dockerignore",
      ".gitignore",
      ".npmignore",
      ".prettierignore",
      ".eslintignore",
    ],
    env: {
      jest: true,
    },
  })),
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  {
    env: {
      jest: true,
    },
  },
]
