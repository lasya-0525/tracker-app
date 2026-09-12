import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function getUserId(): string {
  let id = localStorage.getItem("tracker:userId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("tracker:userId", id);
  }
  return id;
}

export async function loadChecks(dateKey: string): Promise<Record<string, boolean>> {
  const { data } = await supabase
    .from("daily_checks")
    .select("checks")
    .eq("user_id", getUserId())
    .eq("date", dateKey)
    .single();
  return (data?.checks as Record<string, boolean>) ?? {};
}

export async function saveChecks(dateKey: string, checks: Record<string, boolean>): Promise<void> {
  await supabase.from("daily_checks").upsert({
    user_id: getUserId(),
    date: dateKey,
    checks,
    updated_at: new Date().toISOString(),
  });
}
