import axios from "axios";
import { useStore } from "../store";

import { Beryx } from "@zondax/beryx";

const beryxAPIKEY = import.meta.env.VITE_BERYX_API_KEY;

export default class beryxApi {
  constructor() {
    this.endpoint = new URL("https://api.zondax.ch/fil/data/v1/hyperspace");
  }

  /**
   * Get Account Info
   * @param {String} address
   * @returns {Promise<String|Error>}
   */
  async getAccountInfo(address) {
    const options = {
      method: "GET",
      url: this.endpoint + `/account/info/${address}`,
      params: {
        address: address,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {

        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const accountInfo = {
      robust: results.robust,
      short: results.short,
      actor_type: results.actor_type,
    };
    return accountInfo;
  }

  /**
   * Get Account Balance
   * @param {String} address
   * @returns {Promise<String|Error>}
   */
  async getAccountBalance(address) {
    const options = {
      method: "GET",
      url: this.endpoint + `/account/balance/${address}`,
      params: {
        address: address,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const balance = {
      amount: results.balances[0].value,
      currency: results.balances[0].currency.symbol,
      decimals: results.balances[0].currency.decimals,
    };
    return balance;
  }

  /**
   * Get Account Info
   * @param {String} accountAddress
   * @returns {Promise<Array|Error>}
   */
  // async getAccountInfo(accountAddress) {
  //   const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
  //   try {
  //     const accountInfo = await client.data.getAccountInfo(accountAddress);
  //     console.log("accountInfo : ", accountInfo);

  //     return accountInfo;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  //   return;
  // }

  /**
   * Get Account Vesting
   * @param {String} accountAddress
   * @returns {Promise<Array|Error>}
   */
  async getAccountVesting(accountAddress) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const accountVesting = await client.data.getAccountVesting(
        accountAddress
      );
      console.log("accountVesting : ", accountVesting);
      return accountVesting;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Account Transactions
   * @param {String} accountAddress
   * @returns {Promise<Array|Error>}
   */
  async getAccountTransactions(accountAddress) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const accountTransactions = await client.data.getAccountTransactions(
        accountAddress
      );
      console.log("accountTransactions : ", accountTransactions);
      return accountTransactions;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Get Tipset Height
   * @param {Number} height
   * @returns {Promise<String|Error>}
   */
  async getTipset(height) {
    const options = {
      method: "GET",
      url: this.endpoint + `/tipset/height/${height}`,
      params: {
        height: height,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const tipset = {
      height: results.height,
      timestamp: results.timestamp,
    };
    return tipset;
  }

  /**
   * Get Tipset Height
   * @param {Number} height
   * @returns {Promise<Array|Error>}
   */
  // async getTipset(height) {
  //   const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
  //   try {
  //     const tipsetHeight = await client.data.getTipset(height);
  //     console.log("tipsetHeight : ", tipsetHeight);

  //     return tipsetHeight;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  //   return;
  // }

  /**
   * Get Tipset Latest
   * @param {Number} height
   * @returns {Promise<String|Error>}
   */
  async getTipsetLatest() {
    const options = {
      method: "GET",
      url: this.endpoint + `/tipset/latest`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const tipset = {
      height: results.height,
      timestamp: results.timestamp,
    };
    return tipset;
  }

  /**
   * Get Transactions by Hash
   * @param {String} hash
   * @returns {Promise<String|Error>}
   */
  async getTransactionsByHash(hash, page) {
    const options = {
      method: "GET",
      url: this.endpoint + `/transactions/hash/${hash}`,
      params: {
        hash: hash,
        page: page,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const resp = {
      transactions: results.Transactions,      
      totalPages: results.TotalPages,
    };
    return resp;
  }

  /**
   * Get Transactions by Height
   * @param {String} height
   * @returns {Promise<String|Error>}
   */
  async getTransactionsByHeight(height, page) {
    const options = {
      method: "GET",
      url: this.endpoint + `/transactions/height/${height}`,
      params: {
        height: height,
        page: page,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const resp = {
      transactions: results.Transactions,      
      totalPages: results.TotalPages,
    };
    return resp;
  }

  /**
   * Get Transactions by Address
   * @param {String} address
   * @returns {Promise<String|Error>}
   */
  async getTransactionsByAddress(address, page) {
    const options = {
      method: "GET",
      url: this.endpoint + `/transactions/address/${address}`,
      params: {
        address: address,
        page: page,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorStatus(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("error.request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          store.setErrorCode(error.code);
          store.setErrorStatus(error.status);
          store.setErrorMessage(error.message);
        }
      });

    const resp = {
      transactions: results.Transactions,      
      totalPages: results.TotalPages,
    };
    return resp;
  }

  /**
   * Get Transactions
   * @param {Number | String} heightOrHash
   * @returns {Promise<Array|Error>}
   */
  async getTransactions(heightOrHash) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const transactions = await client.data.getTransactions(heightOrHash);
      console.log("transactions : ", transactions);

      return transactions;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Deals By Height
   * @param {Number} height
   * @returns {Promise<Array|Error>}
   */
  async getDealsByHeight(height) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const deals = await client.data.getDealsByHeight(height);
      console.log("getDealsByHeight : ", deals);

      return deals;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Deals By CID
   * @param {String} cid
   * @returns {Promise<Array|Error>}
   */
  async getDealsByCid(cid) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const deals = await client.data.getDealsByCid(cid);
      console.log("getDealsByCid : ", deals);

      return deals;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Deals By Client
   * @param {String} dealClient
   * @returns {Promise<Array|Error>}
   */
  async getDealsByClient(dealClient) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const deals = await client.data.getDealsByClient(dealClient);
      console.log("getDealsByClient : ", deals);
      return deals;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Deals By Provider
   * @param {String} client
   * @returns {Promise<Array|Error>}
   */
  async getDealsByProvider(dealProvider) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const deals = await client.data.getDealsByProvider(dealProvider);
      console.log("getDealsByProvider : ", deals);
      return deals;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Convert Transaction Hash
   * @param {String} hash
   * @param {String} destFormat 'eth' | 'fil'
   * @returns {Promise<Array|Error>}
   */
  async convertHash(hash, destFormat = "fil") {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const convertAddress = await client.tools.convertHash(hash, destFormat);
      console.log("Convert Hash : ", convertAddress);
      return convertHashResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Convert Address
   * @param {String} hash
   * @param {String} destFormat
   * @returns {Promise<Array|Error>}
   */
  async convertAddress(hash, destFormat = "fil") {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const convertAddress = await client.tools.convertAddress(
        hash,
        destFormat
      );
      console.log("Convert Address : ", convertAddress);
      return convertAddress;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }
}
