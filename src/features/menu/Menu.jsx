import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <section className="">
      <h1 className="my-10 text-center text-3xl font-bold">Menu</h1>
      <ul className="grid grid-cols-1 place-items-center gap-y-5 sm:grid-cols-2 sm:gap-9 md:grid-cols-3 lg:grid-cols-4">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </section>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
