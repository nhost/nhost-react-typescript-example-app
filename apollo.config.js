module.exports = {
  client: {
    service: {
      name: "GraphQL",
      url: "http://localhost:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "hejsan",
      },
    },
  },
};
