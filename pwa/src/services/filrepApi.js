import axios from "axios";
import { useStore } from "../store";

export default class filrepApi {
  constructor() {
    this.endpoint = new URL("https://api.filrep.io/api/v1/");
  }

  /**
   * Get Miners Info
   * @param {String} offset - Number of miners to be skipped. Example: 0
   * @param {String} limit - The length of response Example: 10
   * @param {String} sortBy - Sorting option. Valid: "uptime", "rawPower", "qualityAdjPower", "freeSpace", "score", "averageStorageDealsPrice", "noPenalties", "dataStored"
   * @param {String} order - Option to order miners. Valid: "asc", "desc"
   * @param {String} search
   * @param {String} region
   * @returns {Promise<String|Error>}
   */
  async getMiners(offset, limit, sortBy, order, search, region) {
    const options = {
      method: "GET",
      url: this.endpoint + `miners`,
      params: {
        offset: offset,
        limit: limit,
        sortBy: sortBy,
        order: order,
        search: search,
        region: region,
      },
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + beryxAPIKEY,
      },
    };

    const results = await axios
      .request(options)
      .then(function (response) {
        console.log("response.data", response.data);
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        const store = useStore();
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          store.setErrorCode(error.response.data.error.code);
          store.setErrorStatus(error.response.status);
          store.setErrorMessage(error.response.data.error.message);
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

    // Responses
    // 200 Successful
    // miners
    // Results of your query returned as an array
    // address
    // string
    // The address of the miner. Example: f01001
    // status
    // boolean
    // Indicates the response for the latest query ask request. Example: true
    // uptimeAverage
    // number
    // Miner uptime score
    // price
    // string (attoFIL)
    // The latest price requested by miner. Example: 50000000000
    // rawPower
    // string (bytes)
    // The latest raw power value from miner. Example: 34000000
    // qualityAdjPower
    // string (bytes)
    // The latest quality adj power value from miner. Example: 34000000
    // isoCode
    // string
    // The ISO code of miner's country. Example: ES
    // city
    // string
    // The city where miner is located. Example: Barcelona
    // region
    // string
    // The region where miner is located. Example: Europe
    // freeSpace
    // string (bytes)
    // Miner's available free space. Example: 34000000
    // storageDeals.total
    // number
    // The total number of miner's storage deals. Example: 100
    // storageDeals.noPenalties
    // number
    // The number of miner's successful storage deals. Example: 80
    // storageDeals.successRate
    // number
    // The ratio of successful storage deals to failed ones. Example: 0.8
    // storageDeals.averagePrice
    // string (attoFIL)
    // The average price requested by miner for storage deals. Example: 1000000
    // storageDeals.dataStored
    // string (bytes)
    // The amount of data stored by the miner from the beginning. Example: 10000000000
    // storageDeals.slashed
    // number
    // A number representing for how many times the miner was slashed. Example: 1
    // scores.total
    // number
    // Miner's overall score. Example: 95
    // scores.uptime
    // number
    // Miner uptime score. Example: 30
    // scores.storageDeals
    // number
    // Miner storage deals score. Example: 35
    // scores.committedSectorsProofs
    // number
    // Miner committed sectors proofs score. Example: 30

    // pagination
    // Pagination data
    // total
    // number
    // The total number of miners. Example: 100
    // offset
    // number
    // Number of skipped miners. Example: 10
    // limit
    // number
    // The number of miners in response. Example: 10

    const miners = {
      miners: results.miners,
      pagination: results.pagination,
    };
    return miners;
  }
}
