import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.REACT_APP_BLOCK_SYNC_GRAPHQL,
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: { noHOC: true, noComponents: true, noNamespaces: true, withHooks: true, withSubscriptionHooks: true },
    },
  },
}
export default config
