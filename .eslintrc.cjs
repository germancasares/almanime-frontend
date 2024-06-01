module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'eslint:recommended', 
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended',
      "plugin:jsx-a11y/recommended",
      "prettier",
    ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "jsx-a11y"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
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
