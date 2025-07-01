import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import tseslint from "typescript-eslint"

export default [
  // Base TypeScript config for JS/TS files
  ...tseslint.configs.recommended,

  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,

  // Prettier config - disables conflicting rules (must be last)
  eslintConfigPrettier,

  {
    languageOptions: {
      globals: {
        console: true,
        process: true,
      },
    },
    rules: {
      // Custom overrides
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Specific configuration for Astro files
  {
    files: ["*.astro"],
    languageOptions: {
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // Astro-specific rules
      "astro/no-set-html-directive": "error",
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/", "node_modules/", ".astro/", "public/"],
  },
]
