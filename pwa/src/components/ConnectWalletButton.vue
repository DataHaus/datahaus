<template>
  <div class="connect-wallet-container">
    <!-- Metamask Not Connected -->
    <button
      v-if="!account"
      @click="connectWallet()"
      :class="
        btnSize === 'large'
          ? 'connect-wallet-button'
          : 'connect-wallet-small-button'
      "
    >
      connect
    </button>
    <!-- Metamask Connected -->
    <button
      v-if="account"
      :class="
        btnSize === 'large'
          ? 'profile-wallet-button'
          : 'profile-wallet-small-button'
      "
    >
      {{ account }}
    </button>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "../store";

defineProps({
  currentAccount: String,
  btnSize: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const store = useStore();
const { account } = storeToRefs(store);

async function connectWallet() {
  store.setLoading(true);
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please connect 🦊 Metamask to continue!");
      return;
    }

    const [accountAddress] = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accountAddress) {
      store.setAccount(accountAddress);
      console.log("Account Address", accountAddress);
      emit("update:modelValue", accountAddress);
      store.setLoading(false);
    }
    store.setLoading(false);
  } catch (error) {
    console.log("Error", error);
    store.setLoading(false);
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.connect-wallet-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: 550px;
}

.connect-wallet-container img {
  padding-bottom: 20px;
}

.connect-wallet-button {
  color: $white;
  background-color: $haus-blue;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-cyan;
    border: 1px solid $haus-cyan;
  }
}

.connect-wallet-small-button {
  color: $white;
  background-color: $haus-blue;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 1px solid $white;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-cyan;
    border: 1px solid $haus-cyan;
  }
}

.profile-wallet-button {
  color: $black;
  background-color: $white;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 2px solid $haus-blue;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-blue;
  }
}

.profile-wallet-small-button {
  color: $black;
  background-color: $white;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $haus-blue;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-blue;
  }
}
</style>
