<template>
  <section id="content">
    <SidebarView />
    <div class="cod">
      <div class="title-bar">
        <div class="row">
          <div class="title-name">
            <h1>Compute Over Data</h1>
          </div>
          <div class="title-actions">
            <button @click="showHideModal()" class="create-button">
              <i-mdi-locker-multiple class="icon-color" /> Run Job
            </button>
            <!-- <button @click="viewOptions()" class="create-button">
              <i-mdi-plus class="icon-color" /> Options
            </button> -->
          </div>
        </div>
        <h2><BacalhauBlue /> Bacalhau</h2>
        <p>
          Bacalhau offers simple, low cost, decentralized data computing and
          tools that address deep rooted gaps in managing data. Run all your
          batch processing and big data jobs with Bacalhau.
        </p>
      </div>
      <div class="row">
        <CollectionsList @onChecked="onSelectedChecked" />
        <CodModalPopup
          :showModal="showModal"
          :selectedFilePIDS="selectedFilePIDS"
          @closeModal="showHideModal()"
          @saveModal="createCodJob()"
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

/* Components */
import BacalhauBlue from "../assets/svgs/BacalhauBlue.vue";
import CollectionsList from "../components/CollectionsList.vue";
import CodModalPopup from "../components/CodModalPopup.vue";

const store = useStore();
const { account, cod, collection, collections } = storeToRefs(store);

console.log("account", account.value);
console.log("collection", collection.value);
console.log("collections", collections.value);

const pid = ref(null);
const collectionRef = ref(null);
const isRunning = ref(false);
const jobAccepted = ref(null);

console.log("pid", pid.value);
console.log("collectionRef", collectionRef.value);
console.log("isRunning", isRunning.value);
console.log("jobAccepted", jobAccepted.value);

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
      duration: 10000,
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

// const createJob = () => {
//   console.log("Create Job Clicked");
//   NotfyProvider.success("Create Job Clicked");
//   // NotfyProvider.success(`Collection created ${newCollection.title}`);
// };

// const viewOptions = () => {
//   console.log("View Options Clicked");
//   NotfyProvider.success("View Options Clicked");
//   // NotfyProvider.success(`Collection created ${newCollection.title}`);
// };

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

const createCodJob = () => {
  console.log("Create Deal Clicked");
  console.log("cod", cod.value);
  showModal.value = false;
  NotfyProvider.success(`${cod.value.title} started!`);
};

const getDeals = async () => {
  console.log("Get deals on mount");
};

onMounted(async () => {
  await getDeals();
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

  .cod {
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
              margin: 0 10px 0 0;
            }

            &:hover {
              border: 2px solid $haus-blue;
            }
          }
        }
      }
      h2 {
        color: $haus-blue;
        font-size: 2.25rem;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        .svg-container {
          width: 65px;
          margin: 0 10px 3px 0;
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

      h2 {
        color: $haus-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        .svg-container {
          width: 65px;
          margin: 3px 10px 0 0;
        }
      }
    }
  }
}
</style>
