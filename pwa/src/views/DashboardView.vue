<template>
  <section id="content">
    <SidebarView />
    <div class="dashboard">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
      <MetricBoxes />
      <div class="row">
        <div class="account-box">
          <div class="balance">
            Balance {{ currency }}
            {{ balance / 1000000000000000000 }}
          </div>
          <div class="profile">
            <div class="account-address">
              Actor Type :<a
                title="Copy Actor Type"
                @click="copyClipboard(accountInfo.actor_type)"
              >
                {{ accountInfo.actor_type }}
                <i-ri-clipboard-line class="icon-color" />
              </a>
            </div>
            <div class="account-address">
              Short Address :
              <a title="Copy Address" @click="copyClipboard(accountInfo.short)">
                {{ accountInfo.short }} <i-ri-clipboard-line class="icon-color"
              /></a>
            </div>
            <div class="account-address">
              Filecoin Address :
              <a
                title="Copy Address"
                @click="copyClipboard(accountInfo.robust)"
              >
                {{ accountInfo.robust }}
                <i-ri-clipboard-line class="icon-color" />
              </a>
            </div>
            <div class="account-address">
              ETH Address :
              <a title="Copy Address" @click="copyClipboard(account)">
                {{ account }} <i-ri-clipboard-line class="icon-color"
              /></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="transactions-box">
            <div class="transactions-title">
              Latest Transactions by Account : {{ account }}
            </div>
            <TransactionsList />
            <!-- <div class="transactions-list">
              <template
                v-for="transaction in transactionsByAddress.transactions"
                :key="transaction.name"
              >
                <div class="transaction-card">
                  <div class="transaction-item">
                    Type : {{ transaction.tx_type }}
                  </div>
                  <div class="transaction-item">
                    Amount : {{ transaction.amount }}
                  </div>
                  <div class="transaction-item">
                    Status : {{ transaction.status }}
                  </div>
                  <div class="transaction-item">
                    Height : {{ transaction.height }}
                  </div>
                  <div class="transaction-item">
                    Timestamp : {{ transaction.tx_timestamp }}
                  </div>
                  <div class="transaction-item">
                    From : {{ transaction.tx_from }}
                  </div>
                  <div class="transaction-item">
                    To : {{ transaction.tx_to }}
                  </div>
                  <div class="transaction-item">
                    Hash : {{ transaction.tx_hash }}
                  </div>

                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    Metadata :
                  </div>
                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    CID: {{ transaction.tx_metadata.cid }}<br />
                  </div>
                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    ethAdd: {{ transaction.tx_metadata.ethAdd }}<br />
                  </div>
                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    ethHash: {{ transaction.tx_metadata.ethHash }}<br />
                  </div>
                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    ethLogs: {{ transaction.tx_metadata.ethLogs[0] }}<br />
                  </div>
                  <div
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
                  >
                    robustAdd: {{ transaction.tx_metadata.robustAdd }}
                  </div>
                </div>
              </template>
            </div> -->
          </div>
          <!-- <div class="transactions-box">
            <h3>Transactions by Hash : {{ hash }}</h3>
            <div class="transactions-list">
              <template
                v-for="transaction in transactionsByHash.transactions"
                :key="transaction.name"
              >
                <div class="transaction-card">
                  <div class="transaction-item">
                    Height : {{ transaction.height }}
                  </div>
                  <div class="transaction-item">
                    Timestamp : {{ transaction.tx_timestamp }}
                  </div>
                  <div class="transaction-item">
                    From : {{ transaction.tx_from }}
                  </div>
                  <div class="transaction-item">
                    To : {{ transaction.tx_to }}
                  </div>
                  <div class="transaction-item">
                    Hash : {{ transaction.tx_hash }}
                  </div>
                  <div class="transaction-item">
                    Amount : {{ transaction.amount }}
                  </div>
                  <div class="transaction-item">
                    Status : {{ transaction.status }}
                  </div>
                  <div class="transaction-item">
                    Type : {{ transaction.tx_type }}
                  </div>
                  <div
                    class="transaction-item"
                    v-if="transaction.tx_metadata.cid"
                  >
                    Metadata : <br /><br />
                    CID: {{ transaction.tx_metadata.cid }}<br />
                    ethAdd: {{ transaction.tx_metadata.ethAdd }}<br />
                    ethHash: {{ transaction.tx_metadata.ethHash }}<br />
                    ethLogs: {{ transaction.tx_metadata.ethLogs[0] }}<br />
                    robustAdd: {{ transaction.tx_metadata.robustAdd }}
                  </div>
                </div>
              </template>
            </div>
          </div> -->
          <!-- <div class="transactions-box">
            <h3>Transactions by Height : {{ tipsetHeight.height }}</h3>
            <div class="transactions-list">
              <template
                v-for="transaction in transactionsByHeight.transactions"
                :key="transaction.name"
              >
                <div class="transaction-card">
                  <div class="transaction-item">
                    Height : {{ transaction.height }}
                  </div>
                  <div class="transaction-item">
                    Timestamp : {{ transaction.tx_timestamp }}
                  </div>
                  <div class="transaction-item">
                    From : {{ transaction.tx_from }}
                  </div>
                  <div class="transaction-item">
                    To : {{ transaction.tx_to }}
                  </div>
                  <div class="transaction-item">
                    Hash : {{ transaction.tx_hash }}
                  </div>
                  <div class="transaction-item">
                    Amount : {{ transaction.amount }}
                  </div>
                  <div class="transaction-item">
                    Status : {{ transaction.status }}
                  </div>
                  <div class="transaction-item">
                    Type : {{ transaction.tx_type }}
                  </div>
                  <div
                    class="transaction-item"
                    v-if="transaction.tx_metadata.cid"
                  >
                    Metadata : <br /><br />
                    CID: {{ transaction.tx_metadata.cid }}<br />
                    ethAdd: {{ transaction.tx_metadata.ethAdd }}<br />
                    ethHash: {{ transaction.tx_metadata.ethHash }}<br />
                    ethLogs: {{ transaction.tx_metadata.ethLogs[0] }}<br />
                    robustAdd: {{ transaction.tx_metadata.robustAdd }}
                  </div>
                </div>
              </template>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { Notyf } from "notyf";

/* Import our helpers */
import { copyToClipboard } from "../services/helpers";

/* Components */
import TransactionsList from "../components/DashboardComponents/TransactionsList.vue";

/* Import our Services and APIs */
import beryxApi from "../services/beryxApi.js";

const store = useStore();
const { account, balance, currency, decimals, transactions } =
  storeToRefs(store);

// console.log("account", account.value);
// console.log("balance", balance.value);
// console.log("currency", currency.value);
// console.log("decimals", decimals.value);

const searchValue = ref();
const accountInfo = ref({ robust: null, short: null, actor_type: null });

// const tipsetHeight = ref({
//   height: null,
//   timestamp: null,
// });
// const hash = ref(
//   "bafy2bzacedjgclfkdcqjxwzwcl3jckojovknjceqlyw4ooe4nmajlhl7k3nx6"
// );
// const transactionsByHash = ref({});
// const transactionsByHeight = ref({});
const transactionsByAddress = ref({});

const NotfyProvider = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "bottom",
  },
  types: [
    {
      type: "loading",
      background: "orange",
      duration: 0,
      dismissible: true,
      icon: {
        className: "icon icon-loading",
        tagName: "i",
      },
    },
    {
      type: "success",
      background: "green",
      duration: 20000,
      dismissible: true,
      icon: {
        className: "icon icon-success",
        tagName: "i",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 10000,
      dismissible: true,
      icon: {
        className: "icon icon-error",
        tagName: "i",
      },
    },
  ],
});
provide("notyf", NotfyProvider);

/**
 * Copy to Clipboard function
 */
const copyClipboard = (item) => {
  copyToClipboard(item);
  NotfyProvider.success("Copied to clipboard!");
};

// async function searchFn() {
// console.log("searchValue", searchValue);

// transactionsByAddress.value = await beryx.getTransactionsByAddress(
//   account.value,
//   1
// );
// console.log("transactionsByAddress", transactionsByAddress.value);

/* Just a Test Value */
// tipsetHeight.value = await beryx.getTipset(23766);
// console.log("tipsetHeight", tipsetHeight.value);

/* Just a Test Value */
// transactionsByHash.value = await beryx.getTransactionsByHash(hash.value, 1);
// console.log("hash.value", hash.value);
// console.log("transactionsByHash", transactionsByHash.value);

/* Just a Test Value */
// transactionsByHeight.value = await beryx.getTransactionsByHeight(23766, 1);
// console.log("transactionsByHeight", transactionsByHeight.value);
// }

onMounted(async () => {
  try {
    /* Load Beryx API for Filecoin */
    const beryx = new beryxApi();
    accountInfo.value = await beryx.getAccountInfo(account.value);

    let accountBalance = await beryx.getAccountBalance(account.value);
    store.setBalance(accountBalance.amount);
    store.setCurrency(accountBalance.currency);
    store.setDecimals(accountBalance.decimals);

    transactionsByAddress.value = await beryx.getTransactionsByAddress(
      account.value,
      1
    );
    store.addTransactions(transactionsByAddress.value.transactions);
  } catch (error) {
    console.error(error);
    throw error;
  }
});
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  .dashboard {
    width: 96%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    color: $haus-blue;
    background: $white;
    padding: 1% 2% 2% 2%;
    overflow: scroll;

    .title-bar {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0;
      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0;
      }
    }
    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 15px;

      @include breakpoint($break-ssm) {
        width: 100%;
        flex-direction: column;
        align-content: center;
        justify-content: center;
      }

      .column {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;
      }

      .account-box {
        width: 92%;
        padding: 2% 3% 1% 3%;
        color: $white;
        border-radius: 10px;
        background: $haus-blue;
        background-image: $gradient;
        margin: 0 3% 0 1%;

        @include breakpoint($break-ssm) {
          width: 94%;
        }

        .balance {
          color: $white;
          font-size: 14px;
          text-align: left;
          margin-bottom: 10px;
        }

        .profile {
          width: 100%;
          text-align: left;

          img {
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 0 0 -20px;
          }
          h3 {
            color: $white;
            font-size: 13px;
            margin: 0 0 15px 0;
            text-align: left;
          }

          .account-address {
            width: 100%;
            color: $white;
            font-size: 14px;
            margin-bottom: 10px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
        }
      }
      .transactions-box {
        width: 96%;
        padding: 0;
        margin: 0 1%;

        .transactions-title {
          width: 94%;
          padding: 2% 3%;
          color: $grey-70;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          font-size: 14px;
          font-weight: normal;
          text-align: left;
          margin: 0;

          @include breakpoint($break-ssm) {
            width: 94%;
          }
        }
        .transaction-list {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .transaction-item {
          width: 100%;
          display: flex;
          flex-direction: row;
          font-size: 13px;
          font-weight: 400;
          margin-bottom: 5px;
        }
      }
      .transaction-card {
        width: 94%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 2% 3% 1% 3%;
        border-radius: 1rem;
        color: $grey-80;
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
