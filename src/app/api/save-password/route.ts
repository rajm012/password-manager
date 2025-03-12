
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(req: Request) {
  console.log("API called!");

  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const { userId, site, username, password } = body;

    if (!userId || !site || !username || !password) {
      console.error("Missing fields");
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // 1️⃣ Fetch the UUID for the given Clerk userId
    let { data: user } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    // 2️⃣ If user doesn't exist, insert them
    if (!user) {
      console.log("User not found, inserting...");
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from("users")
        .insert([{ clerk_user_id: userId }])
        .select("id")
        .single();

      if (insertError) {
        console.error("Supabase User Insert Error:", insertError);
        throw insertError;
      }

      user = newUser;
    }

    const userUUID = user.id; // UUID from `users` table

    // 3️⃣ Insert password data into `passwords` table using UUID
    const { data, error } = await supabaseAdmin.from("passwords").insert([
      { userId: userUUID, site_name: site, username, password },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }

    return new Response(JSON.stringify({ message: "Password saved!", data }), { status: 200 });
  } catch (error: unknown) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } else {
      return new Response(JSON.stringify({ error: "An unknown error occurred" }), { status: 500 });
    }
  }
}