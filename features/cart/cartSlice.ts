import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name?: string;
  image?: string;
  price?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number; // total quantity
}

const initialState: CartState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<{ items: CartItem[]; count: number }>) {
      state.items = action.payload.items;
      state.count = action.payload.count;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    incrementBy(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    clearCart(state) {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { setCart, setCount, incrementBy, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
