// oxlint-disable import/no-nodejs-modules ,,,
import path from 'node:path'

import { devToolsPlugin } from '@bakdotdev/dev-tools/vite-plugin'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, loadEnv } from 'vite-plus'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    staged: { '*': 'vp check --fix' },
    run: {
      cache: {
        tasks: true,
        scripts: true,
      },
    },
    fmt: {
      ignorePatterns: [],
      printWidth: 80,
      semi: false,
      singleQuote: true,
      sortImports: true,
      trailingComma: 'es5',
      insertFinalNewline: false,
    },
    lint: {
      categories: {
        correctness: 'error',
        nursery: 'warn',
        pedantic: 'warn',
        perf: 'warn',
        restriction: 'error',
        style: 'warn',
        suspicious: 'error',
      },
      env: {
        builtin: true,
      },
      ignorePatterns: [
        'dist',
        'node_modules',
        'src-tauri',
        'src/components/react-bits/**',
        '**/*.js',
        '**/*.mjs',
      ],
      jsPlugins: [
        {
          name: 'vite-plus',
          specifier: 'vite-plus/oxlint-plugin',
        },
      ],
      options: {
        reportUnusedDisableDirectives: 'error',
        typeAware: true,
        typeCheck: true,
      },
      overrides: [
        {
          files: ['src/utils/logger.ts'],
          rules: {
            'eslint/no-console': 'off',
          },
        },
        {
          files: ['src/vite-env.d.ts', 'pwa-assets.config.ts'],
          rules: {
            'import/unambiguous': 'off',
            'unicorn/filename-case': 'off',
          },
        },
        {
          files: ['vite.config.ts'],
          env: {
            node: true,
          },
        },
        {
          files: ['**/*.{ts,tsx}'],
          env: {
            browser: true,
          },
        },
      ],
      plugins: [
        'react',
        'react-perf',
        'import',
        'promise',
        'node',
        'eslint',
        'typescript',
        'unicorn',
        'oxc',
      ],
      rules: {
        'eslint/max-lines-per-function': ['warn', { max: 500 }],
        'import/max-dependencies': ['warn', { max: 30 }],
        'max-statements': ['warn', { max: 30 }],
        'react/jsx-max-depth': ['error', { max: 12 }],
        'capitalized-comments': 'off',
        'eslint/id-length': 'off',
        'eslint/no-ternary': 'off',
        'eslint/no-void': 'off',
        'eslint/sort-imports': 'off',
        'eslint/sort-keys': 'off',
        'import/consistent-type-specifier-style': [
          'error',
          'prefer-top-level-if-only-type-imports',
        ],
        'import/group-exports': 'off',
        'import/no-default-export': 'off',
        'import/no-named-export': 'off',
        'one-var': 'off',
        'oxc/no-async-await': 'off',
        'oxc/no-optional-chaining': 'off',
        'oxc/no-rest-spread-properties': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['jsx', 'tsx'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'typescript/explicit-function-return-type': 'off',
        'typescript/explicit-module-boundary-types': 'off',
        'typescript/prefer-readonly-parameter-types': 'off',
        'typescript/promise-function-async': 'off',
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
            },
          },
        ],
        'vite-plus/prefer-vite-plus-imports': 'error',
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-jsx-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'unicorn/no-null': 'off',
        'eslint/no-undefined': 'off',
        'eslint/no-nested-ternary': 'off',
        'react/todo': 'off',
        'unicorn/explicit-length-check': 'off',
        'no-magic-numbers': 'off',
        'import/prefer-default-export': 'off',
        'eslint/init-declarations': 'off',
        'typescript/strict-boolean-expressions': 'off',
        'eslint/new-cap': 'off',
        'eslint/no-console': 'warn',
        'import/no-named-as-default-member': 'off',
        'unicorn/no-nested-ternary': 'off',
        'typescript/no-confusing-void-expression': 'off',
        'typescript/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        'typescript/strict-void-return': 'off',
        'react/jsx-no-literals': ['error', { allowedStrings: ['+', '-', ':'] }],
        'unicorn/prefer-ternary': 'off',
        'unicorn/prefer-export-from': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'eslint/no-continue': 'off',
        'eslint/max-params': 'off',
        'react/forbid-component-props': 'off',
        'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],
      },
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                test: /[\\/]node_modules[\\/](?:react|react-dom|react-router-dom)[\\/]/u,
              },
              {
                name: 'mui-icons',
                test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/u,
              },
              {
                name: 'mui',
                test: /[\\/]node_modules[\\/](?:@mui|@emotion|@fontsource)[\\/]/u,
              },
              {
                name: 'charts',
                test: /[\\/]node_modules[\\/](?:recharts)[\\/]/u,
              },
              {
                name: 'i18n',
                test: /[\\/]node_modules[\\/](?:i18next|react-i18next|i18next-)[\\/]/u,
              },
              {
                name: 'realtime',
                test: /[\\/]node_modules[\\/](?:socket\.io-client)[\\/]/u,
              },
              {
                name: 'maps',
                test: /[\\/]node_modules[\\/](?:leaflet|react-leaflet|@react-leaflet)[\\/]/u,
              },
              {
                name: 'ui_utils',
                test: /[\\/]node_modules[\\/](?:react-markdown|react-syntax-highlighter|mui-image|mui-one-time-password-input)[\\/]/u,
              },
              {
                name: 'utils',
                test: /[\\/]node_modules[\\/](?:axios|date-fns|html5-qrcode|qrcode\.react)[\\/]/u,
              },
              {
                name: 'landing-3d',
                test: /[\\/]node_modules[\\/](?:three|@react-three|@dimforge|meshline|maath|detect-gpu|suspend-react|its-fine)[\\/]/u,
              },
              {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/u,
              },
            ],
          },
        },
      },
    },
    plugins: [
      tailwindcss(),
      devToolsPlugin(),
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      VitePWA({
        manifest: {
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          name: env.VITE_APP_NAME,
          short_name: env.VITE_APP_NAME,
          start_url: '/menu',
          theme_color: '#3f35fd',
        },
        registerType: 'autoUpdate',
        strategies: 'generateSW',
        devOptions: {
          enabled: true,
        },
      }),
      visualizer({
        filename: '.ignore/bundle-report.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 3000,
      strictPort: true,
    },
    assetsInclude: ['**/*.glb'],
  }
})