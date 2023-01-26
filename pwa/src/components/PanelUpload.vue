<template>
  <section id="panel-upload">
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
        <div class="dropzone-box" @click="openSelectFile">
          <!-- Uploader Icon -->
          <i-mdi-timer-sand v-if="isUploading" class="icon-color" />
          <div v-else class="sponsors-logo">
            <img alt="DataHaus" src="../assets/images/DataHaus-Icon.png" />
          </div>

          <i-mdi-upload class="icon-color" />
          <!-- END Uploader Icon -->
          <span>Drop files here or click to upload</span>
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
    <div class="panel-upload-options">
      <div class="upload-option">IPFS</div>
      <div class="upload-option">NFT.Storage</div>
      <div class="upload-option">Web3.Storage</div>
      <div class="upload-option">Estuary</div>
      <div class="upload-option">LightHouse</div>
    </div>
  </section>
</template>
<script>
import { ref, computed, inject } from "vue";
import { useStore } from "../store";
import { uploadBlob } from "../services/ipfs.js";
import { fileSize } from "../services/helpers";

/* Logos */
import IPFS from "../assets/svgs/IPFS.vue";
import NFTStorage from "../assets/svgs/NFTStorage.vue";

/* LFG */
export default {
  name: "PanelUpload",
  components: {
    IPFS,
    NFTStorage,
  },
  setup() {
    const notyf = inject("notyf");
    // Init Store
    const store = useStore();
    // File Uploader
    const fileRef = ref(null);
    const isDragged = ref(false);
    const finished = ref(0);
    const isUploading = ref(false);
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
     * @param {File} file
     */
    const uploadFileHandler = async (file) => {
      const result = await uploadBlob(file);
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
          notyf.success(
            `${successfully.length} files successfully uploaded to IPFS`
          );
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
    };
  },
};
</script>

<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#panel-upload {
  width: 400px;
  height: 100%;
  padding: 20px 20px 0 0;

  @include breakpoint($break-ssm) {
    margin-top: 0;
    padding-top: 0;
  }

  .panel-upload-options {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 15px;

    .upload-option {
      width: 40%;
      height: 40px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      border: 2px solid $haus-blue;
      margin: 0 5px 10px 5px;
      cursor: pointer;

      &:hover {
        color: $haus-cyan;
        border: 2px solid $haus-cyan;
      }
    }
  }

  .panel-upload--content,
  .panel-upload--content .panel-upload--dropzone {
    height: auto;
  }

  .panel-upload--dropzone {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    overflow: hidden;

    &.active {
      > * {
        pointer-events: none;
      }

      .dropzone-box {
        background-color: rgba(0, 0, 0, 0.2);
        .icon-color {
          color: $white;
        }
      }
    }

    input {
      display: none;
    }

    .dropzone-box {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // margin-top: 15px;
      padding: 0.8rem;
      border-radius: 0.5rem;
      text-align: center;
      background-color: $haus-blue;

      .sponsors-logo {
        margin-bottom: 1rem;

        img {
          height: 100px;

          @include breakpoint($break-sm) {
            height: 160px;
          }
        }
      }

      .icon-color {
        color: $white;
      }

      svg {
        height: 48px;
        width: 48px;
        margin-bottom: 1rem;
      }

      span {
        color: $white;
        font-size: 0.8rem;
      }
    }

    .dropzone-details {
      color: $white;
      position: absolute;
      display: flex;
      bottom: 1rem;
      left: 6rem;

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
