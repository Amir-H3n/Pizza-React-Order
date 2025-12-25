import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  const isloading = navigation.state === "loading";
  return (
    <div className="mx-auto flex max-w-7xl flex-col justify-between">
      <div>
        <Header />
        <main>
          {isloading && <div className="loader mx-auto mt-5"></div>}
          {isloading || (
            <>
              <Outlet />
            </>
          )}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
