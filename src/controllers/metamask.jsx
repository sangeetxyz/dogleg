import doogle from "../contracts/doogle.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const metamask = async () => {
  const contractAddress = "0x9c99638fa7a7b6a6f48735add0e806020840922f";
  const contractAbi = doogle.abi;
  if (window.ether) {
    
  }
  try {
    const { ethereum } = window;
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const data = await contract.getData(account[0]);

    const blockchain = {
      provider: provider,
      signer: signer,
      contract: contract,
      account: account,
      data: data,
    };

    toast.success("MetaMask connected!", {
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

    return blockchain;
  } catch (error) {
    console.log(error);
    toast.error("MetaMask not installed!", {
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
    return {
      provider: null,
      signer: null,
      contract: null,
      account: null,
      data: null,
    };
  }
};

export default metamask;
