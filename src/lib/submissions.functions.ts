import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface AuditInput {
  name: string;
  practiceName: string;
  website: string;
  city: string;
  specialty: string;
  email: string;
}

export interface ContactInput {
  name: string;
  email: string;
  business: string;
  website: string;
  location: string;
  message: string;
}

const auditSchema = z.object({
  name: z.string().trim().min(1).max(120),
  practiceName: z.string().trim().max(160).default(""),
  website: z.string().trim().max(300).default(""),
  city: z.string().trim().max(120).default(""),
  specialty: z.string().trim().max(160).default(""),
  email: z.string().trim().email().max(200),
});

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  business: z.string().trim().max(160).default(""),
  website: z.string().trim().max(300).default(""),
  location: z.string().trim().max(160).default(""),
  message: z.string().trim().min(1).max(4000),
});

function publicClient() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  const supabase = createClient(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: { fetch: (input, init) => {
      const h = new Headers(init?.headers);
      if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization');
      h.set('apikey', key);
      return fetch(input, { ...init, headers: h });
    } },
  });
  return supabase;
}

export const submitAudit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => auditSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("audit_submissions").insert({
      name: data.name,
      practice_name: data.practiceName || null,
      website: data.website || null,
      city: data.city || null,
      specialty: data.specialty || null,
      email: data.email,
    });
    if (error) {
      console.error("audit_submissions insert failed:", error.message);
      return { ok: false as const, error: "Something went wrong saving your request. Please try again." };
    }
    return { ok: true as const };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      business: data.business || null,
      website: data.website || null,
      location: data.location || null,
      message: data.message,
    });
    if (error) {
      console.error("contact_submissions insert failed:", error.message);
      return { ok: false as const, error: "Something went wrong sending your message. Please try again." };
    }
    return { ok: true as const };
  });
