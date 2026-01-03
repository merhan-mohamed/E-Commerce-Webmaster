// app/api/product/get-all-product/route.ts
import { NextResponse } from "next/server";

const BASE_URL = "https://e-commarce-website-eight.vercel.app";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || undefined;
    const res = await fetch(`${BASE_URL}/api/v1/product/get-all-product`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      // Revalidate frequently but avoid caching sensitive auth requests
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to fetch products" },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
