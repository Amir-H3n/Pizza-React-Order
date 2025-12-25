import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { memo } from "react";

const CartOverview = memo(function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  if (!totalQuantity) return null;

  return (
    <div className="fixed bottom-0 mx-auto flex h-15 w-full max-w-7xl items-center justify-between bg-stone-800 px-4 py-2 text-lg font-semibold text-white uppercase">
      <p className="flex gap-x-3">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
});

export default CartOverview;
