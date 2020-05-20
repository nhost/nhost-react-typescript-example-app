# Nhost React (Typescript) Example App

[Nhost](https://nhost.io) example app in React (Typescript) using [Hasura](https://hasura.io).

## Get started

1. Create a project on nhost.io
2. Clone this repo
3. Edit config.ts with the details from you project at nhost.io
4. `npm install`
5. `npm start`

> If you have trouble, it might be because you block third party cookies. Either use the same frontend and backend with the same domain, or enable 3rd party cookies in your browser for \*.nhost.app.

## What's in the example app?

### Auth (JWT)

- Register (email/password)
- Register using a OAuth provider (Google, Github etc)
- Login
- Handle refresh token

### Data (GraphQL)

- Create todo
- Read todo
- Update todo
- Delete todo

### Storage (S3)

- Upload file
- Read file
- Delete file
