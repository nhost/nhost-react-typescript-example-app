# Nhost React Typescript Example App

[Nhost](https://nhost.io) example app in React (Typescript) using [Hasura](https://hasura.io).

---

Technologies

- ✨[Nhost](https://nhost.io)
- ⚡ [React](https://reactjs.org)
- 💡[TypeScript](https://www.typescriptlang.org)
- 💅[Tailwind](https://tailwindcss.com/)

---

## Get started

1. Create a project on [Nhost](https://nhost.io/register).
2. Clone this repo: `git clone git@github.com:nhost/nhost-react-typescript-example-app.git`.
3. Copy `config-example.yaml` to `config.yaml` in `hasura/`.
4. In `hasura/config.yaml`, update `endpoint` and `admin_secret` from your Nhost project.
5. Apply migrations and metadata in the `hasura/`-folder: `hasura migrate apply; hasura metadata apply;`. Make sure you have the [Hasura CLI installed](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html).
6. In `src/utils`, copy `config-example.ts` to `config.ts`.
7. Update `config.ts` with `BACKEND_ENDPOINT` and `GRAPHQL_ENDPOINT` from your project at Nhost.
8. `yarn install`.
9. `yarn start`.

---

## What's in the example app?

### Auth (JWT)

- Register (email/password)
- Register using a OAuth provider (Google, Github etc)
- Login
- Handle refresh token (automatically)

### Data (GraphQL)

- Create todo
- Read todo
- Update todo
- Delete todo

### Storage (S3)

- Upload file
- Read file
- Delete file

### Apollo GrahpQL Codegen and Autocomplete

Edit `apollo.config.js` and `package.json` (`apollo:generate`). The only thing you need to edit is `endpoint` and `header` (`x-hasura-admin-secret`).

Once the two files are correctly configured you can auto generate type definitions from GraphQL using:

`yarn apollo:codegen`

All type definitions will be placed in `src/generated/`.
