<template>
  <section id="content">
    <SidebarView />
    <div class="dashboard">
      <h1>Dashboard</h1>
      <p>
        Create storage deals for your valuable data, Filecoin storage providers
        compete to win storage bounties and bring the costs down for you the
        client.
      </p>
      <div class="row">
        <div class="column">
          <div class="metric-box">
            <h4>Account Info</h4>
            <p>
              {{ accountInfo.actor_type }}<br />
              {{ accountInfo.short }}<br />
              {{ accountInfo.robust }}
            </p>
          </div>
          <div class="metric-box">
            <h4>Tipset Latest</h4>
            <p>
              {{ tipsetLatest.height }}<br />
              {{ tipsetLatest.timestamp }}
            </p>
          </div>
          <div class="metric-box">
            <h4>Tipset Height</h4>
            <p>
              {{ tipsetHeight.height }}<br />
              {{ tipsetHeight.timestamp }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="metric-box">
            <h4>Transactions by Hash</h4>
            <p>{{ hash }}</p>
            <p>{{ transactionsByHash.transactions }}</p>
          </div>
          <div class="metric-box">
            <h4>Transactions by Height</h4>
            <p>{{ tipsetHeight }}</p>
            <p>{{ transactionsByHeight.transactions }}</p>
          </div>
          <div class="metric-box">
            <h4>Transactions by Address</h4>
            <p>{{ account }}</p>
            <p>{{ transactionsByAddress.transactions }}</p>
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
  console.log("accountInfo", accountInfo.value);

  tipsetLatest.value = await beryx.getTipsetLatest();
  console.log("tipsetLatest", tipsetLatest.value);

  tipsetHeight.value = await beryx.getTipset(23766);
  console.log("tipsetHeight", tipsetHeight.value);

  transactionsByHash.value = await beryx.getTransactionsByHash(hash.value, 1);
  console.log("hash.value", hash.value);
  console.log("transactionsByHash", transactionsByHash.value);

  transactionsByHeight.value = await beryx.getTransactionsByHeight(23766, 1);
  console.log("transactionsByHeight", transactionsByHeight.value);

  transactionsByAddress.value = await beryx.getTransactionsByAddress(
    account.value,
    1
  );
  console.log("transactionsByAddress", transactionsByAddress.value);
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
    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
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

        .metric-box {
          width: 27.33331%;
          min-height: 320x;
          padding: 3%;
          border-radius: 20px;

          @include breakpoint($break-ssm) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
