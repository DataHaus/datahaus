import { defineStore } from "pinia";

/* Import services and helpers */
import Storage from "../services/storage";

/* Setup Offline Storage */
const db = new Storage("app");
db.read();
db.data ||= {
  version: "0.0.1",
  results: [],
};

/* LFG */
export const useStore = defineStore({
  id: "store",
  state() {
    return {
      account: null,
      loading: false,
      minting: false,
      files: [],
      results: db.data.results,
    };
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isMinting(state) {
      return state.minting;
    },
    getAccount(state) {
      return state.account;
    },
    getResults(state) {
      return state.results;
    },
  },
  actions: {
    setLoading(value) {
      this.loading = value;
    },
    setMinting(value) {
      this.minting = value;
    },
    setAccount(account) {
      this.account = account;
    },
    /* IPFS Uploader */
    resetFiles() {
      this.files = [];
    },
    addFiles(...files) {
      this.files.push(...files);
    },
    addResults(...files) {
      this.results.push(...files);
      this.results = this.results.filter(function (cid) {
        return !!cid;
      });
      db.data.results = [...this.results];
      db.write();
    },
    /**
     * Update Shorten Link for File
     * @param {String} cid
     * @param {String} link
     */
    updateShortenLink(cid, link) {
      this.results = this.results.map((result) => {
        if (result.cid === cid) {
          return { ...result, shorten: link };
        }
        return result;
      });
      db.data.results = [...this.results];
      db.write();
    },
  },
});
