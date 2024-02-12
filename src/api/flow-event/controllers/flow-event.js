const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async getEventsByUserId(ctx) {
    const currentUser = await strapi
      .service("plugin::users-permissions.user")
      .fetch(ctx.request.body.userId, {
        filters: { id: { $eq: 1 } },
        sort: { createdAt: "DESC" },
        populate: {
          events: true,
          owner_events: true,
          event_requests: true,
          users_follow: {
            populate: {
              owner_events: true,
            },
          },
        },
      });

    const friendsEvents = currentUser?.users_follow.flatMap(
      (f) => f.owner_events
    );
    const friendsAttendeesEvents = currentUser?.users_follow.flatMap(
      (f) => f.events
    );
    const events = [
      ...currentUser?.events,
      ...currentUser.owner_events,
      ...friendsEvents,
      ...friendsAttendeesEvents,
    ];

    const shortedEvents = events
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      })
      .filter((e) => e);

    return shortedEvents.filter(
      (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
    );
  },
}));
