import React, { useState } from "react";
import ethBlack from "../assets/ethereumBlack.svg";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import metamask from "../controllers/metamask";
import { toast } from "react-toastify";
import { TbPlugConnectedX } from "react-icons/tb";
import { HiRefresh } from "react-icons/hi";
import { FaCat } from "react-icons/fa";
import { handleUploadByAccount } from "../controllers/apis";
import { motion } from "framer-motion";

function Account() {
  const [blockchain, setBlockchain] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null,
    data: null,
  });
  const navigator = useNavigate();
  const [file, setFile] = useState(null);

  return (
    <div>
      <div className="bg-zinc-900 h-screen">
        <div className="bg-zinc-300 flex justify-between fixed top-0 w-full">
          <motion.div
            className="py-4 flex flex-col cursor-pointer"
            animate={{ x: 0 }}
            initial={{ x: -100 }}
            transition={{ duration: 1 }}
            onClick={() => {
              navigator("/");
            }}
          >
            <h1 className="font-silk text-4xl flex pl-6 leading-8 items-center">
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
          <div className="py-4 pr-6">
            {blockchain.account === null ? (
              <motion.div
                animate={{ x: 0 }}
                initial={{ x: 50 }}
                transition={{ duration: 1 }}
              >
                <TbPlugConnectedX
                  size={30}
                  onClick={async () => {
                    setBlockchain(await metamask());
                  }}
                  className="cursor-pointer"
                />
              </motion.div>
            ) : (
              <HiRefresh
                size={30}
                onClick={async () => {
                  setBlockchain(await metamask());
                  toast.success("Data reloaded!", {
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
                }}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="pt-16 text-white bg-zinc-900">
          <div className="bg-pink-90 h-48 px-8 py-8">
            {blockchain.provider === null ? (
              <div></div>
            ) : (
              <motion.div
                className="w-full h-28 border-white border-2 border-dashed flex justify-center items-center py-4"
                animate={{ scale: 1 }}
                initial={{ scale: 0.8 }}
                transition={{ duration: 1 }}
              >
                <input
                  type="file"
                  className="absolute h-28 w-full px-8 opacity-0"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
                <h1 className="font-silk text-center cursor-pointer overflow-hidden px-4">
                  {!file ? "drag and drop your file here" : file?.name}
                </h1>
              </motion.div>
            )}
            {blockchain.provider === null ? (
              <div></div>
            ) : (
              <div className="flex justify-end mt-4">
                <h1
                  className="font-silk cursor-pointer hover:text-[#91FF05]"
                  onClick={async (event) => {
                    if (file === null || file === undefined) {
                      toast.error("Select a file first!", {
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
                    await toast.promise(
                      handleUploadByAccount(event, file, blockchain),
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
                  }}
                >
                  upload now
                </h1>
              </div>
            )}
          </div>
          {blockchain.provider === null ? (
            <div className="fixed top-[50%] w-full">
              <motion.h1
                className="text-center font-silk text-zinc-200"
                animate={{ scale: 1 }}
                initial={{ scale: 0.5 }}
                transition={{ duration: 1 }}
              >
                you are not connected!
              </motion.h1>
            </div>
          ) : (
            <div></div>
          )}

          <div className="pb-12">
            {blockchain.provider === null ? (
              <div></div>
            ) : (
              <Cards blockchain={blockchain} />
            )}
          </div>
        </div>
        <div className="bg-zinc-300 fixed flex justify-between py-4 px-7 bottom-0 w-full space-x-8">
          <motion.h1
            className="font-silk text-zinc-900 overflow-clip"
            animate={{ x: 0 }}
            initial={{ x: -100 }}
            transition={{ duration: 1 }}
          >
            {blockchain.account === null
              ? "connect to metamask"
              : blockchain.account[0]}
          </motion.h1>
          <motion.h1
            className="font-silk text-zinc-900"
            animate={{ x: 0 }}
            initial={{ x: 50 }}
            transition={{ duration: 1 }}
          >
            {blockchain.data === null ? (
              <motion.div
                whileDrag={{ scale: 2, rotate: 360 }}
                transition={{ duration: 2 }}
                drag
                dragConstraints={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <FaCat size={24} />
              </motion.div>
            ) : (
              blockchain.data.length
            )}
          </motion.h1>
        </div>
      </div>
    </div>
  );
}

export default Account;
