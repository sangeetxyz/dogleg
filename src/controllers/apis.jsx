import { toast } from "react-toastify";
import { Web3Storage } from "web3.storage";

const onChangeHandler = (event, url) => {
  if (url === null || url === undefined) {
    toast.error("The file isn't uploaded yet!", {
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
  navigator.clipboard.writeText(url);
  toast.success("Link copied to clipboard!", {
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
};

const onUploadHandler = async (event, file) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIyMzcyMkNjMzQwOWNCMUI3MUFlNGU1MDkyODEwRjJjNjI4NkI1MGYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzI2NTE5NjIzODAsIm5hbWUiOiJjYXQifQ.fj_fzSrjJQewNQhHI49ddvXcFplDLPxNdyYlsA_YiyM";
  const storage = new Web3Storage({ token });
  const finalFile = new File([file], file.name.replace(/\s+/g, "_"));
  const cid = await storage.put([finalFile], {});
  const url =
    "https://" + cid + ".ipfs.w3s.link/" + file.name.replace(/\s+/g, "_");
  return url;
};

async function handleUploadByAccount(event, file, blockchain) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIyMzcyMkNjMzQwOWNCMUI3MUFlNGU1MDkyODEwRjJjNjI4NkI1MGYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzI2NTE5NjIzODAsIm5hbWUiOiJjYXQifQ.fj_fzSrjJQewNQhHI49ddvXcFplDLPxNdyYlsA_YiyM";
  const storage = new Web3Storage({ token });
  const finalFile = new File([file], file.name.replace(/\s+/g, "_"));
  const cid = await storage.put([finalFile]);
  const url =
    "https://" + cid + ".ipfs.w3s.link/" + file.name.replace(/\s+/g, "_");
  const fileName = file.name.replace(/\s+/g, "_");
  const fileSize = (file.size / 1024).toFixed(0);
  const fileData = {
    fileName: fileName,
    fileSize: fileSize,
    fileUrl: url,
  };
  const transaction = await blockchain.contract.setData(
    blockchain.account[0],
    fileData.fileUrl,
    fileData.fileName,
    fileData.fileSize
  );
  await transaction.wait();
  return "success!";
}

async function handleDelete(event, index, blockchain) {
  const res = await blockchain.contract.removeData(
    blockchain.account[0],
    index
  );
  await res.wait();
}

export {
  onChangeHandler,
  onUploadHandler,
  handleUploadByAccount,
  handleDelete,
};
