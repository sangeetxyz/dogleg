import React from "react";
import Card from "./Card";

function Cards(props) {
  const blockchain = props.blockchain;
  const data = blockchain.data;
  return (
    <div className="flex flex-row flex-wrap justify-center mb-2 mx-2">
      {data.map((file, index) => {
        return (
          <Card
            fileSize={file[2]}
            fileName={file[1]}
            fileUrl={file[0]}
            blockchain={blockchain}
            index={index}
            key={Math.random()}
          />
        );
      })}
    </div>
  );
}

export default Cards;
