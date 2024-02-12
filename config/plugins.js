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
  io: {
    enabled: true,
    config: {
      socket: {
        serverOptions: {
          cors: { origin: "http://localhost:8081", methods: ["GET", "POST"] },
        },
      },
      contentTypes: ["api::notification.notification"],
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
          },
        },
      ],
    },
  },
});
