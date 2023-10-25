import React, { useRef, useState } from "react";
import ethGreen from "../assets/ethereumGreen.svg";
import { FiUploadCloud, FiCopy } from "react-icons/fi";
import { onChangeHandler, onUploadHandler } from "../controllers/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Right() {
  const [file, setFile] = useState(1);
  const [url, setUrl] = useState(null);
  const inputRef = useRef();
  const navigator = useNavigate();
  return (
    <div className="col-span-6 md:col-span-2 relative">
      <div className="h-screen bg-zinc-900 flex flex-col justify-between">
        <div className="flex justify-end mt-8">
          <motion.button
            className="capitalize rounded px-4 py-1 bg-[#91FF05] mr-8 font-silk hover:bg-[#69b604]"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            drag
            dragConstraints={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            transition={{ duration: 1 }}
            onClick={() => {
              navigator("/account");
            }}
          >
            account
          </motion.button>
        </div>
        <div className="flex justify-center relative items-center">
          <div className="bg-gradient-to-b from-[#91FF05] z-0 to-[#91FF05] blur-3xl h-20 w-20 2xl:h-40 2xl:w-40 absolute"></div>
          <motion.img
            src={ethGreen}
            alt="ethereum logo"
            className="w-[70%] z-10"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            drag
            dragConstraints={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            transition={{ duration: 0.7 }}
          />
        </div>
        <motion.div
          className="flex justify-center px-12"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-zinc-200 text-center text-4xl capitalize font-silk">
            get your file link now!
          </h1>
        </motion.div>
        <div className="flex flex-col justify-between h-[230px] items-center mb-8">
          <input
            type="file"
            className="absolute h-40 opacity-0"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            ref={inputRef}
          />
          <FiUploadCloud
            className="cursor-pointer"
            color="#91FF05"
            size={100}
            onClick={() => {
              inputRef.current.click();
            }}
          />
          <h1 className="bg-[#91FF05] rounded px-4 py-1 mx-8 font-silk max-w-xs overflow-clip">
            {file.name}
          </h1>
          <div className="flex justify-between w-full pr-8">
            <motion.div
              animate={{ scale: 1 }}
              initial={{ scale: 0.8 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="ml-8"
            >
              <FiCopy
                color="#91FF05"
                size={32}
                className="cursor-pointer"
                onClick={(event) => {
                  onChangeHandler(event, url);
                }}
              />
            </motion.div>
            <motion.button
              type="submit"
              className="capitalize hover:bg-[#69b604] rounded px-4 py-1 bg-[#91FF05] font-silk"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              drag
              dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              transition={{ duration: 1 }}
              onClick={async (event) => {
                if (file === 1) {
                  toast.error("You didn't select the file yet!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    pauseOnFocusLoss: false,
                  });
                  return;
                }
                const tempUrl = await toast.promise(
                  onUploadHandler(event, file),
                  {
                    pending: "Uploading a file",
                    success: "You just uploaded a file!",
                    error: "Something went wrong..",
                  },
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    pauseOnFocusLoss: false,
                  }
                );
                setUrl(tempUrl);
              }}
            >
              upload
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Right;
