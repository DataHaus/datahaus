<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <SearchTransactions
        :search="search"
        :count="transactions.length"
        @onChanged="onSearchChanged"
      />

      <div class="content-file--items">
        <div class="content-file--item empty" v-if="transactions.length === 0">
          <span v-if="search !== ''"
            >No results found. Try another transaction search ...</span
          >
          <span v-else>List of available transactions will appear here.</span>
        </div>

        <div
          class="content-file--item"
          v-for="(item, index) in transactions"
          :key="index"
        >
          <div class="item-content">
            <div class="item-icon">
              <input
                type="checkbox"
                class="cid"
                name="tx_hash"
                :value="item.tx_hash"
                @input="$emit('onChecked', $event)"
              />
            </div>
            <div class="item-detail">
              <span class="item-detail--title" :title="item.tx_hash">{{
                item.tx_hash
              }}</span>
              <span class="item-detail--subtitle"
                >Amount : {{ item.gas_used }} • {{ item.status }}</span
              >
              <span class="item-detail--subtitle"
                >Gas Used : {{ item.gas_used }}
              </span>
              <span class="item-detail--subtitle"
                >Type : {{ item.tx_type }}</span
              >
              <span class="item-detail--subtitle"
                >Height : {{ item.height }}</span
              >
              <span class="item-detail--subtitle"
                >Timestamp : {{ item.tx_timestamp }}</span
              >
              <span class="item-detail--subtitle"
                >From : {{ item.tx_from }}</span
              >
              <span class="item-detail--subtitle">To : {{ item.tx_to }}</span>
              <span class="item-detail--subtitle"
                >Return : {{ item.tx_return }}</span
              >
              <span class="item-detail--subtitle"
                >Params : {{ item.tx_params }}</span
              >
              <!-- Transaction MetaData -->
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >Metadata :</span
              >
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >CID: {{ item.tx_metadata.cid }}</span
              >
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >ethAdd: {{ item.tx_metadata.ethAdd }}</span
              >
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >ethHash: {{ item.tx_metadata.ethHash }}</span
              >
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >ethLogs: {{ item.tx_metadata.ethLogs[0] }}</span
              >
              <span v-if="item.tx_metadata.cid" class="item-detail--subtitle"
                >robustAdd: {{ item.tx_metadata.robustAdd }}</span
              >
              <!-- END Transaction MetaData -->
            </div>
            <!-- <div class="item-icon"></div>
            <div class="item-action">
              <a title="Create COD Job" @click="createSingleCODJob(item)">
                <i-mdi-locker class="icon-color bigger" />
              </a>
            </div> -->
          </div>
          <div class="item-cid">
            <label>
              <input
                class="input-cid"
                type="text"
                readonly
                @focus="$event.target.select()"
                :value="`Txn Hash: ${item.tx_hash}`"
              />
            </label>
            <a title="Copy Txn Hash" @click="copyTxn(item)">
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
import { useStore } from "../../store";

/* Import our helpers */
import {
  fileSize,
  copyToClipboard,
  generateLink,
} from "../../services/helpers";

/* Components */
import SearchTransactions from "./SearchTransactions.vue";

/* LFG */
export default {
  name: "TransactionsList",
  components: {
    SearchTransactions,
  },
  emits: ["onChecked", "onJobClick"],
  setup(props, { emit }) {
    /* Inject Notyf */
    const notyf = inject("notyf");

    /* Init Store */
    const store = useStore();
    const search = ref("");

    /**
     * Create a COD job with a single File
     */
    const createSingleCODJob = (item) => {
      emit("onJobClick", item);
    };

    /**
     * Copy CID to Clipboard function
     */
    const copyTxn = (item) => {
      copyToClipboard(item.tx_hash);
      notyf.success("TX Hash copied to clipboard!");
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

    /* Update search value */
    const onSearchChanged = ($event) => {
      search.value = $event.target.value;
    };

    /* Filters transactions to find by search value */
    const transactions = computed(() =>
      store.transactions
        .slice()
        .reverse()
        // .filter((item) => !!item.cid)
        .filter((item) => {
          if (search.value === "") return true;

          return item.tx_hash.indexOf(search.value) >= 0;
        })
    );

    return {
      search,
      transactions,
      fileSize,
      createSingleCODJob,
      copyTxn,
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

            .item-detail--price {
              color: $haus-blue;
              font-size: 0.8rem;
              width: 220px;
              white-space: nowrap;
              margin-bottom: 0.4rem;
            }

            .item-detail--title {
              color: $haus-blue;
              font-size: 0.8rem;
              width: 220px;
              white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
              margin-bottom: 0.4rem;
            }

            .item-detail--subtitle {
              color: #a8a8a8;
              font-size: 0.7rem;
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
