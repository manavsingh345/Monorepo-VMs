import { prismaClient } from "@repo/db/client";

export async function GET() {
  const users = await prismaClient.user.findMany();
  return Response.json(users);
}