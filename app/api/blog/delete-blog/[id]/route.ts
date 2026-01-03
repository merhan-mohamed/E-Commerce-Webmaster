// app/api/blog/delete-blog/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

// Next.js 16 dynamic route handler signature
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Missing Authorization token" }, { status: 401 });
    }
    const res = await fetch(`${BASE_URL}/api/v1/blog/delete-blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "Failed to delete blog" }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
