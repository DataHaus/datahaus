<template>
  <section id="content">
    <SidebarView />
    <div class="storage">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Storage Solutions</h1>
          </div>
          <div class="title-actions">
            <button @click="showHideModal()" class="create-button">
              <i-mdi-folder-multiple-outline class="icon-color" /> Collection
            </button>
          </div>
        </div>
        <p>
          1. Upload your valuable data to IPFS, NFT.Storage, Web3.Storage,
          Estuary or LightHouse.<br />
          2. Manage your data storage requirements, select replication and
          encryption options.<br />
          3. Receive your Content Identifier or CID once your data is safely
          stored.<br />
          4. Create storage deals for your valuable data and receive your
          Proof-of-deal NFT.<br />
          5. Filecoin storage providers compete to win storage bounties and
          bring the costs down for you the client.<br />
          6. Visit COD for your data processing needs.
        </p>
      </div>
      <div class="row">
        <PanelUpload @onCollectionClick="viewSingleCollection" />
        <PanelResult
          @onChecked="onSelectedChecked"
          @onNewCollectionClick="createSingleCollection"
        />
        <CollectionsModalPopup
          :showModal="showModal"
          :selectedFileCIDS="selectedFileCIDS"
          @closeModal="showHideModal"
          @saveModal="createCollection"
        />
        <ViewCollectionModalPopup
          :showViewModal="showViewModal"
          :collection="selectedCollection"
          @closeViewModal="showHideViewModal"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { ref, provide } from "vue";
import { Notyf } from "notyf";

/* Import our Pinia Store */
import { storeToRefs } from "pinia";
import { useStore } from "../store";

/* Components */
import PanelUpload from "../components/PanelUpload.vue";
import PanelResult from "../components/PanelResult.vue";
import CollectionsModalPopup from "../components/modals/CollectionsModalPopup.vue";
import ViewCollectionModalPopup from "../components/modals/ViewCollectionModalPopup.vue";

/* LFG */
export default {
  name: "StorageView",
  components: {
    PanelUpload,
    PanelResult,
    CollectionsModalPopup,
    ViewCollectionModalPopup,
  },
  setup() {
    const store = useStore();
    const { collection } = storeToRefs(store);

    const showModal = ref(false);
    const showViewModal = ref(false);
    const selectedCollection = ref({});
    const selectedFileCIDS = ref([]);

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

    /* Show the Modal Popup */
    const showHideModal = () => {
      showModal.value = !showModal.value;
    };

    /* Show the View Collection Modal Popup */
    const showHideViewModal = () => {
      showViewModal.value = !showViewModal.value;
    };

    /* Update Files Checkbox with CID */
    const onSelectedChecked = ($event) => {
      let cid = $event.target.value;
      const found = selectedFileCIDS.value.find((element) => element === cid);
      /* Check we not adding duplicates */
      if (!found) {
        selectedFileCIDS.value.push(...[cid]);
      }
    };

    /**
     * Create a Collection with a single CID
     */
    const createSingleCollection = (item) => {
      console.log("Create single collection item : ", item);
      selectedFileCIDS.value.push(...[item.cid]);
      showModal.value = true;
    };

    /**
     * View a Collection
     */
    const viewSingleCollection = (item) => {
      console.log("View a single collection : ", item);
      selectedCollection.value = item;
      // store.setCollection(item);
      showViewModal.value = true;
    };

    const createCollection = () => {
      store.addCollections(collection.value);
      /* Reset Selected CIDS */
      selectedFileCIDS.value = [];
      showModal.value = false;
      NotfyProvider.success(`${collection.value.name} collection created!`);
    };

    return {
      collection,
      showModal,
      showViewModal,
      selectedFileCIDS,
      selectedCollection,
      onSelectedChecked,
      showHideModal,
      showHideViewModal,
      createSingleCollection,
      viewSingleCollection,
      createCollection,
    };
  },
};
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

  .storage {
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
              margin: 0 10px 0 0;
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
        justify-content: flex-start;
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
    }

    .storage-option-row {
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
