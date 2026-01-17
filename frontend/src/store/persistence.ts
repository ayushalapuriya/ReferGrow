import type { AnyStore, RootState } from "@/store/store";
import type { CartState } from "@/store/slices/cartSlice";

const CART_KEY = "refergrow_cart_v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function loadCartFromStorage(): CartState | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return undefined;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return undefined;

    const items = isRecord(parsed.items) ? (parsed.items as CartState["items"]) : {};
    const totalQuantity =
      typeof parsed.totalQuantity === "number" ? parsed.totalQuantity : 0;
    const totalAmount =
      typeof parsed.totalAmount === "number" ? parsed.totalAmount : 0;

    return {
      items,
      totalQuantity,
      totalAmount,
    };
  } catch {
    return undefined;
  }
}

export function saveCartToStorage(cart: CartState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // ignore
  }
}

export function setupCartPersistence(store: AnyStore) {
  if (typeof window === "undefined") return;

  let last = "";

  store.subscribe(() => {
    const cart = (store.getState() as RootState).cart;
    const serialized = JSON.stringify(cart);

    if (serialized !== last) {
      last = serialized;
      saveCartToStorage(cart);
    }
  });
}