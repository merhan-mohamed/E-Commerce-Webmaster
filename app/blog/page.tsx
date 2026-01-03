"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

type Blog = {
  _id?: string;
  id?: string;
  title?: string;
  content?: string;
  image?: string;
  thumbnail?: string;
  author?: string;
  createdAt?: string;
  summary?: string;
};

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("AccessToken") : null;
        const res = await fetch("/api/blog/get-all-blog", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load blogs");
        const list: any[] = Array.isArray(data?.data) ? data.data : (Array.isArray(data?.blogs) ? data.blogs : []);
        setBlogs(list);
      } catch (e: any) {
        setError(e?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Link href={'/blog/add'} className={'flex items-center gap-1 text-teal-600 hover:underline'}>
          <IoIosAddCircle className={'text-2xl text-Primary p-0 m-0'} />
          Add New Blog
        </Link>
      </div>

      {loading && <div className="py-10 text-gray-500">Loading blogs...</div>}
      {error && <div className="py-10 text-red-500">{error}</div>}
      {!loading && !error && (
        blogs.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => {
              const id = (b as any)._id || (b as any).id;
              const title = b.title || "Untitled";
              const img = (b as any).image || (b as any).thumbnail || "/images/Trending.png";
              const summary = (b as any).summary || (b.content ? String(b.content).slice(0, 120) + "..." : "");
              const date = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "";
              return (
                <Link href={`/blog/${id}`} key={id} className="block border rounded-md overflow-hidden hover:shadow-sm transition">
                  <div className="relative w-full aspect-[16/9] bg-white">
                    <Image src={img} alt={title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 min-h-[44px]">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{date}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{summary}</p>
                    <span className="text-teal-600 text-sm mt-3 inline-block">Read more →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-gray-500">No blogs found.</div>
        )
      )}
    </div>
  );
}
