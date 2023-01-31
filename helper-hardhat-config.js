const { ethers } = require("hardhat")

const networkConfig = {
    3141: {
        name: "hyperspace",
        tokenToBeMinted: 1000000000,
    },
}

// const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    // developmentChains,
}
