import { VercelRequest, VercelResponse } from "@vercel/node";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export default function handler(request: VercelRequest, response: VercelResponse) {
    if (request.method !== "POST") return response.status(405).send("Method Not Allowed");

    const { password } = request.body;

    if (password === ADMIN_PASSWORD) return response.status(200).json({ status: true });

    return response.status(401).json({ status: false });
}
