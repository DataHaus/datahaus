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
      <div class="row">
        <div class="account-box">
          <div class="column-60">
            <div class="balance">
              BALANCE ~ {{ currency }}
              {{ balance / 1000000000000000000 }}
            </div>
            <div class="profile">
              <div class="account-address">
                FIL ADDRESS ~
                <a
                  title="Copy Address"
                  @click="copyClipboard(accountInfo.robust)"
                >
                  {{ accountInfo.robust }}
                  <i-ri-clipboard-line class="icon-color" />
                </a>
              </div>
              <div class="account-address">
                ETH ADDRESS ~
                <a title="Copy Address" @click="copyClipboard(account)">
                  {{ account }} <i-ri-clipboard-line class="icon-color"
                /></a>
              </div>
              <div class="account-address">
                ACTOR TYPE ~
                <a
                  title="Copy Actor Type"
                  @click="copyClipboard(accountInfo.actor_type)"
                >
                  {{ accountInfo.actor_type }}
                  <i-ri-clipboard-line class="icon-color" />
                </a>
              </div>
              <div class="account-address">
                SHORT ADDRESS ~
                <a
                  title="Copy Address"
                  @click="copyClipboard(accountInfo.short)"
                >
                  {{ accountInfo.short }}
                  <i-ri-clipboard-line class="icon-color"
                /></a>
              </div>
            </div>
          </div>
          <div class="column-40">
            <MetricBoxes />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="transactions-box">
            <div class="transactions-title">
              Latest Transactions by Fil Account : {{ accountInfo.robust }}
            </div>
            <TransactionsList />
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

/* Import our helpers */
import { copyToClipboard } from "../services/helpers";

/* Components */
import TransactionsList from "../components/DashboardComponents/TransactionsList.vue";

/* Import our Services and APIs */
import beryxApi from "../services/beryxApi.js";

const store = useStore();
const { account, balance, currency } = storeToRefs(store);

const accountInfo = ref({ robust: null, short: null, actor_type: null });
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

onMounted(async () => {
  try {
    /* Load Beryx API for Filecoin */
    const beryx = new beryxApi();

    if (account.value) {
      /* Load the Account Info */
      accountInfo.value = await beryx.getAccountInfo(account.value);

      /* Load the Account Balances */
      let accountBalance = await beryx.getAccountBalance(account.value);
      store.setBalance(accountBalance.amount);
      store.setCurrency(accountBalance.currency);
      store.setDecimals(accountBalance.decimals);

      /* Load the Account Transactions */
      transactionsByAddress.value = await beryx.getTransactionsByAddress(
        account.value,
        1
      );
      store.addTransactions(transactionsByAddress.value.transactions);
    }
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

      .column-60 {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;
      }

      .column-40 {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;
      }

      .account-box {
        width: 94%;
        padding: 2% 2% 1%;
        color: $white;
        border-radius: 10px;
        background: $haus-blue;
        background-image: $gradient;
        margin: 0 3% 0 1%;

        display: flex;
        flex-direction: row;
        align-content: flex-start;
        align-items: flex-start;
        justify-content: flex-start;

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
            a {
              position: relative;
              left: 0;
            }
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
