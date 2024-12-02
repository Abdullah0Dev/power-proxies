import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AccountManagement from "./page";

export default async function Layout() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Serialize the user object manually
  const formattedUser = {
    id: user.id,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress ?? ''
    })),
    imageUrl: user.imageUrl ?? '',
    externalAccounts: user.externalAccounts?.map((account) => ({
      verification: account?.verification ?? null,
    })),
    passwordEnabled: user.passwordEnabled ?? false,
  };

  // This ensures that we only send plain objects with serializable data
  return (
    <main>
      <AccountManagement user={formattedUser} />
    </main>
  );
}
