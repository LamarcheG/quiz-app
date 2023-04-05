import { Link, Outlet } from "react-router-dom";
import { Nav } from "../Components/Navigation/Nav";

export const Root = () => {
  return (
    <>
      <Nav />
      <div className="mx-auto w-fit">
        <Outlet />
      </div>
    </>
  );
};
