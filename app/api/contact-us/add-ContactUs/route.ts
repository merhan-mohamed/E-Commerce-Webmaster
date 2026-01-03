// app/api/contact-us/add-ContactUs/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Forward Authorization header if present so the backend can authenticate
    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${BASE_URL}/api/v1/contact-us/add-ContactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to send contact message" },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
