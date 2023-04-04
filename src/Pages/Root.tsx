import { Link, Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="mx-auto w-fit">
      <nav className="absolute top-0 left-0 flex h-full w-32 flex-col items-center justify-between bg-gray-700">
        <div className="flex h-24 flex-col items-center justify-between">
          <Link to="/">Home</Link>
          <Link to="/stacks">My stacks</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
