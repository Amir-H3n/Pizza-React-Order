// Test ID: IIDSAT

import { useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import PirovityButton from "./PirovityButton";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="my-5 flex flex-col gap-y-5 px-2 sm:px-5 lg:gap-y-8">
      <div className="flex justify-between">
        <h2 className="font-semibold text-zinc-950 sm:text-lg">
          Order #{id} status
        </h2>

        <div className="flex gap-x-1.5 text-white">
          {priority && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-sm sm:px-3 sm:text-base">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-0.5 text-sm sm:px-3 sm:text-base">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-col rounded-md bg-zinc-200 p-2 sm:flex-row sm:justify-between sm:px-5 sm:py-3.5">
        <p className="text-zinc-900 md:text-lg">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="ps-3 text-zinc-500 sm:ps-0">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-zinc-200 px-2 text-sm text-zinc-800 md:text-base">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="flex justify-between rounded-md bg-zinc-200 p-3 text-zinc-700">
        <div>
          <p>Price pizza: {formatCurrency(orderPrice)}</p>
          {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
          <p className="text-zinc-900">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
        {!priority && <PirovityButton />}
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
