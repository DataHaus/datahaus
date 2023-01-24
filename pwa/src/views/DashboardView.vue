<template>
  <section id="content">
    <SidebarView />
    <div class="dashboard">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Dashboard</h1>
          </div>
          <div class="title-actions">
            <button class="create-button">Create</button>
            <button class="back-button">Go Back</button>
          </div>
        </div>
        <p>
          Create storage deals for your valuable data, Filecoin storage
          providers compete to win storage bounties and bring the costs down for
          you the client.
        </p>
      </div>
      <div class="row">
        <div class="metric-box">
          <h3>Tipset Latest</h3>
          <p>
            {{ tipsetLatest.height }}<br />
            {{ tipsetLatest.timestamp }}
          </p>
        </div>
        <div class="metric-box">
          <h3>Tipset Height</h3>
          <p>
            {{ tipsetHeight.height }}<br />
            {{ tipsetHeight.timestamp }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="account-box">
          <h3>Account Info</h3>
          <p>
            Actor Type : {{ accountInfo.actor_type }}<br />
            Short : {{ accountInfo.short }}<br />
            Robust : {{ accountInfo.robust }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div class="transactions-box">
            <h4>Transactions by Account Address : {{ account }}</h4>
            <div class="transactions-list">
              <template
                v-for="transaction in transactionsByAddress.transactions"
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
                    v-if="transaction.tx_metadata.cid"
                    class="transaction-item"
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
          </div>
          <div class="transactions-box">
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
          </div>
          <div class="transactions-box">
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
          </div>
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

/* Import our Services and APIs */
import beryxApi from "../services/beryxApi.js";

const store = useStore();
const { account } = storeToRefs(store);

const accountInfo = ref({ robust: null, short: null, actor_type: null });
const tipsetLatest = ref({
  height: null,
  timestamp: null,
});
const tipsetHeight = ref({
  height: null,
  timestamp: null,
});
const hash = ref(
  "bafy2bzacedjgclfkdcqjxwzwcl3jckojovknjceqlyw4ooe4nmajlhl7k3nx6"
);
const transactionsByHash = ref({});
const transactionsByHeight = ref({});
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
  ],
});
provide("notyf", NotfyProvider);

onMounted(async () => {
  /* Load Beryx API for Filecoin */
  const beryx = new beryxApi();

  accountInfo.value = await beryx.getAccountInfo(account.value);
  // console.log("accountInfo", accountInfo.value);

  transactionsByAddress.value = await beryx.getTransactionsByAddress(
    account.value,
    1
  );
  // console.log("transactionsByAddress", transactionsByAddress.value);

  tipsetLatest.value = await beryx.getTipsetLatest();
  // console.log("tipsetLatest", tipsetLatest.value);

  /* Just a Test Value */
  tipsetHeight.value = await beryx.getTipset(23766);
  // console.log("tipsetHeight", tipsetHeight.value);

  /* Just a Test Value */
  transactionsByHash.value = await beryx.getTransactionsByHash(hash.value, 1);
  // console.log("hash.value", hash.value);
  // console.log("transactionsByHash", transactionsByHash.value);

  /* Just a Test Value */
  transactionsByHeight.value = await beryx.getTransactionsByHeight(23766, 1);
  // console.log("transactionsByHeight", transactionsByHeight.value);
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    color: $haus-blue;
    background: $white;
    padding: 20px 40px;
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

        .title-actions {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: space-between;
          .back-button {
            color: $white;
            background-color: $haus-blue;
            font-size: 15px;
            font-weight: bold;
            width: auto;
            height: 35px;
            border: 2px solid $haus-blue;
            border-radius: 30px;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 5px;
            margin-right: 10px;
            transition: 0.6s;
            cursor: pointer;

            &:hover {
              color: $haus-cyan;
              border: 2px solid $haus-cyan;
            }
          }
          .create-button {
            color: $white;
            background-color: $haus-cyan;
            font-size: 15px;
            font-weight: bold;
            width: auto;
            height: 35px;
            border: 2px solid $haus-cyan;
            border-radius: 30px;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 5px;
            margin-right: 10px;
            transition: 0.6s;
            cursor: pointer;

            &:hover {
              color: $haus-blue;
              border: 2px solid $haus-blue;
            }
          }
        }
      }
    }
    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;

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
        width: 100%;
        padding: 0 3% 0 3%;
        color: $white;
        background: $haus-blue;
        border-radius: 20px;

        @include breakpoint($break-ssm) {
          width: 94%;
        }
      }
      .metric-box {
        width: 50%;
        min-height: 320x;
        padding: 0 3% 0 3%;
        border-radius: 20px;

        @include breakpoint($break-ssm) {
          width: 94%;
        }
      }
      .transactions-box {
        width: 100%;
        padding: 0;

        .transaction-list {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .transaction-item {
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-bottom: 5px;
        }
      }
      .transaction-card {
        width: 94%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 3%;
        border: 1px solid $haus-blue;
        border-radius: 20px;
      }
    }
  }
}
</style>
