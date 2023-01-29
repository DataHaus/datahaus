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
            <button @click="createCollection()" class="back-button">
              <i-mdi-folder-multiple-outline class="icon-color" /> Collection
            </button>
            <button @click="createDeals()" class="create-button">
              <i-mdi-plus class="icon-color" /> PODS
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
        <PanelUpload />
        <PanelResult />
      </div>
    </div>
  </section>
</template>
<script>
import { ref, provide } from "vue";
import { Notyf } from "notyf";

/* Import our Pinia Store */
// import { storeToRefs } from "pinia";
import { useStore } from "../store";

/* Components */
import PanelUpload from "../components/PanelUpload.vue";
import PanelResult from "../components/PanelResult.vue";

/* LFG */
export default {
  name: "StorageView",
  components: {
    PanelUpload,
    PanelResult,
  },
  setup() {
    const store = useStore();

    // eslint-disable-next-line no-unused-vars
    // const { collection } = storeToRefs(store);

    const tag = ref("");
    const title = ref("");
    const description = ref("");
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

    const createDeals = () => {
      console.log("Create Deals Clicked");
      NotfyProvider.success("Create Deals Clicked");
      // NotfyProvider.success(`Collection created ${newCollection.title}`);
    };

    const createCollection = () => {
      console.log("Create collection Clicked");

      // DEV NOTE: Need to add a form for this still
      let newCollection = {
        tag: tag.value,
        title: title.value,
        description: description.value,
        CIDS: selectedFileCIDS.value,
      };
      console.log("newCollection", newCollection);
      store.setCollection(newCollection);
      NotfyProvider.success(`Collection created ${newCollection.title}`);
    };

    return {
      createDeals,
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
