import { Outlet } from "react-router-dom";
import { Nav } from "../Components/Navigation/Nav";

export const Root = () => {
  return (
    <div className="flex h-full w-full">
      <Nav />
      <div className="h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};
