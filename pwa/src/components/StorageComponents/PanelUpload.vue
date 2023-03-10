<template>
  <section id="panel-upload">
    <div class="panel-upload-options">
      <h3>Storage Options</h3>
      <button
        @click="setUploadType('ipfs')"
        class="upload-option"
        :class="uploadType === 'ipfs' ? 'active' : ''"
      >
        IPFS
      </button>
      <button
        @click="setUploadType('nftStorage')"
        class="upload-option"
        :class="uploadType === 'nftStorage' ? 'active' : ''"
      >
        NFT.Storage
      </button>
      <button
        @click="setUploadType('web3Storage')"
        class="upload-option"
        :class="uploadType === 'web3Storage' ? 'active' : ''"
      >
        Web3.Storage
      </button>
      <button
        @click="setUploadType('estuary')"
        class="upload-option"
        :class="uploadType === 'estuary' ? 'active' : ''"
      >
        Estuary
      </button>
      <button
        @click="setUploadType('lighthouse')"
        class="upload-option"
        :class="uploadType === 'lighthouse' ? 'active' : ''"
      >
        LightHouse
      </button>
    </div>
    <div class="content panel-upload--content">
      <div
        class="panel-upload--dropzone"
        :class="{ active: isDragged }"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop.prevent="onDropHandler"
        @dragover.prevent
      >
        <input
          type="file"
          multiple
          ref="fileRef"
          @change="onFileChangedHandler"
        />
        <div class="dropzone-box" @click="openSelectFile()">
          <!-- Uploader Icon -->
          <i-mdi-timer-sand v-if="isUploading" class="icon-color" />
          <div v-else class="upload-logo">
            <img alt="DataHaus" src="../../assets/images/DataHaus-Icon.png" />
          </div>
          <span>Drop files or click to upload</span>
          <div class="dropzone-is-loading" :class="{ active: isUploading }">
            <div class="dropzone-loading--bar"></div>
          </div>
          <span v-show="fileCount > 0"
            >{{ fileCount - finished }} of {{ fileCount }} files uploaded</span
          >
        </div>
        <div class="dropzone-details">
          <div class="dropzone-detail">{{ result.count }} files</div>
          <div class="dropzone-detail">{{ fileSize(result.size) }}</div>
        </div>
      </div>
    </div>
    <div v-if="collections.length > 0" class="panel-collections">
      <h3>Storage Collections</h3>
      <div
        class="collection-item"
        v-for="(item, index) in collections"
        :key="index"
        @click="viewSingleCollection(item)"
      >
        <div class="collection-name">{{ item.name }}</div>
        <div class="collection-count">{{ item.cids.length }} files</div>
        <button
          type="button"
          class="collection-view"
          @click="viewSingleCollection(item)"
          aria-label="View collection"
        >
          <i-mdi-folder-outline class="icon-color" />
        </button>
      </div>
    </div>
    <IPFSModalPopup
      :showModal="showIPFSModal"
      @closeModal="showHideIPFSModal"
    />
    <NftStorageModalPopup
      :showModal="showNFTStorageModal"
      @closeModal="showHideNFTStorageModal"
    />
    <Web3StorageModalPopup
      :showModal="showWeb3StorageModal"
      @closeModal="showHideWeb3StorageModal"
    />
    <EstuaryModalPopup
      :showModal="showEstuaryModal"
      @closeModal="showHideEstuaryModal"
    />
    <LightHouseModalPopup
      :showModal="showLightHouseModal"
      :encryptData="encryptData"
      :filesharePermission="filesharePermission"
      @closeModal="showHideLightHouseModal"
      @onEncryptedCheck="encryptedCheck"
      @onFileShareCheck="fileshareCheck"
    />
  </section>
</template>
<script>
import { ref, computed, inject } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../../store";

import { uploadBlobIPFS } from "../../services/ipfs";
import { uploadBlobNFTStorage } from "../../services/nftStorage";
import { uploadBlobWeb3Storage } from "../../services/web3Storage";
import {
  uploadBufferLightHouse,
  encryptLightHouse,
} from "../../services/lighthouse";
import estuaryStorage from "../../services/estuaryStorage";

import { fileSize } from "../../services/helpers";

/* Components */
import IPFSModalPopup from "../modals/IPFSModalPopup.vue";
import NftStorageModalPopup from "../modals/NftStorageModalPopup.vue";
import Web3StorageModalPopup from "../modals/Web3StorageModalPopup.vue";
import EstuaryModalPopup from "../modals/EstuaryModalPopup.vue";
import LightHouseModalPopup from "../modals/LightHouseModalPopup.vue";

/* LFG */
export default {
  name: "PanelUpload",
  emits: ["onCollectionClick"],
  components: [
    IPFSModalPopup,
    NftStorageModalPopup,
    Web3StorageModalPopup,
    EstuaryModalPopup,
    LightHouseModalPopup,
  ],
  setup(props, { emit }) {
    const notyf = inject("notyf");
    /* Init Store */
    const store = useStore();
    const { collections } = storeToRefs(store);

    /* File Uploader */
    const fileRef = ref(null);
    const isDragged = ref(false);
    const finished = ref(0);
    const isUploading = ref(false);

    /* Set our upload service provider */
    const uploadType = ref("nftStorage");
    /* Show Service Provider info and Options Modals */
    const showIPFSModal = ref(false);
    const showNFTStorageModal = ref(false);
    const showWeb3StorageModal = ref(false);
    const showEstuaryModal = ref(false);
    const showLightHouseModal = ref(false);

    const setUploadType = (type) => {
      uploadType.value = type;
      if (uploadType.value === "ipfs") {
        showIPFSModal.value = true;
      } else if (uploadType.value === "nftStorage") {
        showNFTStorageModal.value = true;
      } else if (uploadType.value === "web3Storage") {
        showWeb3StorageModal.value = true;
      } else if (uploadType.value === "estuary") {
        showEstuaryModal.value = true;
      } else if (uploadType.value === "lighthouse") {
        showLightHouseModal.value = true;
      } else {
        showNFTStorageModal.value = true;
      }
    };

    /* Show the Modal Popup */
    const showHideIPFSModal = () => {
      showIPFSModal.value = !showIPFSModal.value;
    };
    const showHideNFTStorageModal = () => {
      showNFTStorageModal.value = !showNFTStorageModal.value;
    };
    const showHideWeb3StorageModal = () => {
      showWeb3StorageModal.value = !showWeb3StorageModal.value;
    };
    const showHideEstuaryModal = () => {
      showEstuaryModal.value = !showEstuaryModal.value;
    };
    const showHideLightHouseModal = () => {
      showLightHouseModal.value = !showLightHouseModal.value;
    };

    /**
     * Drag n Drop File Manager
     */
    const onDropHandler = ($event) => {
      if (isUploading.value) return false;
      isDragged.value = false;
      fileRef.value.files = $event.dataTransfer.files;
      onFileChangedHandler();
    };
    const openSelectFile = () => {
      if (isUploading.value) return false;
      fileRef.value.click();
    };
    const onDragEnter = () => {
      isDragged.value = true;
    };
    const onDragLeave = () => {
      isDragged.value = false;
    };

    /**
     * Create a Collection with a single File
     */
    const viewSingleCollection = (item) => {
      emit("onCollectionClick", item);
    };

    /* LighHouse Option */
    const encryptData = ref(null);
    const filesharePermission = ref(false);
    /**
     * Check to Encrypt upload with LightHouse
     */
    const encryptedCheck = () => {
      encryptData.value = !encryptData.value;
    };

    /**
     * Check to enable File Sharing
     */
    const fileshareCheck = () => {
      filesharePermission.value = !filesharePermission.value;
    };

    /**
     * File Uploader to store blob
     * @param {File} file
     */
    const uploadFileHandler = async (file) => {
      /* Currently set to NFT.Storage as default */
      let result = null;
      if (uploadType.value === "ipfs") {
        result = await uploadBlobIPFS(file);
      } else if (uploadType.value === "nftStorage") {
        result = await uploadBlobNFTStorage(file);
      } else if (uploadType.value === "web3Storage") {
        result = await uploadBlobWeb3Storage(file);
      } else if (uploadType.value === "estuary") {
        const estuary = new estuaryStorage();
        result = await estuary.uploadBlobEstuaryStorage(file);
      } else if (uploadType.value === "lighthouse") {
        /* Check if we need to encrypt Data with LightHouse */
        if (encryptData.value === true) {
          result = await encryptLightHouse(file);
        } else {
          result = await uploadBufferLightHouse(file);
        }
        console.log("result :", result);
      } else {
        result = await uploadBlobNFTStorage(file);
      }

      finished.value++;
      const { error } = result;
      if (error && error instanceof Error) notyf.error(error.message);

      return result;
    };

    const onFileChangedHandler = async () => {
      isUploading.value = true;
      store.addFiles(...fileRef.value.files);
      const files = store.files.map((file) => uploadFileHandler(file));

      try {
        let results = await Promise.all(files);
        const successfully = results.filter(({ error }) => !error);
        console.log("successfully", successfully);

        if (successfully.length > 0) {
          if (successfully.length === 1) {
            notyf.success(`${successfully.length} file uploaded!`);
          } else if (successfully.length > 1) {
            notyf.success(`${successfully.length} files uploaded!`);
          }
        }
        store.addResults(...successfully.map(({ error, data: file }) => file));
        store.resetFiles();
        fileRef.value.value = null;
      } catch (error) {
        notyf.error(`Oops! an error while processing your files.`);
        console.log(error);
        finished.value = 0;
        isUploading.value = false;
      } finally {
        finished.value = 0;
        isUploading.value = false;
      }
    };

    const fileCount = computed(() => {
      return store.files.length;
    });

    const result = computed(() => {
      return {
        count: store.results.length,
        size: store.results.reduce((sum, result) => {
          return sum + result.file.size;
        }, 0),
      };
    });

    return {
      collections,
      uploadType,
      isUploading,
      finished,
      fileRef,
      fileCount,
      result,
      isDragged,
      showIPFSModal,
      showNFTStorageModal,
      showWeb3StorageModal,
      showEstuaryModal,
      showLightHouseModal,
      encryptData,
      filesharePermission,
      fileSize,
      onDragEnter,
      onDragLeave,
      onDropHandler,
      openSelectFile,
      onFileChangedHandler,
      setUploadType,
      viewSingleCollection,
      showHideIPFSModal,
      showHideNFTStorageModal,
      showHideWeb3StorageModal,
      showHideEstuaryModal,
      showHideLightHouseModal,
      uploadBlobIPFS,
      uploadBlobNFTStorage,
      uploadBlobWeb3Storage,
      uploadBufferLightHouse,
      encryptLightHouse,
      encryptedCheck,
      fileshareCheck,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#panel-upload {
  width: 270px;
  height: 100%;
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 15px;

  @include breakpoint($break-ssm) {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .panel-upload-options {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 auto;

    h3 {
      width: 100%;
      display: block;
      font-size: 1.17em;
      margin-block-start: 0em;
      margin-block-end: 0.5em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      text-align: center;
    }

    .upload-option {
      width: 80%;
      height: 35px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      color: $haus-cyan;
      background: $haus-blue;
      border: 2px solid $haus-blue;
      margin: 0 auto 10px;
      cursor: pointer;

      &:hover {
        color: $haus-blue;
        background: $haus-cyan;
        border: 2px solid $haus-blue;
      }

      @include breakpoint($break-ssm) {
        width: 100%;
      }
    }
    .upload-option.active {
      color: $haus-blue;
      background: $haus-cyan;
      border: 2px solid $haus-blue;
    }
  }

  .panel-upload--content,
  .panel-upload--content .panel-upload--dropzone {
    width: 100%;
    height: auto;
  }

  .panel-upload--dropzone {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;

    &.active {
      > * {
        pointer-events: none;
      }

      .dropzone-box {
        background-color: $haus-blue;
        .icon-color {
          color: $grey-40;
        }
      }
    }

    input {
      display: none;
    }

    .dropzone-box {
      width: 240px;
      height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.8rem;
      border-radius: 0.5rem;
      text-align: center;
      background-color: $haus-blue;

      .upload-logo {
        margin: 10px auto;

        img {
          height: 100px;

          @include breakpoint($break-sm) {
            height: 160px;
          }
        }
      }
      .icon-color {
        color: $grey-30;
      }
      svg {
        height: 30px;
        width: 30px;
        margin-bottom: 5px;
      }
      span {
        margin: 5px 0 0 0;
        color: $white;
        font-size: 0.8rem;
      }
    }

    .dropzone-details {
      color: $white;
      position: absolute;
      display: flex;
      bottom: 1rem;
      left: 3rem;

      @include breakpoint($break-ssm) {
        left: 2rem;
      }

      .dropzone-detail {
        color: $haus-blue;
        font-size: 0.8rem;
        background-color: $grey-20;
        border-radius: 1rem;
        padding: 0.3rem 0.6rem 0.3rem;
        margin-right: 0.6rem;
      }
    }

    .dropzone-is-loading {
      opacity: 0;
      position: relative;
      height: 4px;
      display: block;
      width: 150px;
      background-color: $grey-20;
      border-radius: 2px;
      margin: 1rem 0 1rem 0;
      overflow: hidden;

      &.active {
        opacity: 1;
      }

      .dropzone-loading--bar {
        background-color: $grey-40;

        &:before {
          content: "";
          position: absolute;
          background-color: inherit;
          top: 50;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
            infinite;
        }

        &:after {
          content: "";
          position: absolute;
          background-color: inherit;
          top: 0;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
            infinite;
          animation-delay: 1.15s;
        }
      }
    }
  }

  .panel-collections {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: flex-start;
    justify-content: flex-start;

    h3 {
      width: 100%;
      display: block;
      font-size: 1.17em;
      margin-block-start: 1em;
      margin-block-end: 0.5em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      text-align: center;
    }

    .collection-item {
      width: 94%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      border-radius: 15px;
      border: 1px solid $haus-cyan;
      padding: 3% 3% 2% 3%;
      margin-bottom: 5px;
      transition: 0.6s;
      cursor: pointer;

      .collection-name {
        color: $haus-blue;
        font-size: 14px;
      }
      .collection-count {
        margin-right: 5px;
        font-size: 12px;
        color: $haus-blue;
        .files {
          color: $grey-60;
          font-size: 12px;
        }
      }

      .collection-view {
        border: none;
        color: $haus-blue;
        font-size: 16px;
        padding: 2px;
        font-weight: bold;
        background: transparent;
        cursor: pointer;
      }
    }
  }
}
@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}
</style>
