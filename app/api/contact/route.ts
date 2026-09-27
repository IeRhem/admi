import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { contactFormSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(payload);
  if (!result.success) {
    return Response.json({ error: "Invalid contact form data." }, { status: 400 });
  }

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    await mkdir(dataDirectory, { recursive: true });
    await appendFile(
      path.join(dataDirectory, "contact-submissions.jsonl"),
      `${JSON.stringify({ ...result.data, receivedAt: new Date().toISOString() })}\n`,
      "utf8",
    );
  } catch {
    return Response.json(
      { error: "Unable to store contact form submission." },
      { status: 500 },
    );
  }

  return Response.json({ received: true }, { status: 202 });
}
