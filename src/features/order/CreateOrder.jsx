import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import Button from "../../ui/Button";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const formErrors = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);

  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;

  const totalPriceWithPriority = totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mt-6 px-5">
      <h2 className="my-4 text-2xl md:mb-10 md:text-3xl">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="flex flex-col items-center gap-y-4">
        <div className="flex flex-col items-center gap-y-1">
          <label className="text-stone-700 sm:text-xl">First Name</label>
          <input
            className="w-60 rounded-md bg-blue-900/15 p-1 text-sm text-stone-700 transition-all duration-300 focus:ring focus:ring-blue-900/30 focus:outline-none sm:w-76 md:w-90 md:p-2 md:text-lg"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <label className="text-stone-700 sm:text-xl">Phone number</label>
          <div className="flex flex-col items-center gap-y-1">
            <input
              className="w-60 rounded-md bg-blue-900/15 p-1 text-sm text-stone-700 transition-all duration-300 focus:ring focus:ring-blue-900/30 focus:outline-none sm:w-76 md:w-90 md:p-2 md:text-lg"
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="text-red-500">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-1">
          <label className="text-stone-700 sm:text-xl">Address</label>
          <div>
            <input
              className="w-60 rounded-md bg-blue-900/15 p-1 text-sm text-stone-700 transition-all duration-300 focus:ring focus:ring-blue-900/30 focus:outline-none sm:w-76 md:w-90 md:p-2 md:text-lg"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex gap-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
