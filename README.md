# 🈴 DataHaus

DataHaus is a decentralised data economy, built on Filecoin, which provides a reliable web3 data foundation to efficiently handle all data types and uses cases.

Project Overview

1. Upload your valuable files and data to IPFS, NFT.Storage, Web3.Storage, Estuary for 6x data replication or LightHouse for data encyption. DataHaus offers truly decentralised storage options.
2. Create collections of big or small datasets, useful for batch processing, analytics and AI use cases. Bacalhau offers Compute Over Data or COD services.
3. Create storage deals / bounties for your valuable datasets, the Filecoin storage providers compete to win storage bounties and bring the costs down for the client.
4. Receive discounts and bid for entire sectors and volume discounts, where the price is further reduced for purchasing multiple sectors at once.
5. Receive dynamic NFTs for completed storage deals that serve as Proof-of-Deal or POD's'.
6. A defi element will be incorporated for staking the dNFT's, this offers further incentives to data holders and storage providers or miners. Our ERC-20 datacoin, will be incorporated for additional miner rewards, etc.
7. Our dashboard allows user to browse Filecoin data including latest block heights and time, get block info by tipset, transaction id and more.
8. View your account transactions and search global Filecoin transaction in a sleek user-interface.
9. Incorporate various API's like Beryx API and Filrep to utilise the FEVM to it's fullest potential as a everyday user, big or small business and storage providers or miners.

<img src="/img/flowchart.png" width="50%">

Please visit our web3 application and feel free to connect your metamask wallet, and enjoy our project entry for the Filecoin space Warp hackathon 2023.

Demo web3 App: <https://datahaus.vercel.app/>
ETHOnline Showcase: <https://ethglobal.com/showcase/datahaus-jvhhb>
Github Repo: <https://github.com/DataHaus/datahaus>

Built by Craig Moss (0xWebMoss)
Twitter: [@webmoss](https://twitter.com/webmoss)
LinkedIn: <https://www.linkedin.com/in/craig-moss-21822628/>
GitHub: <https://github.com/webmoss>

## How it's made

The DataHaus web3 application is built for the Filecoin Virtual Machine.
The web3 application uses the following technologies in it's software life cycle:

Hardhat - Hardhat takes care of all our deployments and smart contract compilation
Foundry - Foundry is a smart contract development toolchain. <https://book.getfoundry.sh/>
Solidity - Smart contracts written using Solidity
Filecoin - Filecoin is a peer-to-peer network that allows anyone to store and retrieve data on the internet <https://docs.filecoin.io/>
IPFS - A peer-to-peer hypermedia protocol
designed to preserve and grow humanity's knowledge
by making the web upgradeable, resilient, and more open. <https://ipfs.tech/>
Nft.Storage - Free decentralized storage and bandwidth for NFTs on IPFS and Filecoin. <https://nft.storage/>
Web3.Storage - Use decentralized protocols to liberate your data. <https://web3.storage/>
Estuary - A reliable way to upload public data onto Filecoin and pin it to IPFS. <https://docs.estuary.tech/>
Lighthouse API - Lighthouse allows users to store their files on the decentralized network for lifetime at a fixed price <https://www.lighthouse.storage/>
Bacalhau - Simple, low cost, compute that unlocks an open, collaborative ecosystem. <https://www.bacalhau.org/>
Beryx Filecoin API - <https://docs.zondax.ch/>
Filrep API - <https://filrep.io/api>
Spheron
Vue.js
Pinia
CSS, SASS, SCSS

## Resources

Filecoin Blueprints - Data DAO's and Perpetual Storage Solutions
<https://docs.filecoin.io/developers/smart-contracts/about/blueprints/#solution-architecture-1>

Estuary
<https://docs.filecoin.io/developers/storage-helpers/estuary/>

Lighthouse Makes Permanent Storage on Filecoin Easy and Affordable
<https://filecoin.io/blog/posts/lighthouse-makes-permanent-storage-on-filecoin-easy-and-affordable/>

### DataDAO Example - Deal Bounty Contract

<https://github.com/lotus-web3/deal-bounty-contract>
<https://github.com/lotus-web3/client-contract>

Deal Bounty Contract contains a solidity contract template that lists data bounties to claim, and pays out the bounty upon the deal proven to be made with the builtin filecoin builtin market.

Repo contains:

1. [A solidity contract template](https://github.com/lotus-web3/client-contract/blob/main/src/DealClient.sol#L15) that stores data with the filecoin builtin deal market
2. [A tiny mock market](https://github.com/lotus-web3/client-contract/blob/main/src/DealClient.sol#L7) contract for prototyping against a realistic filecoin market
3. [Low level solidity CBOR parsing functions](https://github.com/lotus-web3/client-contract/blob/main/src/CBORParse.sol#L129) of general use reading filecoin native data

With [FIP 44](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0044.md) landing in nv17 the builtin storage market actor can delegate authorization of a deal proposal to an arbitrary fvm contract.  This allows any filecoin contract to act as a client of the storage market.  This hook is enough to get a long way towards supporting data DAOs and other programmable storage projects.  While we expect more powerful builtin actors APIs to exist in the near future which will further expand the set of supported functionalities, the builtin market interface has the advantage of existing today.

![PublishStorageDeals](https://user-images.githubusercontent.com/5515260/202312700-d47d90a0-245d-4a90-afc4-f2a3a0c3960e.png)

#### The Storage Deal Flow

In the DealRewarder.sol smart contract, all deal making happens outside of the smart contact. The smart contract itself does not initiate the making of any deals itself, but incentivizes other parties to make those deals and supply the resultant deal ID back to the smart contract to verify.

Storing Data and Making Deals on Filecoin
There are many ways you can store data on Filecoin, NFT.Storage for example would return a content indentifier or CID for your uploaded file or digital asset.

#### Core Idea

A deal bounty contract consists a list of the data CIDs that it incentives to store on Filecoin. Once a storage deals is made for the listed data, the data bounty hunter can claim the data bounty by providing the deal ID. The contract will check with the Filecoin storage market to confirm whether the supplied deal ID is activated and stores the claimed data. Once validated, the deal bounty contract will pay the bounty hunter out.

On successful completion of the Storage bounty, an ERC-721 NFT will be minted containing the details of the transaction. A defi element can be attached to further incentivise the storage providers and users of the data economy.

<img src="/img/dealmaking.png" width="50%">
<img src="/img/addbounty.png" width="50%">
<img src="/img/claimdatabounty.png" width="50%">

### Deal Bounty Contract Modular Breakdown

The deal bounty contract consists of four conceptual steps:

Step   |   Who   |    What is happening  |   Why
--- | --- | --- | ---
Deploy | contract owner   | address that deployed contracts is the owner of the contract, and the individual that can call addCID  | create a contract and setting up rules to follow
AddCID | data pinners     | set up data cids that the contract will incentivize in deals      | add request for a deal in the filecoin network, "store data" function
Fund   | contract funders |  add FIL to the contract to later pay out deals        | ensure the deal actually gets stored by providing funds for bounty hunter and (indirect) storage provider
Claim  | bounty hunter    | claim the incentive to complete the cycle                    | pay back the bounty hunter for doing work for the contract

## Bacalhau

The Bacalhau Project offers simple, low cost, decentralized tools and data computing that addresses deep rooted gaps in managing big data that unlocks a new collaborative ecosystem.

## Beryx API

DataHaus utilises the Beryx API which indexes and exposes via a public API Filecoin historical and real-time data. Beryx  provides historical transactions of every account, interactions with multisig accounts, fees details and many more.
<https://docs.zondax.ch/Beryx>

## Filecoin

Filecoin Blue Prints <https://docs.filecoin.io/developers/smart-contracts/about/blueprints/#solution-architecture-1>

## Foundry

The DataHaus smart contracts are developed using Foundry<https://github.com/foundry-rs> and built on the Lotus open-source examples provided here <https://github.com/lotus-web3>

Please see lotus/client-contract and lots/deal-bounty-contract in the DataHaus root for these cloned repos which serve as examples in the DataHaus smart contracts.

## 1st Test Deployment

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
