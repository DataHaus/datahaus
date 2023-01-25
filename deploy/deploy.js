require("hardhat-deploy")
require("hardhat-deploy-ethers")

const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))
const { networkConfig } = require("../helper-hardhat-config")

const DEPLOYER_PRIVATE_KEY = network.config.accounts[0]

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))
    return new Uint8Array(bytes)
}

async function callRpc(method, params) {
    var options = {
        method: "POST",
        url: "https://api.hyperspace.node.glif.io/rpc/v0",
        // url: "http://localhost:1234/rpc/v0",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
        }),
    }
    const res = await request(options)
    return JSON.parse(res.body).result
}

const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    
    // Wraps Hardhat's deploy, logging errors to console.
    const deployLogError = async (title, obj) => {
        let ret;
        try {
            ret = await deploy(title, obj);
        } catch (error) {
            console.log(error.toString())
            process.exit(1)
        }
        return ret;
    }

    console.log("Wallet Ethereum Address:", deployer.address)
    const chainId = network.config.chainId
    // const tokenToBeMinted = networkConfig[chainId]["tokenToBeMinted"]

    console.log("Deploying DataCoin at ", deployer.address)
    await deployLogError("DataCoin", {
        from: deployer.address,
        // args: [tokenToBeMinted],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("Deploying DataNFT...")
    await deployLogError("DataNFT", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("Deploying DataHausDeals...")
    await deployLogError("DataHausDeals", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("Deploying DealClient...")
    await deployLogError("DealClient", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("Deploying DealRewarder...")
    await deployLogError("DealRewarder", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })
    
    console.log("Deploying CBORParse...")
    await deployLogError("CBORParse", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("deploying MockMinerAPI...")
    await deployLogError("MockMinerAPI", {
        from: deployer.address,
        args: [0x0000001],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })

    console.log("deploying MockMarketAPI...")
    await deployLogError("MockMarketAPI", {
        from: deployer.address,
        args: [],
        // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
        maxPriorityFeePerGas: priorityFee,
        log: true,
    })
}

