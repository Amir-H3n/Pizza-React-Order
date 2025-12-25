import { configureStore } from "@reduxjs/toolkit";
import user from "./features/user/userSlice";
import cart from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user,
    cart,
  },
});

export default store;
