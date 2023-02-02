<template>
  <section id="content">
    <div class="main">
      <section id="home">
        <div class="left">
          <h1>
            <img
              src="../assets/images/DataHaus-Icon.png"
              class="intro-logo"
            />Data<span class="cyan">Haus</span>
          </h1>
          <p>
            DataHaus is a decentralised data economy, built on Filecoin, which
            provides a reliable web3 data foundation to efficiently handle all
            data types and uses cases required today in normal life and
            business.
          </p>
          <p>
            Filecoin is a powerful and dynamic distributed cloud storage network
            for your data. Create and tune strategies to suit your big and small
            data needs in redundancy, retrieval speed, data processing and cost.
          </p>
          <p>
            <a href="#about" title="Learn More" class="link-button"
              >Solutions</a
            >
            <a href="#about" title="Learn More" class="link-button">Options</a>
            <a href="/#cod" title="Learn More" class="link-button">COD</a>
          </p>
        </div>
        <div class="right">
          <div class="home-graphic">
            <img src="../assets/images/BG2.png" />
          </div>
        </div>
      </section>
      <section id="about">
        <div class="left">
          <h1>Storage Solutions</h1>
          <p>
            Create storage deals for your valuable data, Filecoin storage
            providers compete to win storage bounties and bring the costs down
            for you the client.
          </p>
          <div class="about-graphic">
            <img src="../assets/images/BG4.png" />
          </div>
        </div>
        <div class="right">
          <div class="about-box bg-blue">
            <h2>Filecoin</h2>
            <p>
              Filecoin is an open-source cloud storage marketplace, protocol,
              and incentive layer. Filecoin combines with IPFS, a peer-to-peer
              distributed network protocol, to make a more efficient and secure
              web, free from corporate control.
            </p>
          </div>
          <div class="about-box bg-cyan">
            <h2>Scaleability</h2>
            <p>
              The Filecoin network is made up of a large number of diverse
              storage providers. This creates a robust and reliable service that
              can be customized to your specific data needs, no matter how big
              or small.
            </p>
          </div>
          <div class="about-box bg-cyan">
            <h2>Storage Providers</h2>
            <p>
              Filecoin storage providers compete vigorously for your business,
              to store your data, and provide flexible options at the best
              prices, all done on a transparent, trusted global marketplace.
              Cryptographic proofs guarantee your data remains available and
              unchanged over time
            </p>
          </div>
          <div class="about-box bg-blue">
            <h2>Cloud Storage</h2>
            <p>
              Filecoin offers cost-effective cloud storage that is reliable and
              secure. Filecoin's blockchain technology leverages immutability
              and decentralization to provide storage that is more tamper
              resistant to malware and bad actor exploits than traditional
              storage.
            </p>
          </div>
        </div>
      </section>
      <section id="providers">
        <h1>Storage Options</h1>
        <div class="subtitle">
          Choose were and how your data is stored with one or more of our
          integrated storage platforms. Upload all your valuable data assets
          like videos, music files, NFT data or large encrypted datasets for
          batch processing.
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
              Free decentralized storage and bandwidth for NFTs on IPFS and
              Filecoin.
            </p>
          </div>
          <div class="providers-box">
            <h2>Web3.Storage</h2>
            <p>Use decentralized protocols to liberate your data.</p>
          </div>
        </div>
        <div class="row">
          <div class="providers-box">
            <h2>Estuary</h2>
            <p>
              A reliable way to upload public data onto Filecoin and pin it to
              IPFS. 6x data replication
            </p>
          </div>
          <div class="providers-box">
            <h2>LightHouse</h2>
            <p>
              Lighthouse allows users to store and encrypt / decrypt their files
              on the decentralized network for lifetime at a fixed price
            </p>
          </div>
          <div class="providers-box bg-cyan">
            <h2>The DataHaus<br />Data Economy</h2>
            <p>
              DataHaus will continue to develop and integrate the latest and
              best Web3 services for the Filecoin data economy.
            </p>
          </div>
        </div>
      </section>
      <section id="cod">
        <h1>COD</h1>
        <div class="subtitle">
          Bacalhau is a network of open compute resources made available to
          serve any data processing workload that unlocks a new collaborative
          data processing ecosystem.
        </div>
        <div class="row">
          <div class="cod-box-one bg-blue">
            <h2>Bacalhau <BacalhauWhite /></h2>
            <p>
              The Bacalhau Project offers simple, low cost, decentralized tools
              and data computing that addresses deep rooted gaps in managing big
              data.
            </p>
          </div>
          <div class="cod-box-two bg-cyan">
            <h2>IPFS</h2>
            <p>
              All content can be shared using the globally distributed IPFS
              network, the Bacalhau network runs the jobs where the data is
              already stored.
            </p>
          </div>
          <div class="cod-box-three bg-white">
            <h2>Compute Over Data</h2>
            <p>
              Bacalhau enables users to run arbitrary docker containers and wasm
              images against data stored in IPFS. Bacalhau is a peer-to-peer
              network of nodes where each node participates in executing
              (computing) jobs submitted to the cluster.
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from "vue";
import { Notyf } from "notyf";
import { useStore } from "../store";
/* Components */
import BacalhauWhite from "../assets/svgs/BacalhauWhite.vue";
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

  .bg-shape {
    // background-image: url("./BG2.png");
    background-repeat: no-repeat;
    background-position: center right;
    background-size: auto;
  }

  .main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;

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
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: flex-end;

          @include breakpoint($break-ssm) {
            font-size: 40px;
          }

          img {
            width: 100px;
            margin-bottom: -10px;
            margin-right: 5px;
            @include breakpoint($break-ssm) {
              width: 60px;
            }
          }
        }
        p {
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

      h1 {
        color: $white;
        font-size: 3.25rem;
        margin-bottom: 20px;
        span {
          color: $haus-cyan;
        }
      }

      p {
        color: $white;
        line-height: 1.7;
        margin-bottom: 20px;
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

    section#about {
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

        h1 {
          color: $haus-blue;
          font-size: 3rem;
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

        .about-graphic {
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

        .about-box {
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
          h2 {
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
          h2 {
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
          h2 {
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

    section#providers {
      background: $white;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;

      h1 {
        width: 100%;
        color: $haus-blue;
        font-size: 3.25rem;
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
            width: 90%;
            padding: 3%;
            margin: 1% 2%;
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

    section#cod {
      background: $haus-blue;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      padding: 30px 0 0 0;

      h1 {
        color: $white;
        font-size: 3.75rem;
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
        color: $white;
        line-height: 1.7;
        text-align: center;
        margin-bottom: 50px;
        z-index: 999;
        @include breakpoint($break-ssm) {
          padding: 30px 5%;
          margin-bottom: 0;
        }
      }

      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;

        @include breakpoint($break-ssm) {
          width: 100%;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          margin-bottom: 0;
        }
        .cod-box-one {
          width: 25%;
          min-height: 320x;
          padding: 3%;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;

          @include breakpoint($break-ssm) {
            width: 94%;
          }
        }
        .cod-box-two {
          width: 26.3333333%;
          min-height: 320x;
          padding: 3%;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;

          @include breakpoint($break-ssm) {
            width: 94%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        .cod-box-three {
          width: 28.3333333%;
          min-height: 320x;
          padding: 3%;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;

          @include breakpoint($break-ssm) {
            width: 94%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }

        .bg-blue {
          background-color: $haus-blue;
          h2 {
            color: $white;
            font-size: 2.25rem;
            margin-bottom: 20px;
            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;
            @include breakpoint($break-ssm) {
              font-size: 1.85rem;
            }
            .svg-container {
              width: 80px;
              margin-left: 12px;
              @include breakpoint($break-ssm) {
                width: 60px;
              }
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
            margin-bottom: 20px;
          }
        }
        .bg-cyan {
          background-color: $haus-cyan;
          h2 {
            color: $haus-blue;
            font-size: 2.25rem;
            margin-bottom: 20px;
            @include breakpoint($break-ssm) {
              font-size: 1.85rem;
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
        .bg-white {
          background-color: $white;
          h2 {
            color: $haus-blue;
            font-size: 2.25rem;
            margin-bottom: 20px;
            @include breakpoint($break-ssm) {
              font-size: 1.85rem;
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

    .hide-mobile {
      display: none;
    }

    .show-mobile {
      display: inline;
    }
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
