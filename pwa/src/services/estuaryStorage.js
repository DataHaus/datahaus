// https://docs.estuary.tech/Learn/Quickstart/Upload%20Your%20First%20File

import axios from "axios";
import { useStore } from "../store";

const estuaryApiKey = import.meta.env.VITE_ESTUARY_STORAGE_API_KEY;
export default class estuaryStorage {
  constructor() {
    this.endpoint = new URL("https://api.estuary.tech");
  }

  /**
   * @param {Blob|File} blob
   * coluuid — Collection UUID
   * replication — Replication value
   * ignore-dupes — Ignore Dupes true/false
   * lazy-provide — Lazy Provide true/false
   * dir — Directory
   * Body data - File to upload
   * Body filename -  Filenam to use for upload
   * @returns {Promise<String|Error>}
   */
  async storeBlob(
    blob,
    coluuid = null,
    replication = null,
    ignoreDupes = null,
    lazyProvide = null,
    directory = null
  ) {
    let options = {
      method: "post",
      url: this.endpoint + `/content/add`,
      params: {
        coluuid: coluuid,
        replication: replication,
        "ignore-dupes": ignoreDupes,
        "lazy-provide": lazyProvide,
        dir: directory,
        Body: blob,
      },
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + estuaryApiKey,
      },
    };

    const results = await axios()
      .request(options)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const data = response.data;
        return data;
      })
      .catch(function (error) {
        console.log(error);
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

    console.log("results", result);

    // Example Output
    // "42": {
    //   "id": 36534620,
    //   "updatedAt": "2022-09-06T22:21:08.039349Z",
    //   "cid": "bafybeicgpn...uo4xloxypuwm",
    //   "name": "nature-6.mp4",
    //   "userId": 243,
    //   "description": "",
    //   "size": 83073242,
    //   "type": 0,
    //   "active": true,
    //   "offloaded": false,
    //   "replication": 6,
    //   "aggregatedIn": 0,
    //   "aggregate": false,
    //   "pinning": false,
    //   "pinMeta": "",
    //   "replace": false,
    //   "origins": "",
    //   "failed": false,
    //   "location": "SHUTTLE1f8fbb04-44c2-41a2-a8ac-d3057589dd93HANDLE",
    //   "dagSplit": false,
    //   "splitFrom": 0
    //  },

    return results;
    // const infuraSecret = import.meta.env.VITE_INFURA_API_SECRET;

    // const url = new URL("/api/v0/pin/add?stream-channels=true", this.endpoint);

    // console.log("Blob: ", blob);

    // console.log("estuaryApiKey", estuaryApiKey);
    // console.log("infuraSecret", infuraSecret);

    // if (blob.size === 0) {
    //   throw new Error("Content size is 0, make sure to provide some content");
    // }

    // const formData = new FormData();
    // formData.append("file", blob);

    // const request = await fetch(url.toString(), {
    //   method: "POST",
    //   headers: new Headers({
    //     Authorization: "Basic " + encode(estuaryApiKey + ":" + infuraSecret),
    //     "Content-Type": "application/json",
    //   }),
    //   body: formData,
    // });

    // console.log("request: ", request);
    // const result = await request.json();

    // console.log("result: ", result);

    // if (request.ok) {
    //   return result.Hash;
    // } else {
    //   throw new Error(`Error while upload into IPFS Network`);
    // }
  }
}
