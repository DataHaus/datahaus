import { Beryx } from "@zondax/beryx";

const beryxAPIKEY = import.meta.env.VITE_BERYX_API_KEY;

export default class beryxApi {
  /**
   * Get Account Info
   * @param {String} accountAddress
   * @returns {Promise<Array|Error>}
   */
  async getAccountInfo(accountAddress) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const accountInfo = await client.data.getAccountInfo(accountAddress);
      console.log("accountInfo : ", accountInfo);

      return accountInfo;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

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
    return;
  }

  /**
   * Get Account Balance
   * @param {String} accountAddress
   * @returns {Promise<Array|Error>}
   */
  async getAccountBalance(accountAddress) {
    console.log("beryxAPIKEY", beryxAPIKEY);

    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const balance = await client.data.getAccountBalance(
        accountAddress.toString()
      );
      console.log("balance : ", balance);

      return balance;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
  }

  /**
   * Get Tipset Height
   * @param {Number} height
   * @returns {Promise<Array|Error>}
   */
  async getTipset(height) {
    const client = new Beryx.Filecoin({ beryxAPIKEY, network: "hyperspace" });
    try {
      const tipsetHeight = await client.data.getTipset(height);
      console.log("tipsetHeight : ", tipsetHeight);

      return tipsetHeight;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return;
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
