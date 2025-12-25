import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-4">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-around gap-x-4">
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <p>{formatCurrency(totalPrice)}</p>
        <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
          REMOVE
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
