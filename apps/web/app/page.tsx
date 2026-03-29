import { prismaClient } from "@repo/db/client";
export const revalidate = 5;

export default async function Home() {
  const users = await prismaClient.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}
