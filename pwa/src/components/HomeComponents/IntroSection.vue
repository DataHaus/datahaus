<template>
  <section id="home">
    <div class="left">
      <h1>
        <img
          src="../../assets/images/DataHaus-Icon.png"
          class="intro-logo"
        />Data<span class="cyan">Haus</span>
      </h1>
      <p>
        DataHaus is a decentralised data economy, built on Filecoin, which
        provides a reliable web3 data foundation to efficiently handle all data
        types and uses cases needed today.
      </p>
      <p>
        Filecoin is a powerful and dynamic distributed cloud storage network for
        your data. Create and tune strategies to suit your big and small data
        needs in redundancy, retrieval speed, data processing and cost.
      </p>
      <p>
        <a href="/#about" title="Learn More" class="link-button">Solutions</a>
        <a href="/#providers" title="Learn More" class="link-button">Options</a>
        <a href="/#cod" title="Learn More" class="link-button">COD</a>
      </p>
    </div>
    <div class="right">
      <div class="home-graphic">
        <img src="../../assets/images/BG2.png" />
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#home {
  color: $white;
  background: $haus-blue;
  border-bottom: 1px solid $haus-blue;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 20px;
  overflow: hidden;

  @include breakpoint($break-ssm) {
    flex-direction: column;
    justify-content: center;
    padding: 20px;
  }

  .left {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: center;
    padding: 40px 40px 0 40px;

    @include breakpoint($break-ssm) {
      width: 100%;
    }

    h1 {
      color: $white;
      font-size: 42px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-end;
      margin: 0 0 20px 10px;

      @include breakpoint($break-ssm) {
        font-size: 38px;
      }

      img {
        width: 70px;
        margin-bottom: -10px;
        margin-right: 5px;
        @include breakpoint($break-ssm) {
          width: 60px;
        }
      }

      span {
        color: $haus-cyan;
      }
    }

    p {
      color: $white;
      line-height: 1.7;
      margin-bottom: 20px;
      padding: 0 0 0 20px;
      @include breakpoint($break-ssm) {
        padding: 0 0 0 10px;
      }
    }

    .link-button {
      margin-right: 10px;
    }
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    padding: 0;

    @include breakpoint($break-ssm) {
      width: 100%;
      align-content: center;
      justify-content: center;
    }
  }

  .home-graphic {
    width: 100%;
    padding: 0;

    img,
    svg {
      width: 1350px;
      object-fit: cover;
      overflow: hidden;
      @include breakpoint($break-ssm) {
        width: 100%;
      }
    }
  }
}
</style>
