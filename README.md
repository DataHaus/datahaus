# 🈴 DataHaus

DataHaus is a decentralized data warehouse built on the Filecoin Virtual Machine which provides a reliable, decentralised data foundation that efficiently handles all data types.

Create storage deals / bounties for your valuable data, the Filecoin storage providers compete to win storage bounties and bring the costs down for the client. In addition you can receive discounts on entire sectors and volume discounts, where the price is further reduced for purchasing multiple sectors at once.

Receive dynamic NFTs on Storage deals that serve as Proof-of-Deal (PODS). A defi element will be incorporated for staking the NFT's to give incentives to data holders and storage providers or miners

Create subsets of core data sets for batch processing, analytics and AI use cases. DataHaus offers compute over data or COD services

The Bacalhau Project offers simple, low cost, decentralized tools and data computing that addresses deep rooted gaps in managing big data that unlocks a new collaborative ecosystem.

Please visit <https://datahaus.vercel.app/> to view the  🈴 DataHaus web3 application, feel free to connect your metamask wallet.

DataHaus utilises the Beryx API which indexes and exposes via a public API Filecoin historical and real-time data. Beryx  provides historical transactions of every account, interactions with multisig accounts, fees details and many more.
<https://docs.zondax.ch/Beryx>

ETHOnline Showcase: <https://ethglobal.com/showcase/datahaus>
Github Repo: <https://github.com/DataHaus/datahaus>

Built by Craig Moss (0xWebMoss)
Twitter: [@webmoss](https://twitter.com/webmoss)
LinkedIn: <https://www.linkedin.com/in/craig-moss-21822628/>
GitHub: <https://github.com/webmoss>

## Deployments

DataHaus uses the fevm-hardhat-kit and is deployed to the Hyperspace Testnet here:

Deployer Address
0x79bFCD02241719B49Eab19630a62F3c8429F7f6D

f4address (informational only): f410fpg742arec4m3jhvldfrquyxtzbbj673nl3bl2vq

Monday 23 Jan 2023
Wallet Ethereum Address: 0x79bFCD02241719B49Eab19630a62F3c8429F7f6D

deploying "DataCoin" (tx: 0x4685401cc7aae7882dd3235b799c6e6760550eb86ad0166197baf1a7515461bb)...: deployed at 0x293993b2552875c21fa9d9eB2Bd44057d9e62b49 with 21322816 gas

deploying "MockMinerAPI" (tx: 0xcbe3da0573e5e16830eb66b567ed578e88a4eb96d8b57307ae948af50d742d0b)...: deployed at 0x0180b9Beb44851dA42cbeA60009c16F24AA05F50 with 33628763 gas

deploying "MockMarketAPI" (tx: 0x53babbaf514e5c25bb976b1e9f8c74bbc16edced8ea3414db00034d3f640bb66)...: deployed at 0xf44e7bf473734ca528D0F4095cb988B3EB44B74a with 50614367 gas

deploying "FilecoinMarketConsumer" (tx: 0x5ce43ade6ff257c9e97359e894d49990cc79cdc276d68d304455b6198be394f2)...: deployed at 0x9c9b64A4bdDC200d4801D861C105A7800dbE1cf3 with 56966955 gas

## Cloning the FVM Hardhat Kit Repo

Open up your terminal (or command prompt) and navigate to a directory you would like to store this code on. Once there type in the following command:

```bash
git clone https://github.com/filecoin-project/fevm-hardhat-kit.git
cd fevm-hardhat-kit
npx install
```

This will clone the hardhat kit onto your computer, switch directories into the newly installed kit, and install the dependencies the kit needs to work.

## Get a Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

## Add your Private Key as an Environment Variable

Add your private key as an environment variable by running this command:

 ```bash
export PRIVATE_KEY='abcdef'
```

 \
If you use a .env file, don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

## Get the Deployer Address

Run this command:

```bash
npx hardhat get-address
```

The will show you the ethereum-style address associated with that private key and the filecoin-style f4 address. The Ethereum address can now be exclusively used for almost all FEVM tools, including the faucet.

## Fund the Deployer Address

Go to the [Hyperspace testnet faucet](https://hyperspace.yoga/#faucet), and paste in the Ethereum address from the previous step. This will send some hyperspace testnet FIL to the account.

## Deploy the Contracts

Currently there are 3 main types of contracts:

* Basic Solidity Examples: Simple contracts to show off basic solidity

* Filecoin API Examples: Contracts that demo how to use the Filecoin APIs in Solidity to access storage deals and other Filecoin specific functions.

* Filecoin Mock APIs: Contracts that mock the Filecoin APIs.

Type in the following command in the terminal to deploy all contracts:

 ```bash
npx hardhat deploy
```

This will compile all the contracts in the contracts folder and deploy them to the Hyperspace test network automatically!

Keep note of the deployed contract addresses for the next step.

## Interact with the Contracts

You can interact with contracts via hardhat tasks, found in the 'tasks' folder. For example, to interact with the DataCoin contract:

Type in the following command in the terminal:

 ```bash
npx hardhat get-balance --contract 'THE DEPLOYED CONTRACT ADDRESS HERE' --account 'YOUR ETHEREUM ADDRESS HERE'
```

The console should read that your account has 12000 DataCoin!

## Filecoin APIs

The primary advantage of the FEVM over other EVM based chains is the ability to access and program around Filecoin storage deals. This can be done in the FEVM via the [Filecoin.sol library maintained by Zondax](https://github.com/Zondax/filecoin-solidity). **Note this library is currently in BETA**. It is unaudited, and the APIs will likely be changing with time. This repo will be updated as soon as possible when a breaking change occurs.

The library is included in this kit as an NPM package and will automatically be downloaded when you perform the `npx` command (don't confuse these with the included mocks)!

Currently you will find a getter contract that calls the getter methods on the MarketAPI to get storage deal data and store that data. To do this you will need *dealIDs* which you can [find here on FilFox](https://hyperspace.filfox.info/en/deal).

As an example to store most of the data available for a deal run the store-all command with a specified dealID. Below is an example of using this command below with the a deal on Hyperspace testnet with a dealID of 707.

`npx hardhat store-all --contract "DEPLOYED FILECOIN_MARKET_CONSUMER CONTRACT ADDRESS HERE" --dealid "707"
