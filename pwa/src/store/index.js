import { defineStore } from "pinia";

/* Import services and helpers */
import Storage from "../services/storage";

/* Setup Offline Storage */
const db = new Storage("app");
db.read();
db.data ||= {
  version: "0.0.1",
  results: [],
  collections: [],
  deals: [],
};

/* LFG */
export const useStore = defineStore({
  id: "store",
  state() {
    return {
      errorCode: null,
      errorStatus: null,
      errorMessage: "",
      account: null,
      balance: 0,
      currency: 'FIL',
      decimals: 18,
      loading: false,
      minting: false,
      collection: [],
      deal: {},
      collections: [],
      collectionsResults: db.data.collections,
      deals: [],
      dealsResults: db.data.deals,
      files: [],
      results: db.data.results,
    };
  },
  getters: {
    isErrorCode(state) {
      return state.errorCode;
    },
    isErrorStatus(state) {
      return state.errorStatus;
    },
    isErrorMessage(state) {
      return state.errorMessage;
    },
    getAccount(state) {
      return state.account;
    },
    getBalance(state) {
      return state.balance;
    },
    getCurrency(state) {
      return state.currency;
    },
    getDecimals(state) {
      return state.decimals;
    },
    isLoading(state) {
      return state.loading;
    },
    isMinting(state) {
      return state.minting;
    },
    getCollection(state) {
      return state.collection;
    },
    getDeal(state) {
      return state.deal;
    },
    getCollectionsResults(state) {
      return state.collectionsResults;
    },
    getDealsResults(state) {
      return state.dealsResults;
    },
    getResults(state) {
      return state.results;
    },
  },
  actions: {
    setErrorCode(value) {
      this.errorCode = value;
    },
    setErrorStatus(value) {
      this.errorStatus = value;
    },
    setErrorMessage(value) {
      this.errorMessage = value;
    },
    setAccount(account) {
      this.account = account;
    },
    setBalance(balance) {
      this.balance = balance;
    },
    setCurrency(currency) {
      this.currency = currency;
    },
    setDecimals(decimals) {
      this.decimals = decimals;
    },
    setLoading(value) {
      this.loading = value;
    },
    setMinting(value) {
      this.minting = value;
    },
    /* Single Collection */
    setCollection(collection) {
      this.collection = collection;
    },
    /* Collections Local Storage */
    resetCollections() {
      this.collections = [];
    },
    addCollections(...collection) {
      this.collections.push(...collection);
    },
    addCollectionsResults(...collection) {
      this.collectionsResults.push(...collection);
      this.collectionsResults = this.collectionsResults.filter(function (cid) {
        return !!cid;
      });
      db.data.collectionsResults = [...this.collectionsResults];
      db.write();
    },
    /* Single Deal */
    setDeal(deal) {
      this.deal = deal;
    },
    /* Deals Local Storage */
    resetDeals() {
      this.deals = [];
    },
    addDeals(...deal) {
      this.deals.push(...deal);
    },
    addDealsResults(...deal) {
      this.dealsResults.push(...deal);
      this.dealsResults = this.dealsResults.filter(function (pid) {
        return !!pid;
      });
      db.data.dealsResults = [...this.dealsResults];
      db.write();
    },
    /* Uploaded Files Storage  */
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
