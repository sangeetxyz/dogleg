import React from "react";
import { useNavigate } from "react-router-dom";
import ethBlack from "../assets/ethereumBlack.svg";
import { motion } from "framer-motion";

function Left() {
  const navigator = useNavigate();
  return (
    <div className="col-span-6 md:col-span-4 relative">
      <div className="bg-gradient-to-br from-[#91FF05] z-0 to-zinc-200 blur-3xl h-60 w-60 absolute top-[-4rem] left-[-4rem]"></div>
      <div className="bg-gradient-to-tl from-[#91FF05] z-0 to-zinc-200 h-40 lg:h-60 w-60 absolute blur-3xl bottom-0 right-0 overflow-hidden"></div>
      <div className="h-screen bg-zinc-300 flex flex-col justify-between">
        <motion.div
          className="pt-8 flex flex-col z-10"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-silk text-4xl flex pl-10 leading-8 items-center">
            D
            <motion.img
              src={ethBlack}
              className="h-8 pt-1"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            gleg
          </h1>
        </motion.div>
        <div className="bg-gradient-to-r z-10 from-zinc-50 via-zinc-30 to-zinc-300 px-10 py-6 flex flex-col space-y-4">
          <div className="max-w-3xl">
            <motion.h1
              className="font-silk text-5xl lg:text-7xl"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              discover the most secure storage solution.
            </motion.h1>
          </div>
          <div>
            <motion.h1
              className="font-silk text-sm lg:text-lg mr-10 ml-2"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              the decentralized storage system powerd by ethereum blockchain.
            </motion.h1>
          </div>
          <div>
            <motion.button
              className="capitalize text-zinc-200 ml-2 rounded px-4 py-1 bg-black font-silk hover:bg-[#233d00]"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              whileHover={{ scale: 1.1 }}
              drag
              dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onClick={() => {
                navigator("/account");
              }}
            >
              get started
            </motion.button>
          </div>
        </div>
        <motion.div
          className="flex w-full z-10 md:w-[450px] px-10 pb-8 justify-between"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className=" font-silk text-lg cursor-pointer hover:underline-offset-[10px] hover:underline decoration-[#91FF05] decoration-4">
            community
          </h1>
          <h1 className="font-silk text-lg cursor-pointer hover:underline-offset-[10px] hover:underline decoration-[#91FF05] decoration-4">
            about
          </h1>
          <h1 className="font-silk text-lg cursor-pointer hover:underline-offset-[10px] hover:underline decoration-[#91FF05] decoration-4">
            policy
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default Left;
