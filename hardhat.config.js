require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");

require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY
const endpoint = process.env.URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: endpoint,
      accounts: [`0x${privateKey}`]
    }
    // etherscan: {
    //   apiKey: process.env.REACT_APP_ETHERSCAN_KEY
    // }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
