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
            <nav className="absolute z-0 h-full min-h-screen w-48 bg-gray-900">
              {/** Close button */}
              <button
                className="relative top-2 left-2 z-10 border-none bg-neutral-800 px-4 py-3 outline-none"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-2 fill-neutral-300"
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              </button>
              <div className="flex min-h-min flex-col items-center justify-between">
                <Link to="/" className="pt-5 text-lg text-white">
                  Home
                </Link>
                <Link to="/stacks" className="pt-5 text-lg text-white">
                  My stacks
                </Link>
              </div>
            </nav>
          ) : (
            <button
              className="absolute top-2 left-2 z-10 border-none px-3 py-2 outline-none"
              onClick={() => setIsNavOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          )}
        </>
      ) : (
        <nav className="min-h-screen w-44 flex-shrink-0 bg-gray-900 2xl:w-64">
          <div className="flex min-h-min flex-col items-center justify-between">
            <Link to="/" className="pt-5 text-lg text-white">
              Home
            </Link>
            <Link to="/stacks" className="pt-5 text-lg text-white">
              My stacks
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
