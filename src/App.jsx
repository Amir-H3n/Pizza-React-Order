import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./ui/Home";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as orderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import { action as pirovityAction } from "./features/order/PirovityButton";
import Error from "./ui/Error";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home />, errorElement: <Error /> },
        {
          path: "/menu",
          element: <Menu />,
          errorElement: <Error />,
          loader: MenuLoader,
        },
        { path: "/cart", element: <Cart /> },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: orderAction,
          errorElement: <Error />,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          action: pirovityAction,
          errorElement: <Error />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
