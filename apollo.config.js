module.exports = {
  client: {
    service: {
      name: "GraphQL",
      url: "https://hasura-[id].nhost.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "my-admin-secret-from-nhost",
      },
    },
  },
};
