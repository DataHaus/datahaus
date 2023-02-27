<template>
  <div class="sidebar">
    <!-- <div class="profile">
      <img src="../assets/images/0xWebMoss.png" alt="profile_picture" />
      <h3>{{ currency }} {{ (balance / 1000000000000000000).toFixed(2) }}</h3>
      <code class="account-address">{{ account }}</code>
    </div> -->
    <ul>
      <li>
        <router-link :to="{ name: 'dashboard' }" active-class="active" exact>
          <span class="icon"><i-mdi-view-dashboard /></span>
          <span class="item">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'storage' }" active-class="active" exact>
          <span class="icon"><i-mdi-database /></span>
          <span class="item">Storage</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'deals' }" active-class="active" exact>
          <span class="icon"><i-mdi-stackoverflow /></span>
          <span class="item">Deals</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'miners' }" active-class="active" exact>
          <span class="icon"><i-mdi-webpack /></span>
          <span class="item">Miners</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'cod' }" active-class="active" exact>
          <span class="icon"><i-mdi-locker-multiple /></span>
          <span class="item">COD</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'reports' }" active-class="active" exact>
          <span class="icon"><i-mdi-chart-line /></span>
          <span class="item">Reports</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'settings' }" active-class="active" exact>
          <span class="icon"><i-mdi-cog /></span>
          <span class="item">Settings</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
// import { storeToRefs } from "pinia";
// import { useStore } from "../store";

// const store = useStore();
// const { account, balance, currency, decimals } = storeToRefs(store);

// console.log("account", account.value);
// console.log("balance", balance.value);
// console.log("currency", currency.value);
// console.log("decimals", decimals.value);
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.sidebar {
  width: 15%;
  min-width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  color: $white;
  background: $haus-blue;
  padding: 10px 0 0 0;
  overflow: hidden;
  transition: all 0.5s ease;

  // .profile {
  //   width: 75%;
  //   margin-bottom: 30px;
  //   text-align: center;

  //   img {
  //     display: block;
  //     width: 80px;
  //     height: 80px;
  //     border-radius: 50%;
  //     margin: 0 0 0 -20px;
  //   }
  //   h3 {
  //     color: $white;
  //     font-size: 16px;
  //     margin: 0 0 5px 0;
  //     text-align: left;
  //   }

  //   .account-address {
  //     width: 70px;
  //     color: $white;
  //     font-size: 14px;
  //     white-space: nowrap;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //   }
  // }

  ul {
    border-bottom: 0.5px solid $white;
    list-style: none;
    text-decoration: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    li {
      margin: 0;
      padding: 0;
      a {
        display: block;
        position: relative;
        padding: 13px 30px 13px 0;
        color: $white;
        font-size: 16px;
        text-decoration: none;

        &:hover {
          color: $haus-cyan;
        }

        .icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background-position: bottom;
          background-size: contain;
          cursor: pointer;

          &.no-pointer {
            cursor: default;
          }

          svg {
            margin-bottom: -2px;
          }
        }
        .item {
          margin-top: -5px;
        }
      }
      a.router-link-active,
      a.router-link-exact-active {
        color: $haus-cyan;
      }
    }
  }
}
</style>
