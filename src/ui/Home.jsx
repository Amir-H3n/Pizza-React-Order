import { useState } from "react";
import Button from "./Button";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="mt-15 flex flex-col items-center justify-center gap-y-4 text-center md:gap-y-6">
      <h1 className="text-xl font-semibold tracking-widest sm:text-2xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
