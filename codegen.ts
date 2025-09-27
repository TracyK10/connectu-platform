// GraphQL Codegen instructions
// 1) Copy this file to codegen.local.ts (or rename temporarily during generation)
// 2) Install dev deps: @graphql-codegen/cli and plugins, plus graphql
// 3) Place your operations under the graphql directory (e.g., graphql/queries/*.graphql)
// 4) Run: npx graphql-codegen --config codegen.local.ts
//
// Example config (for reference only, DO NOT uncomment here to avoid build-time deps):
// import type { CodegenConfig } from '@graphql-codegen/cli';
// const config: CodegenConfig = {
//   overwrite: true,
//   schema: process.env.SCHEMA_URL || 'https://your-backend.example.com/graphql',
//   documents: 'graphql/**/*.graphql',
//   generates: {
//     'graphql/generated/': {
//       preset: 'client',
//       plugins: ['typescript','typescript-operations','typescript-react-apollo'],
//       presetConfig: { fragmentMasking: false },
//       config: {
//         skipTypename: false,
//         enumsAsTypes: true,
//         scalars: { DateTime: 'string', JSON: 'Record<string, unknown>' },
//       },
//     },
//   },
// };
// export default config;

export {};
