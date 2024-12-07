import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req, res) {
  console.log("API route hit");
  res.status(200).json({ message: "Webhook received!" });
}
