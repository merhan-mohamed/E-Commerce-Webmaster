// app/api/blog/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

// Next.js 16 route handler signature for dynamic routes
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const res = await fetch(`${BASE_URL}/api/v1/blog/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ message: data?.message || "Failed to fetch blog" }, { status: res.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
