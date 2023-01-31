require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.FILECOIN_PRIVATE_KEY
if (!PRIVATE_KEY) {
    throw new Error('Please set your private key in the .env file');
  }

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "filecoinHyperspace",
    networks: {
        hardhat: {},
        filecoinWallaby: {
            url: 'https://wallaby.node.glif.io/rpc/v0',
            chainId: 31415,
            accounts: [process.env.PRIVATE_KEY ?? 'undefined'],
            //explorer: https://wallaby.filscan.io/ and starboard
        },
        filecoinHyperspace: {
            chainId: 3141,
            url: 'https://api.hyperspace.node.glif.io/rpc/v1',
            accounts: [process.env.PRIVATE_KEY ?? 'undefined'],
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
