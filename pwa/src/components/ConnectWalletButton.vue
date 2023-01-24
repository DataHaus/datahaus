<template>
  <div class="connect-wallet-container">
    <!-- 🦊 Metamask Not Connected -->
    <button
      v-if="!account"
      @click="connectWallet()"
      :class="
        btnSize === 'large'
          ? 'connect-wallet-button'
          : 'connect-wallet-small-button'
      "
    >
      Connect
    </button>
    <!-- 🦊 Metamask Connected -->
    <button
      v-if="account && $route.name === 'home'"
      @click="$router.push('/dashboard')"
      :class="
        btnSize === 'large'
          ? 'profile-wallet-button'
          : 'profile-wallet-small-button'
      "
    >
      <i-mdi-view-dashboard class="icon-color" /> Dashboard
    </button>
    <button
      v-if="account && $route.name !== 'home'"
      @click="$router.push('/')"
      :class="
        btnSize === 'large'
          ? 'profile-wallet-button'
          : 'profile-wallet-small-button'
      "
    >
      <i-mdi-home class="icon-color" /> Home
    </button>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "../store";
import { useRouter } from "vue-router";

/* Import our Services and APIs */
import beryxApi from "../services/beryxApi.js";

defineProps({
  currentAccount: String,
  btnSize: {
    type: String,
    required: false,
  },
});

const router = useRouter();
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
      /* Load Beryx API for Filecoin */
      const beryx = new beryxApi();
      let accountBalance = await beryx.getAccountBalance(accountAddress);

      store.setAccount(accountAddress);
      store.setBalance(accountBalance.amount);
      store.setCurrency(accountBalance.currency);
      store.setDecimals(accountBalance.decimals);
      store.setLoading(false);

      router.push({ name: "dashboard" });
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
  img {
    padding-bottom: 20px;
  }
}

.connect-wallet-button {
  color: $white;
  background-color: $haus-blue;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 2px solid $white;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-cyan;
    border: 2px solid $haus-cyan;
  }
}

.connect-wallet-small-button {
  color: $white;
  background-color: $haus-blue;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $white;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $haus-cyan;
    border: 2px solid $haus-cyan;
  }
}

.profile-wallet-button {
  color: $haus-cyan;
  background-color: $haus-blue;
  font-size: 18px;
  font-weight: bold;
  width: auto;
  height: 55px;
  border: 2px solid $haus-cyan;
  border-radius: 30px;
  padding-left: 60px;
  padding-right: 60px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $white;
    border: 2px solid $white;
  }
  svg {
    margin-bottom: -3px;
  }
}

.profile-wallet-small-button {
  color: $haus-cyan;
  background-color: $haus-blue;
  font-size: 15px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $haus-cyan;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    color: $white;
    border: 2px solid $white;
  }

  svg {
    margin-bottom: -3px;
  }
}
</style>
