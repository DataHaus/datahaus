<template>
  <section id="content">
    <div class="main">
      <IntroSection />
      <StorageSolutions />
      <StorageOptions />
      <ProofOfDeal />
      <ComputeOverData />
      <FooterSection />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { Notyf } from "notyf";
import { useStore } from "../store";

/* Components */
import IntroSection from "../components/HomeComponents/IntroSection.vue";
import StorageSolutions from "../components/HomeComponents/StorageSolutions.vue";
import StorageOptions from "../components/HomeComponents/StorageOptions.vue";
import ProofOfDeal from "../components/HomeComponents/ProofOfDeal.vue";
import ComputeOverData from "../components/HomeComponents/ComputeOverData.vue";
import FooterSection from "../components/HomeComponents/FooterSection.vue";

/* Create an instance of Notyf with settings */
var notyf = new Notyf({
  duration: 5000,
  position: {
    x: "center",
    y: "bottom",
  },
  types: [
    {
      type: "loading",
      background: "orange",
      duration: 15000,
      dismissible: true,
      icon: {
        className: "icon icon-loading",
        tagName: "i",
      },
    },
    {
      type: "success",
      background: "green",
      duration: 20000,
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

const store = useStore();

async function checkIfWalletIsConnected() {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      notyf.error(`⛽ Please connect MetaMask to continue!`);
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) store.setAccount(accounts[0]);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  await checkIfWalletIsConnected();
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#content {
  position: relative;
  height: 100%;

  .main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .home {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
