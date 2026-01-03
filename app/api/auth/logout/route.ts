// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Missing Authorization token" }, { status: 401 });
    }

    const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "Failed to logout" }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
