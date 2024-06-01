module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'eslint:recommended', 
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended',
      "prettier",
    ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "simple-import-sort"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          // Packages `react` related packages come first.
          [
            "^react",
            "^@?\\w"
          ],
          // app or api packages.
          [
            "^(api|app|enums|types)(/.*|$)"
          ],
          // Parent imports. Put `..` last.
          [
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$"
          ],
          // Other relative imports. Put same-folder imports and `.` last.
          [
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$"
          ],
          // Internal packages.
          [
            "^(components)(/.*|$)"
          ],
          // Internal packages.
          [
            "^(./_components)(/.*|$)"
          ],
          // Style imports.
          [
            "^.+\\.?(css)$"
          ]
        ]
      }
    ],
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
  },
  "overrides": [
    {
      "files": [
        "**/*.stories.tsx"
      ],
      "rules": {
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-props-no-spreading": "off"
      }
    }
  ]
}
