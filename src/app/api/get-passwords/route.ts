import { NextResponse } from "next/server";
import { getSavedPasswords } from "@/lib/passwordService";

export async function GET(request: Request) {
  const userId = request.headers.get("userId"); // Replace with actual authentication logic

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const passwords = await getSavedPasswords(userId); // Fetch saved passwords for the user
    return NextResponse.json(passwords, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch passwords" },
      { status: 500 }
    );
  }
}