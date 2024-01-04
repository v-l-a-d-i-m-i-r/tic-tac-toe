module.exports = {
  'extends': [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['node_modules', 'src/public', 'build', '.eslintrc.js'],
  rules: {
    'max-len': ['error', {
      code: 150,
      ignoreStrings: true,
    }],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    'eol-last': ["error", "always"],
    'react/prop-types': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'prefer-object-spread': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'tsx': 'never'
       }
    ],
    'import/prefer-default-export': 0,
    'no-unused-vars': ["error", { "args": "after-used" }],
    '@typescript-eslint/lines-between-class-members': 0,
  },
}
