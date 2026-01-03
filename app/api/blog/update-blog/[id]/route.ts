// app/api/blog/update-blog/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

// Next.js 16 dynamic route handler signature
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Missing Authorization token" }, { status: 401 });
    }
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/api/v1/blog/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "Failed to update blog" }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
