import { prismaClient } from "@repo/db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      try {
        const id = crypto.randomUUID();

        await prismaClient.user.create({
          data: {
            name: `user-${id}`,
            email: `${id}@example.com`,
          },
        });

        ws.send(
          typeof message === "string" ? message : "saved"
        );
      } catch (error) {
        ws.send(
          error instanceof Error ? `error: ${error.message}` : "error: db write failed"
        );
      }
    },
  },
});
