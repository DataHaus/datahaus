// import { INITIAL_WALLET_STATUS } from "@Utils/definitions/consts";

// const fetchWalletAccounts = async () => {
//   console.log("Fetching wallet accounts...");
//   await window.ethereum //use ethers?
//     .request({ method: "eth_requestAccounts" })
//     .then((accounts) => {
//       return accounts;
//     })
//     .catch((error) => {
//       if (error.code === 4001) {
//         // EIP-1193 userRejectedRequest error
//         console.log("Please connect to MetaMask.");
//       } else {
//         console.error(error);
//       }
//       // return error;
//     });
// };

// const fetchChainId = async () => {
//   console.log("Fetching chainId...");
//   await window.ethereum
//     .request({ method: "eth_chainId" })
//     .then((chainId) => {
//       return chainId;
//     })
//     .catch((error) => {
//       if (error.code === 4001) {
//         // EIP-1193 userRejectedRequest error
//         console.log("Please connect to MetaMask.");
//       } else {
//         console.error(error);
//       }
//     });
// };

//export const checkForWalletConnection = async (setUserWallet) => {
//   if (window.ethereum) {
//     console.log("Checking for Wallet Connection...");
//     await window.ethereum
//       .request({ method: "eth_accounts" })
//       .then(async (accounts) => {
//         console.log("Connected to wallet...");
//         const chainId = await fetchChainId();

//         // setUserWallet((prevState) => ({
//         //   ...prevState,
//         //   accounts,
//         //   chainId,
//         // }));
//         return true;
//       })
//       .catch((err) => {
//         console.log("Error fetching wallet", err);
//         return false;
//       });
//   } else {
//     setUserWallet(INITIAL_WALLET_STATUS);
//     return false;
//   }
// };

// export const setWalletListeners = (userWallet, setUserWallet) => {
//   console.log("Setting up wallet event listeners...");
//   if (window.ethereum) {
//     // subscribe to provider events compatible with EIP-1193 standard.
//     window.ethereum.on("accountsChanged", (accounts) => {
//       //logic to check if disconnected accounts[] is empty
//       if (accounts.length < 1) {
//         //handle the locked wallet case
//       }
//       if (userWallet.accounts[0] !== accounts[0]) {
//         //clear the ownedNFTs
//       }
//       setUserWallet((prevState) => ({
//         ...prevState,
//         accounts,
//       }));
//     });

//     // Subscribe to chainId change
//     window.ethereum.on("chainChanged", (chainId) => {
//       if (chainId === null) {
//         //handle the locked wallet case
//       }
//       setUserWallet((prevState) => ({
//         ...prevState,
//         chainId,
//       }));
//     });
//   }
// };

// export const changeWalletChain = async (newChainId) => {
//   console.log("Changing wallet chain...");
//   const provider = window.ethereum;
//   try {
//     await provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: newChainId }], //newChainId
//     });
//   } catch (error) {
//     alert(error.message);
//   }
// };

// /**
//  * Add Hyperspace Chain
//  **/
// export const addHyperspaceNetwork = async () => {
//   console.log("Adding the Hyperspace Network to Wallet");

//   if (window.ethereum) {
//     window.ethereum
//       .request({
//         method: "wallet_addEthereumChain",
//         params: [
//           {
//             chainId: "0xc45",
//             rpcUrls: [
//               "https://hyperspace.filfox.info/rpc/v0",
//               "https://filecoin-hyperspace.chainstacklabs.com/rpc/v0",
//             ],
//             chainName: "Filecoin Hyperspace",
//             nativeCurrency: {
//               name: "tFIL",
//               symbol: "tFIL",
//               decimals: 18,
//             },
//             blockExplorerUrls: [
//               "https://fvm.starboard.ventures/contracts/",
//               "https://hyperspace.filscan.io/",
//               "https://beryx.zondax.chfor",
//             ],
//           },
//         ],
//       })
//       .then((res) => {
//         console.log("added hyperspace successfully", res);
//       })
//       .catch((errEvent) => {
//         console.log("Error adding hyperspace network", err);
//       });
//   }
// };
// // type WalletNetwork = {
// //   chainId: String; //the hex number
// //   rpcUrls;
// //   chainName: String;
// //   nativeCurrency: {
// //     name: String;
// //     symbol: String;
// //     decimals: number;
// //   };
// //   blockExplorerUrls?;
// // };
// export const addWalletNetwork = async (paramsNetwork) => {
//   if (window.ethereum) {
//     window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           chainId: params.chainId,
//           rpcUrls: params.rpcUrls,
//           chainName: params.chainName,
//           nativeCurrency: params.nativeCurrency,
//           blockExplorerUrls: params.blockExplorerUrls || [],
//         },
//       ],
//     });
//   }
// };
