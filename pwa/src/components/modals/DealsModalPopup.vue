<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          {{
            step === "one"
              ? "Create Deal"
              : step === "two"
              ? "Confirm Deal"
              : step === "three"
              ? "Mint POD"
              : ""
          }}
          <button
            type="button"
            class="btn-close"
            @click="closeModal()"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <section class="modal-body" id="modalDescription">
          <!-- Step One -->
          <div v-if="step === 'one'" class="form-container">
            <div class="input-row mb-10">
              <label for="name">Name*</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter a name,eg. My Storage Deal"
                v-model="form.name"
              />
            </div>
            <div class="input-row mb-10">
              <label for="tag">Tag*</label>
              <input
                required
                type="text"
                name="tag"
                placeholder="Enter a tag, eg. deal-one"
                v-model="form.tag"
              />
            </div>
            <div class="input-row mb-10">
              <label for="price">Max Price</label>
              <input
                required
                type="text"
                name="price"
                placeholder="Enter a maximum deal price"
                v-model="form.price"
              />
            </div>
            <div v-if="selectedFilePIDS.length > 0" class="input-row">
              <label for="name">Selected PIDs</label>
              <template v-for="(item, index) in selectedFilePIDS" :key="index">
                <div class="cid-hash">{{ item }}</div>
              </template>
            </div>
            <div v-else class="input-row error">
              <label for="name">No PIDs Selected</label>
              <div class="cid-hash-error">
                Please go back and select the files you want to add to the
                storage deal.
              </div>
            </div>
          </div>
          <!-- Step Two -->
          <div v-if="step === 'two'" class="form-container">
            <div class="input-row mb-10">
              <label for="verifiedPrice">Verified Price</label>
              <input
                required
                type="text"
                name="verifiedPrice"
                placeholder="Enter a verified deal price"
                v-model="form.verifiedPrice"
              />
            </div>
            <div class="input-row mb-10">
              <label for="minSize">Min Piece Size</label>
              <input
                required
                type="text"
                name="minSize"
                placeholder="Enter a minimum deal piece size, eg, 56KiB"
                v-model="form.minSize"
              />
            </div>
            <div class="input-row mb-10">
              <label for="maxSize">Max Piece Size</label>
              <input
                required
                type="text"
                name="maxSize"
                placeholder="Enter a maximum deal piece size"
                v-model="form.maxSize"
              />
            </div>
            <div v-if="selectedFilePIDS.length > 0" class="input-row">
              <label for="name">Selected PIDs</label>
              <template v-for="(item, index) in selectedFilePIDS" :key="index">
                <div class="cid-hash">{{ item }}</div>
              </template>
            </div>
            <div v-else class="input-row error">
              <label for="name">No PIDs Selected</label>
              <div class="cid-hash-error">
                Please go back and select the files you want to add to the
                storage deal.
              </div>
            </div>
          </div>
          <!-- Step Three -->
          <div v-if="step === 'three'" class="form-container">
            <div class="mint-pod">
              <p>
                Your proof-of-deal will be minted next, please mint your POD
                now.
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <button
            v-if="step === 'one'"
            type="button"
            class="btn-blue"
            @click="closeModal()"
            aria-label="Close modal"
          >
            Cancel
          </button>
          <button
            v-if="step === 'one'"
            :disabled="selectedFilePIDS.length === 0"
            type="button"
            class="btn-green"
            @click="stepTwo()"
          >
            Publish Deal
          </button>
          <button
            v-if="step === 'two'"
            type="button"
            class="btn-green"
            @click="stepThree()"
          >
            Confirm Deal
          </button>
          <button
            v-if="step === 'three'"
            type="button"
            class="btn-green"
            @click="saveModal()"
          >
            Mint POD
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
/* Import our Pinia Store */
import { useStore } from "../../store";
/* LFG */
export default {
  name: "DealsModalPopup",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedFilePIDS: {
      type: Array,
    },
  },
  data() {
    return {
      step: "one",
      form: {
        tag: "",
        title: "",
        price: null,
        verifiedPrice: 0.000005,
        minSize: "56KiB",
        maxSize: "32GB",
        PIDS: this.selectedFilePIDS,
      },
    };
  },
  emits: ["closeModal", "saveModal"],
  methods: {
    stepTwo() {
      this.step = "two";
    },
    stepThree() {
      this.step = "three";
    },
    closeModal() {
      this.step = "one";
      this.resetForm();
      this.$emit("closeModal", false);
    },
    saveModal() {
      const store = useStore();
      const { form } = this;
      store.setDeal(form);
      this.resetForm();
      this.$emit("saveModal");
    },
    resetForm() {
      this.form = {
        tag: "",
        title: "",
        price: null,
        verifiedPrice: null,
        minSize: "56KiB",
        maxSize: "32GB",
        PIDS: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 450px;
  background: $white;
  border-radius: 20px;
  padding: 10px 20px;
  box-shadow: 2px 2px 25px 6px rgba(43, 43, 43, 0.1);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
  color: $haus-blue;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0 0 10px;
  display: flex;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 0;
  .form-container {
    width: 96%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 2% 1% 0 1%;
    z-index: 999;

    .input-row {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .cid-hash {
        width: 94%;
        height: 10px;
        color: $haus-blue;
        background-color: #fdfdfd;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        letter-spacing: 1px;
        font-size: 9px;
        line-height: 12px;
        margin-bottom: 5px;
        padding: 2% 3%;
        text-align: left;
      }

      .cid-hash-error {
        width: 94%;
        height: 10px;
        color: $white;
        background-color: $haus-red;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        letter-spacing: 1px;
        font-size: 9px;
        line-height: 12px;
        margin-bottom: 5px;
        padding: 2% 3%;
        text-align: left;
      }
    }

    label {
      color: $haus-blue;
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0.1em;
      margin: 8px 0 2px 8px;
    }

    input {
      width: 94%;
      height: 30px;
      color: $haus-blue;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 2% 3%;
      text-align: left;
    }

    input::placeholder {
      color: #a8a8a8;
      letter-spacing: 1px;
    }

    input:read-only {
      color: #1a1a1a;
      border: 1px dashed #e0e0e0;
      letter-spacing: 1px;
      cursor: not-allowed;
    }

    input:focus {
      border: 1px solid $haus-cyan;
      outline: none;
    }

    textarea {
      width: 94%;
      height: 60px;
      color: $haus-blue;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 2% 3%;
      text-align: left;
      resize: none;
    }

    textarea::placeholder {
      color: #a8a8a8;
      letter-spacing: 1px;
    }

    textarea:focus {
      border: 1px solid $haus-cyan;
      outline: none;
    }

    .select-row {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;

      label.black {
        width: 100%;
        color: $haus-blue;
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.1em;
        margin: 8px 0 2px 15px;
        text-align: left;
      }
    }

    .mb-10 {
      margin-bottom: 10px;
    }
  }
}

.modal-footer {
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  color: $haus-blue;
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
}

.btn-blue {
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
  border-radius: 10px;
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

.btn-green {
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
  border-radius: 10px;
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

  &:disabled {
    background: #c6c6c6;
    border: 2px solid $grey-50;
    color: $haus-blue;
    cursor: not-allowed;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
