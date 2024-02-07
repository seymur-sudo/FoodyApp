import React from "react";
import { FaRobot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";

const ChatClient = () => {
  return (
    <>
      <nav className="py-1 px-3 rounded-t-md bg-[#BA68C8] dark:bg-blue-400 font-body flex justify-between items-center">
        <div className="flex items-center ">
          <div className="border-2 border-white dark:border-blue-100  h-12 w-12 rounded-full flex justify-center items-center">
            <FaRobot className="text-white text-4xl" />
          </div>

          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-lg font-semibold ml-4 text-white dark:text-blue-950">
              ChatBot
            </h1>
            <div className="flex  items-center">
              <p>
                <GoDotFill className="text-green-400 text-3xl" />
              </p>
              <p className="text-medium  text-white dark:text-black">online</p>
            </div>
          </div>
        </div>

        <div>
          <button className="bg-[#b83ace] dark:bg-blue-600 px-3 py-1 rounded-[6px] text-white">
            Logout
          </button>
        </div>
      </nav>

      <main className="min-h-[55vh] max-h-[55vh] overflow-y-auto my-scrollable-component bg-white dark:bg-blue-200 "></main>

      <footer className="p-3 rounded-b-md flex justify-between items-center cursor-pointer border-t-2 border-gray-200 dark:border-blue-600 bg-white dark:bg-blue-200">
        <input
          type="text"
          placeholder=" ask your question..."
          className="capitalize py-1 outline-none w-11/12 text-gray-600 dark:text-blue-700 font-bold text-xl bg-white dark:bg-blue-200"
        />
        <FaTelegramPlane className="text-gray-300  dark:text-blue-600 text-3xl" />
      </footer>
    </>
  );
};

export default ChatClient;
