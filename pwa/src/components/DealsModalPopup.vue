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
          Create Deal
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
          <div class="form-container">
            <div class="input-row mb-10">
              <label for="name">Tag*</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a tag, eg. collection-one"
                v-model="form.tag"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a name,eg. My Collection"
                v-model="form.name"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter a short description"
                v-model="form.description"
              />
            </div>
            <div class="input-row">
              <label for="name">Piece Identifiers</label>
              <template v-for="(item, index) in selectedFilePIDS" :key="index">
                <input
                  type="text"
                  name="cids"
                  placeholder="Enter your a comma seprated list of PIDs"
                  :value="item"
                  readonly
                />
              </template>
              <input
                v-if="!selectedFilePIDS || selectedFilePIDS.length === 0"
                type="text"
                name="cids"
                placeholder="Enter your single PID"
                :value="form.cid"
              />
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn-blue"
            @click="closeModal()"
            aria-label="Close modal"
          >
            Cancel
          </button>
          <button
            :disabled="!form.tag || !form.name"
            type="button"
            class="btn-green"
            @click="saveModal()"
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
/* Import our Pinia Store */
import { useStore } from "../store";
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
      form: {
        tag: "",
        title: "",
        description: "",
        PIDS: this.selectedFilePIDS,
      },
    };
  },
  emits: ["closeModal", "saveModal"],
  methods: {
    closeModal() {
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
        description: "",
        PIDS: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

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
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}

.modal-body {
  position: relative;
  padding: 20px 0;
  .form-container {
    width: 94%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 1% 1% 0 1%;
    z-index: 999;

    .input-row {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
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
  padding: 0 0 10px 0;
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
