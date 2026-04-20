import { createClient } from "@supabase/supabase-js";
import { createLogger } from "@/lib/logger";

const supabaseLog = createLogger("supabase");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const message =
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  if (process.env.NODE_ENV === "production") {
    supabaseLog.error(message);
    throw new Error(message);
  }
  supabaseLog.warn(`${message} (dev: calls to Supabase may fail.)`);
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
