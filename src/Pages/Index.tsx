import { Link } from "react-router-dom";
import IndexImage from "../assets/IndexImage.jpg";

export const Index = () => {
  return (
    <div className="mt-24 grid grid-cols-4 lg:mt-40 lg:grid-cols-12">
      <section className="col-span-4 items-center lg:col-span-6 lg:col-start-4">
        <div className="mb-8 flex flex-nowrap justify-center lg:mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-3 w-12 fill-primary"
          >
            <path d="M313.6 474.6h-1a158.1 158.1 0 0 1 0-316.2c94.9 0 168.2 83.1 157 176.6 4 5.1 8.2 9.6 11.2 15.3 13.4-30.3 20.3-62.4 20.3-97.7C501.1 117.5 391.6 8 256.5 8S12 117.5 12 252.6s109.5 244.6 244.5 244.6a237.36 237.36 0 0 0 70.4-10.1c-5.2-3.5-8.9-8.1-13.3-12.5zm-.1-.1l.4.1zm78.4-168.9a99.2 99.2 0 1 0 99.2 99.2 99.18 99.18 0 0 0-99.2-99.2z" />
          </svg>
          <h1>Quiz&nbsp;app</h1>
        </div>
        <div className="mx-auto max-w-4xl  lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex h-40 flex-col items-center justify-between lg:h-44">
            <p className="w-48 text-center xl:w-72">
              Welcome to the best study tool to study for your next exam
            </p>
            <Link
              to={"/stacks"}
              className="w-32 rounded-md bg-primary p-2 text-center text-white transition duration-300 ease-in-out hover:scale-105 hover:border-transparent"
            >
              Get started
            </Link>
          </div>
          <div className="hidden h-64 lg:block">
            <img
              src={IndexImage}
              alt="img"
              className="h-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <div className="col-span-4 m-auto mt-10 mb-3 flex h-fit w-fit lg:col-span-2 lg:col-start-6 lg:mt-20">
        <h2 className="text-2xl lg:text-3xl">Try our features</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="ml-2 w-6 fill-primary"
        >
          <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
        </svg>
      </div>
      <ul className="col-span-4 flex flex-col items-center gap-3 lg:col-span-6 lg:col-start-4 lg:row-start-3 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
        <li className="relative p-3 text-center">
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary lg:hidden"></div>
          <div className="mb-2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 w-5 fill-primary"
            >
              <path d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9l-28.6 47.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L328 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H248zM7 7C16.4-2.3 31.6-2.3 41 7l80 80c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 41C-2.3 31.6-2.3 16.4 7 7zM471 7c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L471 7zM7 505c-9.4-9.4-9.4-24.6 0-33.9l80-80c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 505c-9.4 9.4-24.6 9.4-33.9 0zm464 0l-80-80c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0z" />
            </svg>
            <h3 className="text-xl">Customize</h3>
          </div>
          <p className="block w-40 text-center">
            Edit the question easily to tailor to your needs
          </p>
        </li>
        <li className="relative p-3 text-center">
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary lg:hidden"></div>
          <div className="mb-2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="mr-2 w-5 fill-primary"
            >
              <path d="M175 389.4c-9.8 16-15 34.3-15 53.1c-10 3.5-20.8 5.5-32 5.5c-53 0-96-43-96-96V64C14.3 64 0 49.7 0 32S14.3 0 32 0H96h64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32V309.9l-49 79.6zM96 64v96h64V64H96zM352 0H480h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V214.9L629.7 406.2c6.7 10.9 10.3 23.5 10.3 36.4c0 38.3-31.1 69.4-69.4 69.4H261.4c-38.3 0-69.4-31.1-69.4-69.4c0-12.8 3.6-25.4 10.3-36.4L320 214.9V64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32zm32 64V224c0 5.9-1.6 11.7-4.7 16.8L330.5 320h171l-48.8-79.2c-3.1-5-4.7-10.8-4.7-16.8V64H384z" />
            </svg>
            <h3 className="text-xl">Prepare</h3>
          </div>
          <p className="block w-40 text-center">Get ready for your next test</p>
        </li>
        <li className="relative p-3 text-center">
          <div className="mb-2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 w-5 fill-primary"
            >
              <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
            </svg>
            <h3 className="text-xl">Improve</h3>
          </div>
          <p className="block w-40 text-center">
            Review your statistics and try to improve
          </p>
        </li>
        {/* <li className="relative p-3 text-center">
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary"></div>
          Create a quiz from scratch with minimum effort
        </li>
        <li className="relative p-3 text-center">
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary"></div>
          Edit the question easily to tailor to your needs
        </li>
        <li className="relative p-3 text-center">
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-primary"></div>
          Take the quiz in an engaging maner
        </li>
        <li className="w-40 p-3 text-center">
          Review your past result and try to improve
        </li> */}
      </ul>
    </div>
  );
};
