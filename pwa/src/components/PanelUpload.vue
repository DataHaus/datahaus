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
            <img alt="DataHaus" src="../assets/images/DataHaus-Icon.png" />
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
  </section>
</template>
<script>
import { ref, computed, inject } from "vue";
import { useStore } from "../store";
// import { uploadBlobIPFS } from "../services/ipfs.js";
import { uploadBlobNFTStorage } from "../services/nftStorage.js";
// import { uploadBlobWeb3Storage } from "../services/web3Storage.js";
// import { uploadBlobEstuaryStorage } from "../services/estuaryStorage.js";
// import { uploadBlobLightHouse } from "../services/lighthouse.js";

import { fileSize } from "../services/helpers";

/* LFG */
export default {
  name: "PanelUpload",
  setup() {
    const notyf = inject("notyf");
    /* Init Store */
    const store = useStore();

    /* File Uploader */
    const fileRef = ref(null);
    const isDragged = ref(false);
    const finished = ref(0);
    const isUploading = ref(false);

    const uploadType = ref("nftStorage");
    const setUploadType = (type) => {
      uploadType.value = type;
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
     * File Uploader to store blob
     * @param {File} file
     */
    const uploadFileHandler = async (file) => {
      /* Currently set to NFT.Storage */
      const result = await uploadBlobNFTStorage(file);
      finished.value++;
      const { error } = result;
      if (error && error instanceof Error) notyf.error(error.message);

      return result;
    };

    const onFileChangedHandler = async () => {
      isUploading.value = true;
      console.log("fileRef.value.files", fileRef.value.files);

      store.addFiles(...fileRef.value.files);
      const files = store.files.map((file) => uploadFileHandler(file));

      try {
        let results = await Promise.all(files);
        const successfully = results.filter(({ error }) => !error);
        console.log("successfully", successfully);

        if (successfully.length > 0) {
          notyf.success(`${successfully.length} files successfully uploaded`);
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
      uploadType,
      isUploading,
      finished,
      fileRef,
      fileCount,
      result,
      isDragged,
      fileSize,
      onDragEnter,
      onDragLeave,
      onDropHandler,
      openSelectFile,
      onFileChangedHandler,
      setUploadType,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

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
        color: $white;
        font-size: 0.8rem;
        background-color: var(--gradient-300);
        border-radius: 1rem;
        padding: 0.4rem 0.8rem;
        margin-right: 0.6rem;
      }
    }

    .dropzone-is-loading {
      opacity: 0;
      position: relative;
      height: 4px;
      display: block;
      width: 150px;
      background-color: var(--gradient-300);
      border-radius: 2px;
      margin: 1rem 0 1rem 0;
      overflow: hidden;

      &.active {
        opacity: 1;
      }

      .dropzone-loading--bar {
        background-color: var(--gradient-800);

        &:before {
          content: "";
          position: absolute;
          background-color: inherit;
          top: 0;
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
