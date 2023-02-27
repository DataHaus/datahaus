<template>
  <section id="providers">
    <h1>Storage Options</h1>
    <div class="subtitle">
      Choose how and where your data is stored with one or more of our
      integrated storage services. Upload all your digital data assets including
      videos, music files, NFT data or even large encrypted datasets for batch
      processing.
    </div>
    <div class="row">
      <div class="providers-box bg-cyan">
        <h2>IPFS</h2>
        <p>
          A peer-to-peer hypermedia protocol designed to preserve and grow
          humanity's knowledge by making the web upgradeable, resilient, and
          more open.
        </p>
      </div>
      <div class="providers-box">
        <h2>NFT.Storage</h2>
        <p>
          NFT.Storage is a long-term storage service that offers free
          decentralized storage and bandwidth for NFT data on IPFS and Filecoin.
        </p>
      </div>
      <div class="providers-box">
        <h2>Web3.Storage</h2>
        <p>
          Use decentralized protocols to liberate your data. Content uploaded to
          Web3.Storage is stored on Elastic IPFS, a cloud-native implementation
          of IPFS.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="providers-box">
        <h2>Estuary</h2>
        <p>
          A reliable way to upload public data onto Filecoin and pin it to IPFS.
          6x data replication
        </p>
      </div>
      <div class="providers-box">
        <h2>LightHouse</h2>
        <p>
          Lighthouse allows users to store and encrypt / decrypt their files on
          the decentralized network for lifetime at a fixed price
        </p>
      </div>
      <div class="providers-box bg-cyan">
        <h2>The Data Economy</h2>
        <p>
          DataHaus will continue to develop and integrate the latest and best
          Web3 services for the Filecoin data economy.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#providers {
  width: 100%;
  background: $white;
  background-image: url("../../assets/images/BG3.png");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  h1 {
    width: 100%;
    color: $haus-blue;
    font-size: 42px;
    text-align: center;
    margin-bottom: 20px;
    z-index: 999;
    @include breakpoint($break-ssm) {
      font-size: 2.75rem;
      margin-bottom: 0;
    }
  }

  .subtitle {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 30px 20%;
    color: $haus-blue;
    line-height: 1.7;
    text-align: center;
    margin-bottom: 50px;
    z-index: 999;
    @include breakpoint($break-ssm) {
      padding: 20px 1%;
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include breakpoint($break-ssm) {
      width: 100%;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 0;
    }
    .providers-box {
      width: 94%;
      min-height: 270px;
      margin: 0 1%;
      padding: 3%;
      border-radius: 20px;

      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      background-color: $haus-blue;

      @include breakpoint($break-ssm) {
        width: 92%;
        padding: 3%;
        margin: 1%;
      }

      h2 {
        color: $white;
        font-size: 2rem;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        .svg-container {
          width: 80px;
          margin-left: 12px;
        }
      }

      a {
        color: $white;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $white;
        line-height: 1.7;
        @include breakpoint($break-ssm) {
          text-align: center;
        }
      }
    }

    .providers-box.bg-cyan {
      background-color: $haus-cyan;

      h2 {
        color: $haus-blue;
        font-size: 2rem;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;

        @include breakpoint($break-ssm) {
          margin-bottom: 10px;
          font-size: 1.85rem;
        }
        .svg-container {
          width: 80px;
          margin-left: 12px;
        }
      }

      a {
        color: $haus-blue;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $haus-blue;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
