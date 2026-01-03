"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { incrementBy, setCount } from "@/features/cart/cartSlice";
import { addItemLocal, getLocalCart } from "@/lib/cartLocal";

type Product = {
  _id?: string;
  id?: string;
  name: string;
  price?: number;
  image?: string;
  images?: string[];
  oldPrice?: number;
  rating?: number;
};

export default function ShopPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('AccessToken') : null;
        const res = await fetch('/api/product/get-all-product', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: 'no-store',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load products');
        const list: any[] = Array.isArray(data?.data) ? data.data : (Array.isArray(data?.products) ? data.products : []);
        setProducts(list);
      } catch (e: any) {
        setError(e?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const displayCount = useMemo(() => products?.length ?? 0, [products]);

  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem('AccessToken');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) {
        const productId = product._id || product.id;
        if (!productId) return;
        // guest cart: write to localStorage
        addItemLocal({
          productId,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image || (product.images && product.images[0]) || "/images/Trending.png",
        });
        // update badge count from local cart
        const total = getLocalCart().reduce((s, it) => s + (it.quantity || 0), 0);
        dispatch(setCount(total));
        // soft notice
        console.info('Added to cart locally. Login to checkout.');
        return;
      }
      const productId = product._id || product.id;
      if (!productId) return;
      setAddingId(productId);
      // optimistic: increment by 1
      dispatch(incrementBy(1));
      const res = await fetch('/api/cart/add-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });
      if (!res.ok) {
        // revert optimistic on failure
        dispatch(incrementBy(-1));
        const data = await res.json();
        alert(data?.message || 'Failed to add to cart');
      }
    } catch (e: any) {
      dispatch(incrementBy(-1));
      alert(e?.message || 'Failed to add to cart');
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="hover:text-teal-600">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-700">Shop</li>
        </ol>
      </nav>

      {/* Banner */}
      <div className="w-full h-40 sm:h-52 md:h-64 bg-[#F3F5F9] rounded-md mb-6 flex items-center justify-between overflow-hidden">
        <div className="p-6">
          <p className="text-[#71778E] mb-1">Organic Meals Prepared</p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Delivered to your Home</h2>
          <p className="text-sm text-gray-500 max-w-md">Discover groceries, bakery, meats, and everyday essentials at the best prices.</p>
        </div>
        <div className="hidden sm:block mr-4">
          <Image src="/images/HotProductOffer.png" width={260} height={160} alt="Shop banner" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6 text-sm">
        <div className="text-gray-600">Showing {displayCount} results</div>
        <div className="flex items-center gap-3">
          <label htmlFor="sorting" className="text-gray-600">Sort by:</label>
          <select id="sorting" className="border rounded-md px-3 py-2 text-gray-700">
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <section className="border rounded-md p-4">
            <h3 className="font-semibold mb-3">Product Categories</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center justify-between"><span>Beverages</span><span className="text-gray-400">12</span></li>
              <li className="flex items-center justify-between"><span>Biscuits & Snacks</span><span className="text-gray-400">8</span></li>
              <li className="flex items-center justify-between"><span>Breads & Bakery</span><span className="text-gray-400">6</span></li>
              <li className="flex items-center justify-between"><span>Breakfast & Dairy</span><span className="text-gray-400">10</span></li>
              <li className="flex items-center justify-between"><span>Frozen Foods</span><span className="text-gray-400">7</span></li>
            </ul>
          </section>

          {/* Brands */}
          <section className="border rounded-md p-4">
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                "Kroger",
                "Great Value",
                "Whole Farm",
                "Green Leaf",
                "Daily Fresh",
              ].map((b) => (
                <label key={b} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-teal-600" />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Price Filter (static) */}
          <section className="border rounded-md p-4">
            <h3 className="font-semibold mb-3">Price</h3>
            <input type="range" min={0} max={100} defaultValue={50} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$0</span>
              <span>$100</span>
            </div>
          </section>

          {/* Promo */}
          <section className="border rounded-md p-0 overflow-hidden">
            <Image src="/images/HotProductOffer.png" alt="Promo" width={420} height={560} className="w-full h-auto" />
          </section>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading products...</div>
          ) : error ? (
            <div className="py-10 text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((p) => {
                const id = (p as any)._id || (p as any).id;
                const img = (p as any).image || (p as any).images?.[0] || "/images/Trending.png";
                const priceVal = typeof p.price === 'number' ? p.price : (p as any).price?.current || 0;
                const oldVal = typeof p.oldPrice === 'number' ? p.oldPrice : priceVal * 1.2;
                return (
                  <div key={id} className="group border rounded-md p-3 hover:shadow-sm transition">
                    <div className="relative w-full aspect-square mb-3 bg-white">
                      <Image src={img} alt={p.name} fill className="object-contain p-4" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{p.name}</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-teal-600 font-semibold">${priceVal.toFixed(2)}</span>
                      <span className="text-gray-400 line-through text-xs">${oldVal.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <button onClick={() => addToCart(p)} disabled={addingId === id} className="text-xs bg-teal-500 text-white px-3 py-2 rounded hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed">
                        {addingId === id ? 'Adding...' : 'Add to Cart'}
                      </button>
                      <Link href={`/products/${id}`} className="text-xs text-teal-600 hover:underline">Details</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination (static) */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[1,2,3,4].map((i) => (
              <button key={i} className={`h-8 w-8 rounded-sm border text-sm ${i===1 ? 'bg-teal-500 text-white border-teal-500' : 'hover:border-teal-500 hover:text-teal-600'}`}>{i}</button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
