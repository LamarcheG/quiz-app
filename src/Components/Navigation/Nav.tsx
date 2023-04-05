import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../Hooks/useWindowSize";

export const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const size = useWindowSize();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setSmallScreen(size);
  }, [size]);

  useEffect(() => {
    if (isSmallScreen) {
      setIsNavOpen(false);
    }
  }, [isSmallScreen]);

  const setSmallScreen = (size: any) => {
    if (size.width! < 1024) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          {isNavOpen ? (
            <nav className="absolute left-0 top-0 z-0 h-full w-48 bg-gray-500">
              <button className="" onClick={() => setIsNavOpen(false)}>
                Close
              </button>
              <div className="flex h-24 flex-col items-center justify-between">
                <Link to="/" className="text-lg text-gray-900">
                  Home
                </Link>
                <Link to="/stacks" className="text-lg text-gray-900">
                  My stacks
                </Link>
              </div>
            </nav>
          ) : (
            <button
              className="absolute top-0 left-0 z-10"
              onClick={() => setIsNavOpen(true)}
            >
              Open
            </button>
          )}
        </>
      ) : (
        <nav className="absolute left-0 top-0 z-0 h-full w-48 bg-gray-500">
          <div className="flex h-24 flex-col items-center justify-between">
            <Link to="/" className="text-lg text-gray-900">
              Home
            </Link>
            <Link to="/stacks" className="text-lg text-gray-900">
              My stacks
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
// <nav className="absolute left-0 top-0 z-0 h-full bg-gray-500 lg:w-48">
//   <div className="flex h-24 flex-col items-center justify-between">
//     <Link to="/" className="text-lg text-gray-900">
//       Home
//     </Link>
//     <Link to="/stacks" className="text-lg text-gray-900">
//       My stacks
//     </Link>
//   </div>
// </nav>
