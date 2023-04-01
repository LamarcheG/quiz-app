import { Link, Outlet } from "react-router-dom";
import App from "../App";

export const Root = () => {
  return (
    <div>
      <nav className="absolute top-0 left-0 flex w-3/12 items-center justify-between">
        <Link to="/">Home</Link>
        <Link to="/stacks">My stacks</Link>
      </nav>
      <Outlet />
    </div>
  );
};
