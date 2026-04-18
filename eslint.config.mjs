import neostandard from 'neostandard'
import reactPlugin from 'eslint-plugin-react'
import markdownPlugin from '@eslint/markdown'

export default [
  ...neostandard({
    ignores: ['public/**', '.cache/**', 'node_modules/**']
  }),
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      markdown: markdownPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      globals: {
        __PATH_PREFIX__: 'readonly',
        Atomics: 'readonly',
        Sentry: 'readonly',
        SharedArrayBuffer: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/prop-types': 0,
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/jsx-pascal-case': 0,
      'react/jsx-handler-names': 0
    }
  }
]
