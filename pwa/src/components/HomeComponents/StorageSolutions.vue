<template>
  <section id="solutions">
    <div class="left">
      <h2>Storage Solutions</h2>
      <p>
        Create storage deals for your valuable data, Filecoin storage providers
        compete to win storage bounties and bring the costs down for you the
        client.
      </p>
      <div class="solutions-graphic">
        <img src="../../assets/images/BG4.png" />
      </div>
    </div>
    <div class="right">
      <div class="solutions-box bg-blue">
        <h3>Filecoin</h3>
        <p>
          Filecoin is an open-source cloud storage marketplace, protocol, and
          incentive layer. Filecoin combines with IPFS, a peer-to-peer
          distributed network protocol, to make a more efficient and secure web,
          free from corporate control.
        </p>
      </div>
      <div class="solutions-box bg-cyan">
        <h3>Scaleability</h3>
        <p>
          The Filecoin network is made up of a large number of diverse storage
          providers. This creates a robust and reliable service that can be
          customized to your specific data needs, no matter how big or small.
        </p>
      </div>
      <div class="solutions-box bg-cyan">
        <h3>Storage Providers</h3>
        <p>
          Filecoin storage providers compete vigorously for your business, to
          store your data, and provide flexible options at the best prices, all
          done on a transparent, trusted global marketplace. Cryptographic
          proofs guarantee your data remains available and unchanged over time
        </p>
      </div>
      <div class="solutions-box bg-blue">
        <h3>Cloud Storage</h3>
        <p>
          DataHaus utilises Filecoin to offer cost-effective cloud storage that
          is reliable and secure. Filecoin's blockchain technology leverages
          immutability and decentralization to provide storage that is more
          tamper resistant to malware and bad actor exploits than traditional
          storage.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#solutions {
  color: $haus-blue;
  background: $white;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0;

  @include breakpoint($break-ssm) {
    flex-direction: column;
    justify-content: center;
  }

  .left {
    width: 26%;
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 2%;
    overflow: hidden;

    @include breakpoint($break-ssm) {
      width: 94%;
      padding: 3%;
      align-content: center;
      justify-content: center;
    }

    h2 {
      color: $haus-blue;
      font-size: 42px;
      margin-bottom: 20px;
      z-index: 999;
    }

    a {
      color: $haus-blue;
      font-weight: bold;
      text-decoration: none;
      z-index: 999;
    }

    p {
      color: $haus-blue;
      line-height: 1.7;
      margin-bottom: 20px;
      z-index: 999;
    }

    .solutions-graphic {
      width: 100%;
      padding: 0;
      z-index: 998;
      overflow: hidden;

      img,
      svg {
        width: 800px;
        object-fit: contain;
        overflow: hidden;
        margin: -40px 0 0 -150px;
        @include breakpoint($break-ssm) {
          width: 90%;
          margin: 0 auto;
        }
      }
    }
  }

  .right {
    width: 70%;
    float: left;
    padding: 0;
    @include breakpoint($break-ssm) {
      width: 100%;
    }

    .solutions-box {
      float: left;
      width: 44%;
      min-height: 360px;
      padding: 3%;
      @include breakpoint($break-ssm) {
        width: 94%;
      }
    }

    .bg-blue {
      background-color: $haus-blue;
      h3 {
        color: $white;
        font-size: 2.25rem;
        margin-bottom: 20px;
      }

      a {
        color: $white;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $white;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }
    .bg-cyan {
      background-color: $haus-cyan;
      h3 {
        color: $haus-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
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
    .bg-white {
      background-color: $white;
      h3 {
        color: $haus-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
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
