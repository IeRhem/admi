import { contactFormSchema } from "@/lib/schemas/contact";

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

  console.info("Contact form submission received", {
    type: result.data.type,
    email: result.data.email,
  });

  return Response.json({ received: true }, { status: 202 });
}
