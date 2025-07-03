import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default [
  // Base TypeScript config for JS/TS files
  ...tseslint.configs.recommended,

  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,

  // React configuration for React components in Astro
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Hooks rules - CRITICAL for catching dependency issues
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Essential React rules for Astro island components
      "react/jsx-uses-react": "off", // Not needed in React 17+ with new JSX transform
      "react/react-in-jsx-scope": "off", // Not needed in React 17+ with new JSX transform
      "react/jsx-uses-vars": "error", // Prevent unused variables in JSX
      "react/prop-types": "off", // Using TypeScript for prop validation
      "react/display-name": "warn", // Helpful for debugging
      "react/no-unescaped-entities": "warn", // Prevent HTML entities issues
      "react/jsx-no-duplicate-props": "error", // Prevent duplicate props
      "react/jsx-no-undef": "error", // Prevent undefined variables in JSX
      "react/no-danger-with-children": "error", // Security rule
      "react/no-deprecated": "warn", // Warn about deprecated React features
      "react/no-find-dom-node": "warn", // Discourage findDOMNode usage
      "react/no-render-return-value": "error", // Prevent using render return value
      "react/no-string-refs": "error", // Discourage string refs
      "react/require-render-return": "error", // Ensure render returns something
      "react/void-dom-elements-no-children": "error", // Prevent children on void elements
      "react/jsx-key": "warn", // Warn about missing keys in lists
      "react/jsx-no-constructed-context-values": "warn", // Performance optimization
      "react/jsx-no-useless-fragment": "warn", // Remove unnecessary fragments
      "react/no-unstable-nested-components": "warn", // Performance optimization
      "react/no-unused-state": "warn", // Prevent unused state
    },
  },

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
