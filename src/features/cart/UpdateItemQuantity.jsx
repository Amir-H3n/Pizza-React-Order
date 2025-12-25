import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaceItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ quantity, pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row-reverse items-center gap-x-2">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
      <span>{quantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(decreaceItemQuantity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
