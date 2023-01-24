<template>
  <header id="header">
    <div class="header-title">
      <img
        src="../assets/images/DataHaus-Icon.png"
        width="50"
        class="header-logo"
      />
      <router-link :to="{ name: 'home' }" active-class="active" exact
        ><h1>Data<span class="cyan">Haus</span></h1>
      </router-link>
      <div class="mobile-connect">
        <ConnectWalletButton v-model="account" btnSize="small" />
      </div>
    </div>
    <div class="header-menu">
      <nav>
        <div class="right">
          <ConnectWalletButton v-model="account" btnSize="small" />
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "../store";
/* Components */
import ConnectWalletButton from "../components/ConnectWalletButton.vue";
/* LFG */
export default {
  name: "AppHeader",
  components: [ConnectWalletButton],
  setup() {
    /* Init Store */
    const store = useStore();
    const { account } = storeToRefs(store);
    /**
     * Get our current 🦊 Metamask account details
     */
    const getCurrentAccount = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) return;
        /* Get our Current Account */
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          store.setAccount(accounts[0]);
        } else {
          console.log("⚠ No authorized MetaMask accounts connected!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getCurrentAccount();
    });

    return {
      account,
      getCurrentAccount,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

#header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 12px 0 12px;
  background: $haus-blue;

  @include breakpoint($break-ssm) {
    padding: 0;
    flex-direction: column;
  }

  .header-logo {
    margin-right: 8px;
  }

  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: $white;
      text-decoration: none;
    }

    @include breakpoint($break-md) {
      width: 98%;
      justify-content: flex-start;
      align-items: center;
      padding-left: 2%;
    }

    @include breakpoint($break-ssm) {
      width: 98%;
      justify-content: flex-start;
      align-items: center;
      padding-left: 2%;
    }

    @include breakpoint($break-ssm) {
      width: 100%;
      justify-content: flex-start;
      align-items: center;
    }

    h1 {
      color: $white;
      font-size: 1.7em;
      margin-block-start: 0.67em;
      margin-block-end: 0.3em;
      span {
        color: $haus-cyan;
      }
    }

    .mobile-connect {
      display: none;

      @include breakpoint($break-sm) {
        display: inline;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }

      @include breakpoint($break-ssm) {
        display: inline;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .header-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;

    @include breakpoint($break-ssm) {
      width: 100%;
      height: auto;
      flex-direction: row wrap;
    }

    nav {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: flex-end;
      align-items: center;

      @include breakpoint($break-ssm) {
        text-align: left;
        padding: 0 8px 6px;
        height: auto;
        justify-content: center;
        align-items: center;
      }

      a {
        color: $white;
        font-size: 16px;
        margin-right: 16px;
        text-decoration: none;
        transition: 0.6s;
        cursor: pointer;

        &:hover {
          color: $haus-cyan;
          font-weight: bold;
        }

        &:focus {
          color: $haus-cyan;
          font-weight: bold;
        }

        &:active {
          color: $haus-cyan;
          font-weight: bold;
        }
      }

      @include breakpoint($break-ssm) {
        > a {
          font-size: 0.8em;
          margin-right: 11px;

          flex: row;
          display: flex;
          justify-content: center;

          &.active {
            font-weight: bold;
          }
        }

        .right {
          @include breakpoint($break-sm) {
            display: none;
          }

          @include breakpoint($break-ssm) {
            display: none;
          }
        }

        > i {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
