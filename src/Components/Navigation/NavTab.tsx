import { useState } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const NavTab = ({ to, children }: NavLinkProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Link
      to={to}
      className={
        "ml-5 flex flex-row rounded-md px-2 py-1 text-lg text-text-OverBlue transition-all duration-150 ease-in-out hover:bg-primary" +
        (isClicked ? " animate-buttonClick" : "")
      }
      onClick={() => setIsClicked(true)}
      onAnimationEnd={() => setIsClicked(false)}
    >
      {children}
    </Link>
  );
};
