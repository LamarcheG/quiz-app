import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="mx-auto w-fit">
      <nav className="absolute top-0 left-0 flex w-3/12 items-center justify-between">
        <Link to="/">Home</Link>
        <Link to="/stacks">My stacks</Link>
      </nav>
      <Outlet />
    </div>
  );
};
