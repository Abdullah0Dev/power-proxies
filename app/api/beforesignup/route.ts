import type { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, id } = req.body;

  try {
    // Determine the role based on the email
    let role = "user";
    if (email === "webminds.y1t@gmail.com") {
      role = "admin";
    }

    // Assign the role to the user's metadata
    await clerkClient.users.updateUser(id, {
      publicMetadata: { role },
    });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error in beforeSignUp webhook:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
