<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <SearchCollections
        :search="search"
        :count="files.length"
        @onChanged="onSearchChanged"
      />

      <div class="content-file--items">
        <div class="content-file--item empty" v-if="files.length === 0">
          <span v-if="search !== ''"
            >No results found. Try another file name.</span
          >
          <span v-else>List of available files will appear here.</span>
        </div>

        <div
          class="content-file--item"
          v-for="(item, index) in files"
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
              <a title="Create COD Job" @click="createSingleCODJob(item)">
                <i-mdi-locker class="icon-color bigger" />
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
                :value="`CID: ${item.cid}`"
              />
            </label>
            <a title="Copy CID" @click="copyCID(item)">
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
import SearchCollections from "./SearchCollections.vue";

/* LFG */
export default {
  name: "CollectionsList",
  components: {
    SearchCollections,
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
    const copyCID = (item) => {
      copyToClipboard(item.cid);
      notyf.success("CID copied to clipboard!");
    };

    /* Update search value */
    const onSearchChanged = ($event) => {
      search.value = $event.target.value;
    };

    /* Filters files to find by search value */
    const files = computed(() =>
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
      files,
      fileSize,
      createSingleCODJob,
      copyCID,
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
