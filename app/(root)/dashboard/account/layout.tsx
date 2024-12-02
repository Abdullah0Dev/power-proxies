import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AccountManagement from "./page";

export default async function Layout() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  // Flatten the `user` object to remove non-serializable data
  const formattedUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress,
    })),
    imageUrl: user.imageUrl,
    externalAccounts: user.externalAccounts?.map((account) => ({
      verification: account.verification,
    })),
    passwordEnabled: user.passwordEnabled,
  };

  return (
    <main>
      <AccountManagement user={formattedUser} />
    </main>
  );
}
