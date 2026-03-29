export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  const users = await res.json();

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
}