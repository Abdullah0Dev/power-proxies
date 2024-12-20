import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ClientSideStorage from "@/components/component/ClientSideStorage";
import { useEmailLink } from "@clerk/nextjs";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Serialize the user object manually
  const formattedUser = {
    id: user.id,
    emailAddresses: user.emailAddresses.map((email) => ({
      emailAddress: email.emailAddress ?? "",
    })),
  };

  const userEmail = formattedUser?.emailAddresses[0].emailAddress;
console.log(useEmailLink);

  // This ensures that we only send plain objects with serializable data
  return (
    <main>
      {children}
      <ClientSideStorage userEmail={userEmail} />
    </main>
  );
}
