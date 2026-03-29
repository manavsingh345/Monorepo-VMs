import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/users", async (_req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch users";
    res.status(500).json({ error: message });
  }
});

app.post("/user", async (req, res) => {
  const { name, email } = req.body as {
    name?: string;
    email?: string;
  };

  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create user";
    res.status(500).json({ error: message });
  }
});

app.listen(8080);
