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
          LightHouse
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
          <p>
            Store private files on the distributed web with secure encryption
            and access control features without the need to manage keys on your
            own.
          </p>
          <div class="input-row">
            <input
              type="checkbox"
              id="encrypt-data"
              name="encrypt-data"
              :value="encryptData"
              class="input-checkbox"
              @input="$emit('onEncryptedCheck', $event)"
            />
            <label for="encrypt-data"> Encrypt files and uploaded data.</label>
          </div>
          <p>
            Share files with authorized users and restrict access to token gated
            resources. Example uses cases - personal photos storage, token gated
            files, patient data, enterprise data, etc.
          </p>
          <div class="input-row">
            <input
              type="checkbox"
              id="share-data"
              name="share-data"
              :value="filesharePermission"
              class="input-checkbox"
              @input="$emit('onFileShareCheck', $event)"
            />
            <label for="share-data">
              Allow file sharing permissions on your uploads.</label
            >
          </div>
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="btn-blue"
            @click="closeModal()"
            aria-label="Cancel modal"
          >
            Close
          </button>
          <button type="button" class="btn-green" @click="closeModal()">
            Done
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
/* LFG */
export default {
  name: "LightHouseModalPopup",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    encryptData: {
      type: Boolean,
      default: false,
    },
    filesharePermission: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeModal", "onEncryptedCheck", "onFileShareCheck"],
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
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
  z-index: 900;
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
  padding: 10px 5px 0;
  p {
    font-family: inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: $haus-blue;
    font-size: 14px;
    line-height: 1.2;
    font-weight: normal;
  }
  .input-row {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    label {
      font-family: inter, system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
      color: $grey-70;
      font-size: 14px;
      line-height: 1.4;
      font-weight: 400;
      margin-left: 3px;
    }
  }
}

.modal-footer {
  padding: 20px 5px;
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
