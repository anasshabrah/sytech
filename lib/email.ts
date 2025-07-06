// lib/email.ts
import { ServerClient } from "postmark";

export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let client: ServerClient;
export function getEmailClient(): ServerClient {
  if (!client) {
    const token = process.env.POSTMARK_SERVER_TOKEN!;
    client = new ServerClient(token);
  }
  return client;
}
