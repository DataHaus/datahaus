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
          IPFS
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
            A peer-to-peer hypermedia protocol designed to preserve and grow
            humanity's knowledge by making the web upgradeable, resilient, and
            more open.
          </p>
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
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
/* LFG */
export default {
  name: "IPFSModalPopup",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeModal"],
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
  padding: 10px 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}

.modal-body {
  position: relative;
  padding: 10px 5px;
  p {
    color: $haus-blue;
    font-size: 14px;
    line-height: 1.2;
    font-weight: normal;
  }
}

.modal-footer {
  padding: 10px;
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
