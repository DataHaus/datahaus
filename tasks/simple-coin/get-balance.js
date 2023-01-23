task(
  "get-balance",
  "Calls the Data coin Contract to read the amount of DataCoins owned by the account."
)
  .addParam("contract", "The address the DataCoin contract")
  .addParam("account", "The address of the account you want the balance for")
  .setAction(async (taskArgs) => {
      const contractAddr = taskArgs.contract
      const account = taskArgs.account
      const networkId = network.name
      console.log("Reading DataCoin owned by", account, " on network ", networkId)
      const DataCoin = await ethers.getContractFactory("DataCoin")

      // Get signer information
      const accounts = await ethers.getSigners()
      const signer = accounts[0]

      const DataCoinContract = new ethers.Contract(contractAddr, DataCoin.interface, signer)
      let result = BigInt(await DataCoinContract.getBalance(account)).toString()
      console.log("Data is: ", result)
      let mintedToken = await DataCoinContract.getMintedTokenBalance()
      console.log(`Total amount of Minted tokens is ${mintedToken}`)
  })

module.exports = {}
