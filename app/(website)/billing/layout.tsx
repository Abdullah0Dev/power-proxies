import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import BillingPage from "./page";
import { redirect } from "next/navigation";
import { addEmailToDatabase } from "@/actions/getProxyList";
import ClientSideStorage from "@/components/component/ClientSideStorage";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userEmail = user?.emailAddresses[0].emailAddress;
  await addEmailToDatabase(userEmail);
  return (
    <>
      <ClientSideStorage
       email={userEmail} />

      {/* <BillingPage userEmail={userEmail} /> */}
      {children}
    </>
  );
}
