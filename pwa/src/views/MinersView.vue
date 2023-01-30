<template>
  <section id="content">
    <SidebarView />
    <div class="deals">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Storage Deals / Bounties</h1>
          </div>
          <div class="title-actions">
            <button @click="placeBid()" class="back-button">
              <i-mdi-coin class="icon-color" /> Place Bid
            </button>
            <button @click="viewPods()" class="create-button">
              <i-mdi-cards-outline class="icon-color" /> PODs
            </button>
          </div>
        </div>
        <p>
          1. Filecoin storage providers bid and compete to win storage deals or
          bounties.<br />
          2. Receive volume discounts for entire sectors and purchasing multiple
          sectors.<br />
          3. Receive POD NFT for completed storage deals that serve as
          Proof-of-Deal.<br />
        </p>
      </div>
      <div class="row"></div>
      <div class="row">
        {{ miners.miners }}
      </div>
      <!-- <div class="row">
        <DealsList />
      </div> -->
    </div>
  </section>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { Notyf } from "notyf";

/* Import our Services and APIs */
import filrepApi from "../services/filrepApi";

import DealsList from "../components/DealsList.vue";

const store = useStore();
const { account, deals } = storeToRefs(store);

console.log("account", account.value);
console.log("deals", deals.value);

const miners = ref([]);
const offset = ref(); // Number of miners to be skipped. Example: 0
const limit = ref(); // The length of response Example: 10
const sortByOptions = ref([
  "uptime",
  "rawPower",
  "qualityAdjPower",
  "freeSpace",
  "score",
  "averageStorageDealsPrice",
  "noPenalties",
  "dataStored",
]);
console.log("sortByOptions", sortByOptions.value);

const sortBy = ref("score");
const order = ref("desc"); // Option to order miners. Valid: "asc", "desc"
const orderOptions = ref(["asc", "desc"]); // Option to order miners. Valid: "asc", "desc"
console.log("orderOptions", orderOptions.value);

const search = ref(""); // Keyword to search miners by. Example: "f0010"
const region = ref();
const regionOptions = ref([
  "Asia",
  "Europe",
  "Africa",
  "Oceania",
  "South America",
  "Central America",
  "North America",
]); // Option to filter miners by region. Valid: "Asia", "Europe", "Africa", "Oceania", "South America", "Central America", "North America"
console.log("regionOptions", regionOptions.value);

const pid = ref(null);
const dealRef = ref(null);
const isUploaded = ref(false);
const dealAccepted = ref(0);

console.log("pid", pid.value);
console.log("dealRef", dealRef.value);
console.log("isUploaded", isUploaded.value);
console.log("dealAccepted", dealAccepted.value);

/* LFG */
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

const placeBid = () => {
  console.log("Place Bid Clicked");
  NotfyProvider.success("Place Bid Clicked");
  // NotfyProvider.success(`Collection created ${newCollection.title}`);
};

const viewPods = () => {
  console.log("View PODS Clicked");
  NotfyProvider.success("View PODS Clicked");
  // NotfyProvider.success(`Collection created ${newCollection.title}`);
};

const getMiners = async () => {
  /* Load Filerep API for Filecoin */
  const filrep = new filrepApi();

  /* Get Miners Details */
  miners.value = await filrep.getMiners(0, 10, "score", "desc", null, null);
  console.log("miners.value", miners.value.miners);
};

onMounted(async () => {
  await getMiners();
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

  .deals {
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

        .title-actions {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          justify-content: space-between;

          .back-button {
            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;
            justify-content: center;
            color: $haus-blue;
            color: $white;
            background-color: $haus-blue;
            font-size: 14px;
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

            .icon-color {
              margin: 0 5px 0 0;
            }

            &:hover {
              color: $haus-cyan;
              border: 2px solid $haus-cyan;
            }
          }

          .create-button {
            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;
            justify-content: center;
            color: $haus-blue;
            color: $haus-blue;
            background-color: $haus-cyan;
            font-size: 14px;
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

            .icon-color {
              margin: 0 5px 0 0;
            }

            &:hover {
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
    }
  }
}
</style>
