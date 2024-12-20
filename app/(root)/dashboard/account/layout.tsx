import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import AccountManagement from "./page";
import ClientSideStorage from "@/components/component/ClientSideStorage";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Serialize the user object manually
  const formattedUser = {
    id: user.id,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress ?? "",
    })),
    imageUrl: user.imageUrl ?? "",
    externalAccounts: user.externalAccounts?.map((account) => ({
      verification: account?.verification ?? null,
    })),
    passwordEnabled: user.passwordEnabled ?? false,
  };

  const userImage = formattedUser?.imageUrl;
  const userName = formattedUser?.firstName + " " + formattedUser?.lastName;
  const userEmail = formattedUser?.emailAddresses[0].emailAddress;
  const isGoogleAuth = formattedUser?.externalAccounts?.some(
    (identity) =>
      identity?.verification !== null &&
      identity?.verification?.strategy === "oauth_google"
  );
  // This ensures that we only send plain objects with serializable data
  return (
    <main>
      {children}
      <ClientSideStorage
        fullName={userName}
        userImage={userImage}
        userEmail={userEmail}
        isGoogleAuth={isGoogleAuth}
      />
    </main>
  );
}
