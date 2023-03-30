<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <SearchMiners
        :search="search"
        :count="miners.length"
        @onChanged="onSearchChanged"
      />

      <div class="content-file--items">
        <div class="content-file--item empty" v-if="miners.length === 0">
          <span v-if="search !== ''"
            >No results found. Try another miner address.</span
          >
          <span v-else>List of available miners will appear here.</span>
        </div>

        <div
          class="content-file--item"
          v-for="(miner, index) in miners"
          :key="index"
        >
          <div class="item-content">
            <div class="item-icon">
              <input
                type="checkbox"
                class="cid"
                name="minerAddress"
                :value="miner.address"
                @input="$emit('onChecked', $event)"
              />
            </div>
            <div class="item-detail">
              <!-- {{ miner }} -->
              <span
                class="item-detail--title"
                :title="miner.rank + ' ' + miner.address"
                >{{ miner.rank + " " + miner.address }}</span
              >
              <span v-if="miner.regionRank" class="item-detail--subtitle"
                >Region Rank : {{ miner.regionRank }}</span
              >
              <span v-if="miner.isoCode" class="item-detail--subtitle"
                >Country : {{ miner.isoCode }} - {{ miner.region }}</span
              >
              <span v-if="miner.reachability" class="item-detail--subtitle"
                >Online Reachability : {{ miner.reachability }}</span
              >
              <!-- <span class="item-detail--subtitle"
                >{{ fileSize(miner.file.size) }} • {{ miner.file.type }}</span
              > -->
              <span v-if="miner.rawPower" class="item-detail--subtitle"
                >Total Raw Power : {{ miner.rawPower }}PiB</span
              >
              <span v-if="miner.qualityAdjPower" class="item-detail--subtitle"
                >Total Quality Adjusted Power :
                {{ miner.qualityAdjPower }}PiB</span
              >
              <span v-if="miner.verifiedPrice" class="item-detail--subtitle"
                >Last Price For Verified Deals : {{ miner.verifiedPrice }}</span
              >
              <span v-if="miner.verifiedPrice" class="item-detail--subtitle"
                >Last Price For Non Verified Deals :
                {{ miner.verifiedPrice }}</span
              >
              <span v-if="miner.freeSpace" class="item-detail--subtitle"
                >Committed capacity : {{ miner.freeSpace }}</span
              >
              <span v-if="miner.price" class="item-detail--subtitle"
                >Deal Success Predictors : {{ miner.price }}</span
              >
              <span v-if="miner.score" class="item-detail--subtitle"
                >Reputation Score : {{ miner.score }}</span
              >
              <span v-if="miner.minPieceSize" class="item-detail--subtitle"
                >Min Piece Size : {{ miner.minPieceSize }}</span
              >
              <span v-if="miner.maxPieceSize" class="item-detail--subtitle"
                >Max Piece Size : {{ miner.maxPieceSize }}</span
              >
              <span v-if="miner.creditScore" class="item-detail--subtitle"
                >Credit Score : {{ miner.creditScore }}</span
              >
              <span
                v-if="miner.scores && miner.scores.total"
                class="item-detail--subtitle"
                >Scores Total : {{ miner.scores.total }}</span
              >
              <span
                v-if="miner.scores && miner.scores.uptime"
                class="item-detail--subtitle"
                >Scores Uptime : {{ miner.scores.uptime }}</span
              >
              <span
                v-if="miner.scores && miner.scores.storageDeals"
                class="item-detail--subtitle"
                >Scores Storage Deals : {{ miner.scores.storageDeals }}</span
              >
              <span
                v-if="miner.scores && miner.scores.committedSectorsProofs"
                class="item-detail--subtitle"
                >Scores Committed Sectors Proofs :
                {{ miner.scores.committedSectorsProofs }}</span
              >
              <span v-if="miner.freeSpace" class="item-detail--subtitle"
                >Free Space : {{ miner.freeSpace }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.averagePrice"
                class="item-detail--subtitle"
                >Average storage deal price :
                {{ miner.storageDeals.averagePrice }} Fil</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.total"
                class="item-detail--subtitle"
                >Storage Deals Total : {{ miner.storageDeals.total }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.noPenalties"
                class="item-detail--subtitle"
                >Storage Deals No Penalties :
                {{ miner.storageDeals.noPenalties }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.successRate"
                class="item-detail--subtitle"
                >Storage Deals Success Rate :
                {{ miner.storageDeals.successRate }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.averagePrice"
                class="item-detail--subtitle"
                >Storage Deals Average Price :
                {{ miner.storageDeals.averagePrice }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.dataStored"
                class="item-detail--subtitle"
                >Storage Deals Data Stored :
                {{ miner.storageDeals.dataStored }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.slashed"
                class="item-detail--subtitle"
                >Storage Deals Slashed : {{ miner.storageDeals.slashed }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.terminated"
                class="item-detail--subtitle"
                >Storage Deals Terminated :
                {{ miner.storageDeals.terminated }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.faultTerminated"
                class="item-detail--subtitle"
                >Storage Deals Fault Terminated :
                {{ miner.storageDeals.faultTerminated }}</span
              >
              <span
                v-if="miner.storageDeals && miner.storageDeals.recent30days"
                class="item-detail--subtitle"
                >Storage Deals Recent 30 Days :
                {{ miner.storageDeals.recent30days }}</span
              >
              <span
                v-if="
                  miner.goldenPath && miner.goldenPath.storageDealSuccessRate
                "
                class="item-detail--subtitle"
                >Golden Path Storage Deal Success Rate :
                {{ miner.goldenPath.storageDealSuccessRate }}</span
              >
              <span
                v-if="
                  miner.goldenPath && miner.goldenPath.retrievalDealSuccessRate
                "
                class="item-detail--subtitle"
                >Golden Path Retrieval Deal Success Rate :
                {{ miner.goldenPath.retrievalDealSuccessRate }}</span
              >
              <span
                v-if="miner.goldenPath && miner.goldenPath.fastRetrieval"
                class="item-detail--subtitle"
                >Golden Path Fast Retrieval :
                {{ miner.goldenPath.fastRetrieval }}</span
              >
              <span
                v-if="miner.goldenPath && miner.goldenPath.verifiedDealNoPrice"
                class="item-detail--subtitle"
                >Golden Path Verified Deal No Price :
                {{ miner.goldenPath.verifiedDealNoPrice }}</span
              >
              <span
                v-if="miner.goldenPath && miner.goldenPath.faultsBelowThreshold"
                class="item-detail--subtitle"
                >Golden Path F aults Below Threshold :
                {{ miner.goldenPath.faultsBelowThreshold }}</span
              >
              <span
                v-if="miner.energy && miner.energy.recs"
                class="item-detail--subtitle"
                >Energy Recs : {{ miner.energy.recs }}</span
              >
              <span
                v-if="miner.energy && miner.energy.pageUrl"
                class="item-detail--subtitle"
                >Energy Page Url : {{ miner.energy.pageUrl }}</span
              >
            </div>
            <div class="item-icon"></div>
            <div class="item-action">
              <a title="Place Bid" @click="placeSingleDealBid(item)">
                <i-mdi-coin class="icon-color" />
              </a>
            </div>
          </div>
          <div class="item-cid">
            <label>
              <input
                class="input-cid"
                type="text"
                readonly
                @focus="$event.target.select()"
                :value="`Miner Address: ${miner.address}`"
              />
            </label>
            <a title="Copy Miner Address" @click="copyMinerAddress(miner)">
              <i-ri-clipboard-line class="icon-color" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed, inject, onMounted } from "vue";
/* Import our Pinia Store */
import { useStore } from "../../store";
/* Import our helpers */
import {
  fileSize,
  copyToClipboard,
  generateLink,
} from "../../services/helpers";
/* Import our Services and APIs */
import filrepApi from "../../services/filrepApi";
/* Components */
import SearchMiners from "./SearchMiners.vue";
/* LFG */
export default {
  name: "MinersList",
  components: {
    SearchMiners,
  },
  setup() {
    /* Inject Notyf */
    const notyf = inject("notyf");

    /* Init Store */
    const store = useStore();
    const search = ref("");
    const pagination = ref(null);

    // const miners = ref([]);
    // const offset = ref(); // Number of miners to be skipped. Example: 0
    // const limit = ref(); // The length of response Example: 10
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

    // const sortBy = ref("score");
    // const order = ref("desc"); // Option to order miners. Valid: "asc", "desc"
    const orderOptions = ref(["asc", "desc"]); // Option to order miners. Valid: "asc", "desc"
    console.log("orderOptions", orderOptions.value);

    // const search = ref(""); // Keyword to search miners by. Example: "f0010"
    // const region = ref();
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

    /**
     * Create a Deal with single CID
     */
    const placeSingleDealBid = (item) => {
      const cid = item.cid;
      console.log("Create SingleDeal CID", cid);
      notyf.success(`Storage deal processing ${item.cid}`);
    };

    /**
     * Copy to Clipboard function
     */
    const copyMinerAddress = (miner) => {
      copyToClipboard(miner.address);
      notyf.success("Miner address copied to clipboard!");
    };

    /* Update search value */
    const onSearchChanged = ($event) => {
      search.value = $event.target.value;
    };

    /* Filters miners to find by search value */
    const miners = computed(() =>
      store.miners
        .slice()
        // .reverse()
        .filter((item) => !!item.address)
        .filter((item) => {
          if (search.value === "") return true;
          return item.address.indexOf(search.value) >= 0;
        })
    );

    const getMiners = async () => {
      /* Load Filerep API for Filecoin */
      const filrep = new filrepApi();
      /* Get Miners Details */
      const newMiners = await filrep.getMiners(
        0,
        20,
        "score",
        "desc",
        null,
        null
      );
      store.addMiners(...newMiners.miners);
      console.log("Store Miners", store.miners);

      pagination.value = newMiners.pagination;
      console.log("Pagination", pagination.value);
    };

    onMounted(async () => {
      await getMiners();
    });

    return {
      search,
      miners,
      fileSize,
      placeSingleDealBid,
      getMiners,
      copyMinerAddress,
      generateLink,
      onSearchChanged,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#panel-result {
  width: 100%;
  height: 100%;
  background: $white;

  .panel-result--content {
    width: 100%;
    height: calc(100% - 1.6rem);
    padding: 10px 0.8rem 0.8rem 0;

    .content-file--items {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.4) rgba(36, 18, 18, 0.2);
      height: calc(100% - 2.95rem);

      &::-webkit-scrollbar {
        width: 0.3rem;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 1rem;
      }

      .content-file--item {
        width: calc(100% - 1.6rem);
        padding: 0.8rem;
        margin-bottom: 0.8rem;
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.05);

        &.empty {
          font-size: 0.7rem;
          text-align: center;
          border-radius: 0.8rem;
        }

        a svg {
          cursor: pointer;
        }

        .item-content {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-start;

          .item-icon {
            padding: 0 0.5rem 0.5rem 0;
          }

          .item-detail {
            display: flex;
            flex-direction: column;
            flex: 1;

            .item-detail--title {
              color: $haus-blue;
              font-size: 0.8rem;
              width: 220px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 0.4rem;
            }

            .item-detail--subtitle {
              color: #a8a8a8;
              font-size: 0.6rem;
            }
          }

          .item-action {
            display: flex;
            align-items: center;
            padding: 0.5rem 0 0.5rem 0.5rem;

            a {
              color: $haus-blue;
              &:not(:last-child) {
                margin-right: 0.5rem;
              }
              &:hover {
                color: $haus-cyan;
              }
            }
          }
        }

        .item-cid {
          display: flex;
          align-items: center;
          margin-top: 0.7rem;
          width: 100%;

          label {
            display: flex;
            flex: 1;

            .input-cid {
              flex: 1;
              // background-color: rgba(0, 0, 0, 0.1);
              outline: none;
              border: none;
              color: $black;
              padding: 8px;
              border-radius: 0.5rem;
              font-size: 0.7rem;
            }
          }

          a {
            color: $haus-blue;
            margin-left: 0.5rem;
            &:hover {
              color: $haus-cyan;
            }
          }
        }
      }
    }
  }
}
</style>
