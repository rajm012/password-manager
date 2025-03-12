import { NextResponse } from "next/server";
import { getSavedPasswords } from "@/lib/passwordService";

export async function GET(request: Request) {
  const userId = request.headers.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const passwords = await getSavedPasswords(userId);
    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch passwords", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}