"use client";

import { Provider } from "react-redux";
import { useEffect, useState } from "react";

import { makeStore, type AppStore } from "@/store/store";
import { loadCartFromStorage, setupCartPersistence } from "@/store/persistence";
import { hydrateCart } from "@/store/slices/cartSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    setupCartPersistence(store);

    const cart = loadCartFromStorage();
    if (cart) {
      store.dispatch(hydrateCart(cart));
    }
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
