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
            <button @click="showHideModal()" class="create-button">
              <i-mdi-cards-outline class="icon-color" /> Create Deal
            </button>
            <!-- <button @click="viewPods()" class="create-button">
              <i-mdi-cards-outline class="icon-color" /> PODs
            </button> -->
          </div>
        </div>
        <p>
          Create storage deals and allow Filecoin storage providers to compete
          for storage bounties. Negotiate volume discounts for entire sectors or
          multiple sectors. Mint a proof-of-deal or POD NFT for completed deals.
        </p>
      </div>
      <div class="miner-stats">
        <h3>
          Total Miners<br />
          {{ totalMiners }}
        </h3>
        <h3>
          Score<br />
          {{ topMiner.uptimeAverage }}
        </h3>
        <h3>
          Top Miner Address<br />
          {{ topMiner.address }}
        </h3>
        <h3>Free Space {{ topMiner.freeSpace }}</h3>
        <h3>Price {{ topMiner.price / 100000000000000 }}</h3>
      </div>
      <div class="row">
        <DealsList @onChecked="onSelectedChecked" />
        <DealsModalPopup
          :showModal="showModal"
          :selectedFilePIDS="selectedFilePIDS"
          @closeModal="showHideModal()"
          @saveModal="createDeal()"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, provide, onMounted } from "vue";
import { Notyf } from "notyf";

/* Import our Pinia Store */
import { storeToRefs } from "pinia";
import { useStore } from "../store";

/* Import our Services and APIs */
import filrepApi from "../services/filrepApi.js";

/* Components */
import DealsList from "../components/DealsComponents/DealsList.vue";
import DealsModalPopup from "../components/modals/DealsModalPopup.vue";

const store = useStore();
const { account, deal, deals } = storeToRefs(store);

console.log("account", account.value);
console.log("deal", deal.value);
console.log("deals", deals.value);

const miners = ref([]);
const totalMiners = ref({});
const topMiner = ref({});

const offset = ref(0); // Number of miners to be skipped. Example: 0
const limit = ref(3); // The length of response Example: 10
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

/* Option to order miners. Valid: "asc", "desc" */
const order = ref("desc");
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

const showModal = ref(false);
const selectedFilePIDS = ref([]);

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

// const placeBid = () => {
//   console.log("Place Bid Clicked");
//   NotfyProvider.success("Place Bid Clicked");
//   // NotfyProvider.success(`Collection created ${newCollection.title}`);
// };

// const viewPods = () => {
//   console.log("View PODS Clicked");
//   NotfyProvider.success("View PODS Clicked");
//   // NotfyProvider.success(`Collection created ${newCollection.title}`);
// };

const getMiners = async () => {
  /* Load Filerep API for Filecoin */
  const filrep = new filrepApi();

  /* Get Miners Details */
  miners.value = await filrep.getMiners(
    offset.value,
    limit.value,
    sortBy.value,
    order.value,
    search.value,
    region.value
  );

  console.log("Miners", miners.value.miners);
  console.log("Pagination: ", miners.value.pagination);

  totalMiners.value = miners.value.pagination.total;
  topMiner.value = miners.value.miners[0];
};

/* Update Deals Checkbox with PID */
const onSelectedChecked = ($event) => {
  console.log("$event.target.value", $event.target.value);
  let pid = $event.target.value;
  console.log("pid", pid);
  console.log("selectedFilePIDS.value", selectedFilePIDS.value);
  selectedFilePIDS.value.push(...[pid]);
  console.log("selectedFilePIDS.value", selectedFilePIDS.value);
};

const showHideModal = () => {
  showModal.value = !showModal.value;
};

const createDeal = () => {
  console.log("Create Deal Clicked");

  // DEV NOTE: Need to add a form for this still
  // let newCollection = {
  //   tag: tag.value,
  //   title: title.value,
  //   description: description.value,
  //   PIDS: selectedFilePIDS.value,
  // };
  console.log("deal", deal.value);
  store.addDeals(deal.value);
  console.log("deals", deals.value);
  showModal.value = false;
  NotfyProvider.success(`${deal.title} deal created!`);
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
      margin-bottom: 20px;

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

    p {
      font-size: 14px;
      color: $haus-blue;
      line-height: 16px;
      margin-bottom: 20px;
      font-family: inter, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
    }

    .miner-stats {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 20px;

      @include breakpoint($break-ssm) {
        width: 100%;
        flex-direction: column;
        align-content: center;
        justify-content: center;
      }

      border-top: 1px solid $haus-blue;
      border-bottom: 1px solid $haus-blue;
      padding: 10px 20px;
      h3 {
        width: 100%;
        color: $haus-blue;
        font-size: 14px;
        margin: 0;
        text-align: center;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
      }
    }
  }
}
</style>
