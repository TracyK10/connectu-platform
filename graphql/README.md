# GraphQL Setup (Apollo + Codegen)

- Endpoint: set `NEXT_PUBLIC_GRAPHQL_URL` (client) and `SCHEMA_URL` (codegen) in your env.
- Client: configured at `graphql/client.ts`.
- Documents: create queries/mutations in `graphql/queries/*.graphql` (any path under `graphql/**/*.graphql`).
- Generated output: `graphql/generated/` (types + React Apollo hooks).

Generate types/hooks

```bash
# install dev deps (once)
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo graphql

# run codegen (schema URL from codegen.ts or SCHEMA_URL env)
npx graphql-codegen --config codegen.ts
```

Notes
- Add auth: issue a token and store in `localStorage` under `connectu_auth_token`. The `Authorization` header is attached in `graphql/client.ts`.
- Server: add your GraphQL handler at `pages/api/graphql.ts` (Next.js API route) or point `SCHEMA_URL` to a remote schema.
- Examples: place `.graphql` files in `graphql/queries/` and import generated hooks from `graphql/generated/`.
