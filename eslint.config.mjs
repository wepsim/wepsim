
import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",

            globals: {
                ...globals.browser,
                ...globals.node
            },

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    globalReturn: true
                }
            }
        },

        rules: {
            eqeqeq: "off",
            "no-console": "off",
            "no-useless-concat": "off",
            "no-useless-assignment": "off",
            "no-unused-vars": "off",
            "block-scoped-var": "off",
            "no-undef": "warn",
            "no-unreachable": "off",
            "no-self-assign": "off",
            "no-global-assign": "off",
            "no-regex-spaces": "off",
            "no-redeclare": "off",
            "no-useless-escape": "off",
            "no-mixed-spaces-and-tabs": "off",
            "no-irregular-whitespace": "off",
            "no-lone-blocks": "off"
        }
    }
];
