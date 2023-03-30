import { defineStore } from "pinia";

/* Import services and helpers */
import Storage from "../services/storage";

/* Setup Offline Storage */
const db = new Storage("app");
db.read();
db.data ||= {
  version: "0.0.1",
  results: [],
  collectionsResults: [],
  dealsResults: [],
};

/* LFG */
export const useStore = defineStore({
  id: "store",
  state() {
    return {
      account: undefined,
      chainId: undefined,
      balance: 0,
      currency: 'FIL',
      decimals: 18,
      loading: false,
      minting: false,
      errorCode: undefined,
      errorStatus: undefined,
      errorMessage: "",
      cod: {},
      transactions: [],
      collection: [],
      collections: [],
      collectionsResults: db.data.collections,
      deal: {},
      deals: [],
      dealsResults: db.data.deals,
      miner: {},
      miners: [],
      minersResults: db.data.miners,
      files: [],
      results: db.data.results,
      
    };
  },
  getters: {
    getAccount(state) {
      return state.account;
    },
    getChainId(state) {
      return state.chainId;
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
    isErrorCode(state) {
      return state.errorCode;
    },
    isErrorStatus(state) {
      return state.errorStatus;
    },
    isErrorMessage(state) {
      return state.errorMessage;
    },
    getCollection(state) {
      return state.collection;
    },
    getDeal(state) {
      return state.deal;
    },
    getMiner(state) {
      return state.miner;
    },
    getCod(state) {
      return state.cod;
    },
    getCollectionsResults(state) {
      return state.collectionsResults;
    },
    getDealsResults(state) {
      return state.dealsResults;
    },
    getMinersResults(state) {
      return state.minersResults;
    },
    getResults(state) {
      return state.results;
    },
    getTransactions(state) {
      return state.transactions;
    },
  },
  actions: {
    setAccount(account) {
      this.account = account;
    },
    setChainId(chainId) {
      this.chainId = chainId;
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
    setErrorCode(value) {
      this.errorCode = value;
    },
    setErrorStatus(value) {
      this.errorStatus = value;
    },
    setErrorMessage(value) {
      this.errorMessage = value;
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
      console.log("this.collections", this.collections);
    },
    addCollectionsResults(...collections) {
      this.collectionsResults.push(...collections);
      this.collectionsResults = this.collectionsResults.filter(function (tag) {
        return !!tag;
      });
      console.log("this.collectionsResults", this.collectionsResults);
      db.data.collectionsResults = [...this.collectionsResults];
      db.write();
    },
    /* Single Deal */
    setDeal(deal) {
      this.deal = deal;
    },
    /* Single Miner */
    setMiner(miner) {
      this.miner = miner;
    },
    /* Single COD Job */
    setCod(cod) {
      this.cod = cod;
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
    addMiners(...miner) {
      this.miners.push(...miner);
    },
    addMinersResults(...deal) {
      this.minersResults.push(...deal);
      this.minersResults = this.minersResults.filter(function (address) {
        return !!pid;
      });
      db.data.minersResults = [...this.minersResults];
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
     /* Transaction from Beryx API  */
     resetTransactions() {
      this.transactions = [];
    },
    addTransactions(transactions) {
      this.transactions = transactions;
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
