module.exports = () => ({
    graphql: {
        config: {
          endpoint: "/graphql",
          shadowCRUD: true,
          playgroundAlways: true,
          depthLimit: 15,
          amountLimit: 100,
          apolloServer: {
            tracing: false,
          },
        },
      },
});
