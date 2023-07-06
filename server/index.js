const express = require("express");
const axios = require("axios");
require("dotenv").config();
const { utils } = require("ethers");
const app = express();
const apikey = process.env.API_KEY;
class Block {
  constructor(timeStamp, blockReward) {
    this.timeStamp = timeStamp;
    this.blockReward = blockReward;
  }
}

const fetchData = async () => {
  try {
    const listofBlock = [];
    for (let blockNumber = 17469523; blockNumber < 17469533; blockNumber++) {
      const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${apikey}`;
      const { data } = await axios.get(apiUrl);
      const blockreword = utils.formatEther(data.result.blockReward);
      const timeStamp = data.result.timeStamp;
      const block = new Block(timeStamp, blockreword);
      listofBlock.push(block);
    }

    console.log("listofBlock", listofBlock);
  } catch (error) {}
};
{
  async () => {
    try {
     await fetchData();
      app.listen(3000, () => {
        console.log("server is running");
      });
    } catch (error) {
      console.log("error", error);
    }
  };
}
