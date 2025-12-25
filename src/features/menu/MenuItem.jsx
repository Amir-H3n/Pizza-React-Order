import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const quantity = useSelector(
    (state) => state.cart.cart.find((item) => item.pizzaId === id)?.quantity,
  );

  const handleClick = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex h-104 w-63 flex-col items-center gap-y-1 rounded-md bg-yellow-50 pb-4 shadow-xs">
      <img
        className={`h-63 w-full rounded-t-md ${soldOut ? "grayscale-100" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col items-center gap-y-1.5 px-1 text-center text-stone-700">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm capitalize">{ingredients.join(", ")}</p>
        <div className="text-lg">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
        {!soldOut && !quantity && (
          <Button onClick={handleClick} type="small">
            ADD TO CART
          </Button>
        )}
        {quantity && <UpdateItemQuantity pizzaId={id} quantity={quantity} />}
      </div>
    </li>
  );
}

export default MenuItem;
