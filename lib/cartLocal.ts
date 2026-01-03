// lib/cartLocal.ts
// Simple helpers for a guest cart stored in localStorage

export type LocalCartItem = {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
};

const KEY = "cart.local.v1";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("AccessToken");
}

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Basic sanitize
    return parsed
      .filter((it: any) => it && typeof it.productId === "string")
      .map((it: any) => ({
        productId: String(it.productId),
        quantity: Math.max(1, Number(it.quantity) || 1),
        name: it.name,
        price: typeof it.price === "number" ? it.price : undefined,
        image: it.image,
      }));
  } catch {
    return [];
  }
}

export function setLocalCart(items: LocalCartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function addItemLocal(item: LocalCartItem): void {
  const list = getLocalCart();
  const idx = list.findIndex((x) => x.productId === item.productId);
  if (idx >= 0) {
    list[idx].quantity += item.quantity;
    // update meta if not present
    list[idx].name = list[idx].name || item.name;
    list[idx].price = typeof list[idx].price === "number" ? list[idx].price : item.price;
    list[idx].image = list[idx].image || item.image;
  } else {
    list.push({ ...item, quantity: Math.max(1, item.quantity) });
  }
  setLocalCart(list);
}

export function setQtyLocal(productId: string, quantity: number): void {
  const qty = Math.max(0, Math.floor(quantity));
  const list = getLocalCart();
  const idx = list.findIndex((x) => x.productId === productId);
  if (idx >= 0) {
    if (qty <= 0) {
      list.splice(idx, 1);
    } else {
      list[idx].quantity = qty;
    }
    setLocalCart(list);
  }
}

export function removeItemLocal(productId: string): void {
  const list = getLocalCart().filter((x) => x.productId !== productId);
  setLocalCart(list);
}

export function clearLocalCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
