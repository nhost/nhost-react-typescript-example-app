module.exports = {
  client: {
    // includes: ["src/**/*.{ts,tsx,js,jsx,graphql,gql}"], // array of glob patterns
    service: {
      name: "GraphQL",
      url: "http://localhost:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "hejsan",
      },
    },
  },
};
