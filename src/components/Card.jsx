import React from "react";
import { toast } from "react-toastify";
import { handleDelete } from "../controllers/apis";
import { motion } from "framer-motion";

function Card(props) {
  const fileSize = props.fileSize;
  const fileName = props.fileName;
  const fileUrl = props.fileUrl;
  const blockchain = props.blockchain;
  const index = props.index;
  return (
    <motion.div
      className="bg-zinc-300 h-72 w-full sm:w-96 mx-2 my-2 rounded-xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      whileHover={{scale: 1.05}}
      transition={{
        duration: 1,
      }}
      drag
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div className="flex w-full justify-center items-center h-48 border-b-8 rounded-xl border-zinc-900">
        <h1 className="font-silk text-zinc-900 text-2xl px-4 h-fit text-center break-all max-h-48">
          {fileName}
        </h1>
      </div>
      <div className="flex w-full justify-between items-center h-12">
        <h1 className="font-silk text-zinc-900 text-sm px-4">
          {fileSize + "kb"}
        </h1>
        <h1
          className="font-silk text-zinc-900 text-sm px-4 cursor-pointer hover:text-[#91FF05]"
          onClick={async (event) => {
            await toast.promise(
              handleDelete(event, index, blockchain),
              {
                pending: "Deleting the file",
                success: "File deleted!",
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
          delete
        </h1>
      </div>
      <div
        className="flex w-full cursor-pointer justify-center items-center h-12 bg-zinc-900 hover:bg-[#233d00] border-4 rounded-xl border-zinc-300"
        onClick={() => {
          window.open(fileUrl, "_blank");
        }}
      >
        <h1 className="font-silk text-zinc-200 text-xl px-4">download</h1>
      </div>
    </motion.div>
  );
}

export default Card;
