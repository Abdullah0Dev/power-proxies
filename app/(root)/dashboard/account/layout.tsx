import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AccountManagement from "./page";
export default async function Layout() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const data = JSON.parse(JSON.stringify(user));

  return (
    <main>
      <AccountManagement user={data} />
    </main>
  );
}
