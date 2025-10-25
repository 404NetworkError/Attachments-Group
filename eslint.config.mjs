import { defineConfig } from "eslint/config";
import jsdoc from "eslint-plugin-jsdoc";
import preferArrow from "eslint-plugin-prefer-arrow";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ),

    plugins: {
        jsdoc,
        "prefer-arrow": preferArrow,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": "off",

        "@typescript-eslint/no-restricted-types": ["error", {
            types: {
                Object: {
                    message: "Avoid using the `Object` type. Did you mean `object`?",
                },

                Function: {
                    message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
                },

                Boolean: {
                    message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
                },

                Number: {
                    message: "Avoid using the `Number` type. Did you mean `number`?",
                },

                String: {
                    message: "Avoid using the `String` type. Did you mean `string`?",
                },

                Symbol: {
                    message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
                },
            },
        }],

        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",

        "@typescript-eslint/naming-convention": ["error", {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        }],

        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",

        "@typescript-eslint/no-shadow": ["error", {
            hoist: "all",
        }],

        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",

        "@typescript-eslint/triple-slash-reference": ["error", {
            path: "always",
            types: "prefer-import",
            lib: "always",
        }],

        "@typescript-eslint/typedef": "off",
        "@typescript-eslint/unified-signatures": "error",
        complexity: "off",
        "constructor-super": "error",
        "dot-notation": "off",
        eqeqeq: ["error", "smart"],
        "guard-for-in": "off",

        "id-denylist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined",
        ],

        "id-match": "error",
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",

        "jsdoc/tag-lines": ["error", "any", {
            startLines: 1,
        }],

        "max-classes-per-file": "off",
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "off",
        "no-debugger": "error",
        "no-empty": "error",
        "no-empty-function": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-new-wrappers": "error",
        "no-shadow": "off",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "off",
        "no-unused-labels": "error",
        "no-use-before-define": "off",
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],

        "prefer-arrow/prefer-arrow-functions": ["error", {
            allowStandaloneDeclarations: true,
        }],

        "prefer-const": "error",
        radix: "error",

        "spaced-comment": ["error", "always", {
            markers: ["/"],
        }],

        "use-isnan": "error",
        "valid-typeof": "off",
    },
}]);