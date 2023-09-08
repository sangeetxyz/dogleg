import React from "react";
import Left from "./Left";
import Right from "./Right";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="">
      <div className="grid grid-cols-6">
        <Left />
        <Right />
      </div>
      
    </div>
  );
}

export default Home;
