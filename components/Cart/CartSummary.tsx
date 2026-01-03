// components/CartSummary.tsx (Dynamic)
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart, setCount } from "@/features/cart/cartSlice";
import { getLocalCart, setQtyLocal, addItemLocal } from "@/lib/cartLocal";

type CartAPIItem = {
  productId?: string;
  id?: string;
  _id?: string;
  quantity: number;
  product?: { name?: string; price?: number; image?: string };
  name?: string;
  price?: number;
  image?: string;
};

const CartSummary = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<CartAPIItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("AccessToken");
        setHasToken(!!token);
        if (!token) {
          // Guest cart from localStorage
          const local = getLocalCart();
          const list = local.map((it) => ({
            productId: it.productId,
            quantity: it.quantity,
            name: it.name,
            price: it.price,
            image: it.image,
          }));
          setItems(list as any);
          const count = local.reduce((s, it) => s + (it.quantity || 0), 0);
          dispatch(setCart({ items: local.map((x) => ({ id: x.productId, name: x.name, image: x.image, price: x.price, quantity: x.quantity })), count }));
          dispatch(setCount(count));
        } else {
          // try get-cart, refresh token once on 401
          let res = await fetch("/api/cart/get-cart", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });
          if (res.status === 401) {
            const r = await fetch("/api/auth/refresh", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
            if (r.ok) {
              const d = await r.json();
              const newToken = d.AccessToken || d.accessToken || d.token;
              if (newToken) {
                const newExpires = Date.now() + 10 * 60 * 1000;
                localStorage.setItem("AccessToken", newToken);
                localStorage.setItem("expiresAt", String(newExpires));
                res = await fetch("/api/cart/get-cart", { headers: { Authorization: `Bearer ${newToken}` }, cache: "no-store" });
              }
            }
          }
          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || "Failed to load cart");
          const list: any[] = Array.isArray(data?.data?.items)
            ? data.data.items
            : Array.isArray(data?.items)
            ? data.items
            : [];
          setItems(list);
          const count = list.reduce((s, it: any) => s + (it.quantity || 0), 0);
          const normalized = list.map((it: any) => ({
            id: it.productId || it._id || it.id,
            name: it?.product?.name || it?.name,
            image: it?.product?.image || it?.image,
            price: it?.product?.price || it?.price,
            quantity: it.quantity || 0,
          }));
          dispatch(setCart({ items: normalized, count }));
          dispatch(setCount(count));
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dispatch]);

  const handleInc = async (pid?: string) => {
    if (!pid) return;
    if (!hasToken) {
      // guest: increment locally
      addItemLocal({ productId: pid, quantity: 1 });
      const local = getLocalCart();
      setItems(local as any);
      const count = local.reduce((s, it) => s + (it.quantity || 0), 0);
      dispatch(setCount(count));
      return;
    }
    try {
      const token = localStorage.getItem("AccessToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;
      let res = await fetch("/api/cart/add-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, productId: pid, quantity: 1 }),
      });
      if (res.status === 401) {
        const r = await fetch("/api/auth/refresh", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
        if (r.ok) {
          const d = await r.json();
          const newToken = d.AccessToken || d.accessToken || d.token;
          if (newToken) {
            const newExpires = Date.now() + 10 * 60 * 1000;
            localStorage.setItem("AccessToken", newToken);
            localStorage.setItem("expiresAt", String(newExpires));
            res = await fetch("/api/cart/add-cart", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${newToken}` },
              body: JSON.stringify({ userId, productId: pid, quantity: 1 }),
            });
          }
        }
      }
      // refresh
      const res2 = await fetch("/api/cart/get-cart", { headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }, cache: "no-store" });
      const data = await res2.json();
      const list: any[] = Array.isArray(data?.data?.items) ? data.data.items : Array.isArray(data?.items) ? data.items : [];
      setItems(list);
      const count = list.reduce((s, it: any) => s + (it.quantity || 0), 0);
      dispatch(setCount(count));
    } catch (e) {
      console.warn("Failed to increment quantity", e);
    }
  };

  const handleDecGuest = (pid?: string) => {
    if (!pid) return;
    const current = getLocalCart();
    const item = current.find((x) => x.productId === pid);
    const nextQty = Math.max(0, (item?.quantity || 0) - 1);
    setQtyLocal(pid, nextQty);
    const local = getLocalCart();
    setItems(local as any);
    const count = local.reduce((s, it) => s + (it.quantity || 0), 0);
    dispatch(setCount(count));
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = it.price ?? it.product?.price ?? 0;
      return sum + price * (it.quantity || 0);
    }, 0);
  }, [items]);
  const totalQty = useMemo(() => items.reduce((s, it) => s + (it.quantity || 0), 0), [items]);

  if (loading) {
    return <div className="py-4 text-sm text-gray-500">Loading cart...</div>;
  }
  if (error) {
    return <div className="py-4 text-sm text-red-500">{error}</div>;
  }

  return (
    <div>
      {!hasToken && (
        <div className="w-full rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-900 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm">You are not signed in. Items in your cart are saved on this device only. Please log in to checkout.</p>
            <Link href="/auth/login" className="text-sm underline underline-offset-4">Go to Login</Link>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((it, idx) => {
            const id = it.productId || it._id || it.id || String(idx);
            const name = it.product?.name || it.name || "Product";
            const price = it.product?.price || it.price || 0;
            const image = it.product?.image || it.image || "/images/Trending.png";
            const qty = it.quantity || 0;
            return (
              <div className="flex items-center justify-between" key={id}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={image}
                      alt={name}
                      width={60}
                      height={60}
                      className="object-cover rounded-sm border border-graymedium p-1"
                    />
                    <div className="absolute -top-2 -right-2 bg-graydark text-bggraylight text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {qty}
                    </div>
                  </div>
                  <p className="text-sm font-semibold line-clamp-2 max-w-[180px]">{name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-sm">
                    <button
                      className="px-2 py-1 text-sm disabled:opacity-50"
                      onClick={() => (hasToken ? null : handleDecGuest(id))}
                      disabled={hasToken /* disable decrement for signed-in due to missing API */}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm select-none">{qty}</span>
                    <button
                      className="px-2 py-1 text-sm"
                      onClick={() => handleInc(id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold">${(price * qty).toFixed(2)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Totals */}
      <div className="mt-6 pt-4 text-sm space-y-2">
        <div className="flex justify-between text-sm font-semibold">
          <span>Subtotal | {totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-3">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <span className="text-sm text-graydark">Including taxes if applicable</span>
    </div>
  );
};

export default CartSummary;