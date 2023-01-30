<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <SearchDeals
        :search="search"
        :count="deals.length"
        @onChanged="onSearchChanged"
      />

      <div class="content-file--items">
        <div class="content-file--item empty" v-if="deals.length === 0">
          <span v-if="search !== ''"
            >No results found. Try another deal / bounty name.</span
          >
          <span v-else
            >List of available storage deals / bounties will appear here.</span
          >
        </div>

        <div
          class="content-file--item"
          v-for="(item, index) in deals"
          :key="index"
        >
          <div class="item-content">
            <div class="item-icon">
              <input
                type="checkbox"
                class="cid"
                name="contentCID"
                :value="item.cid"
                @input="$emit('onChecked', $event)"
              />
            </div>
            <div class="item-detail">
              <span class="item-detail--title" :title="item.file.name">{{
                item.file.name
              }}</span>
              <span class="item-detail--subtitle"
                >{{ fileSize(item.file.size) }} • {{ item.file.type }}</span
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
                :value="`PID: ${item.cid}`"
              />
            </label>
            <a title="Copy PID" @click="copyPID(item)">
              <i-ri-clipboard-line class="icon-color" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed, inject } from "vue";
/* Import our Pinia Store */
import { useStore } from "../store";
/* Import our helpers */
import { fileSize, copyToClipboard, generateLink } from "../services/helpers";
/* Components */
import SearchDeals from "./SearchDeals.vue";
/* LFG */
export default {
  name: "DealsList",
  components: {
    SearchDeals,
  },
  setup() {
    /* Inject Notyf */
    const notyf = inject("notyf");
    /* Init Store */
    const store = useStore();
    const search = ref("");

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
    const copyPID = (item) => {
      const url = generateLink(item);
      copyToClipboard(url);
      notyf.success("Link copied to clipboard!");
    };
    /* Update search value */
    const onSearchChanged = ($event) => {
      search.value = $event.target.value;
    };
    /* Filters deals to find by search value */
    const deals = computed(() =>
      store.results
        .slice()
        .reverse()
        .filter((item) => !!item.cid)
        .filter((item) => {
          if (search.value === "") return true;

          return item.file.name.indexOf(search.value) >= 0;
        })
    );

    return {
      search,
      deals,
      fileSize,
      placeSingleDealBid,
      copyPID,
      generateLink,
      onSearchChanged,
    };
  },
};
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#panel-result {
  width: 100%;
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
          align-items: center;

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
