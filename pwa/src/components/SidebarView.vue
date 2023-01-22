<template>
  <div class="sidebar">
    <div class="profile">
      <img src="../assets/images/0xWebMoss.png" alt="profile_picture" />
      <h3>Craig Moss</h3>
      <p>0xWebmoss</p>
    </div>
    <ul>
      <!-- <li>
        <router-link :to="{ name: 'home' }" active-class="active" exact
          ><span class="icon"><i-mdi-home /></span>
          <span class="item">Home</span></router-link
        >
      </li> -->
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
        <router-link :to="{ name: 'cod' }" active-class="active" exact>
          <span class="icon"><i-mdi-computer /></span>
          <span class="item">COD</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'deals' }" active-class="active" exact>
          <span class="icon"><i-mdi-stackoverflow /></span>
          <span class="item">Deals</span>
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
<script>
export default {
  name: "AppFooter",
};
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.sidebar {
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  color: $white;
  background: $haus-blue;
  padding: 0;
  overflow: hidden;
  transition: all 0.5s ease;

  .profile {
    margin-bottom: 30px;
    text-align: center;

    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
    }
    h3 {
      color: $white;
      margin: 0;
    }

    p {
      color: $white;
      font-size: 14px;
    }
  }

  ul {
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
          font-weight: bold;
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
        font-weight: bold;
      }
    }
  }
}
</style>
