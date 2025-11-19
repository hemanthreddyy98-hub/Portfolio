module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    serviceworker: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:html/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'html',
    'prettier'
  ],
  rules: {
    // Modern JavaScript features
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'arrow-spacing': 'error',
    'prefer-arrow-callback': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'object-property-newline': 'error',
    'prefer-destructuring': ['error', {
      array: true,
      object: true
    }],
    
    // Performance and best practices
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    
    // Code quality
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 50],
    'max-params': ['warn', 4],
    'max-statements': ['warn', 20],
    
    // Modern ES2022+ features
    'prefer-object-has-own': 'error',
    'no-constant-condition': ['error', {
      checkLoops: false
    }],
    
    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    
    // Security
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Prettier integration
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: ['*.html'],
      parser: 'html-eslint-parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      rules: {
        'html/indent': ['error', 2],
        'html/require-closing-tags': 'error',
        'html/require-meta-charset': 'error',
        'html/require-meta-viewport': 'error',
        'html/require-button-type': 'error',
        'html/require-form-enc-type': 'error',
        'html/require-input-attributes': 'error',
        'html/require-meta-description': 'error',
        'html/require-meta-keywords': 'error',
        'html/require-meta-viewport': 'error',
        'html/require-sri': 'error',
        'html/require-title': 'error'
      }
    },
    {
      files: ['*.css', '*.scss'],
      extends: [
        'stylelint-config-standard'
      ],
      rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'selector-class-pattern': null,
        'keyframes-name-pattern': null
      }
    },
    {
      files: ['sw.js'],
      env: {
        serviceworker: true
      },
      rules: {
        'no-restricted-globals': ['error', 'event', 'fdescribe']
      }
    }
  ],
  settings: {
    html: {
      indent: 2
    }
  },
  ignorePatterns: [
    'dist/',
    'build/',
    'node_modules/',
    '*.min.js',
    '*.bundle.js'
  ]
};
