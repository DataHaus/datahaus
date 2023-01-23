<template>
  <section id="content">
    <div class="main">
      <section id="home">
        <div class="left">
          <h1>Data<span class="cyan">Haus</span></h1>
          <p>
            DataHaus is a decentralized data warehouse built on the Filecoin
            Virtual Machine which provides a reliable data foundation that
            efficiently handles all data types.
          </p>
          <p>
            A powerful and dynamic distributed cloud storage network for your
            data. Create and tune strategies to suit your big data needs in
            redundancy, retrieval speed, and cost.
          </p>
          <p>
            <a href="#about" title="Learn More" class="link-button"
              >Learn More</a
            >
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
              web free from corporate control.
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
      <section id="cod">
        <h1>COD</h1>
        <div class="subtitle">
          Bacalhau is a network of open compute resources made available to
          serve any data processing workload.
        </div>
        <div class="row">
          <div class="cod-box bg-blue">
            <h2>Bacalhau <BacalhauWhite /></h2>
            <p>
              The Bacalhau Project offers simple, low cost, decentralized tools
              and data computing that addresses deep rooted gaps in managing big
              data that unlocks a new collaborative ecosystem.
            </p>
          </div>
          <div class="cod-box bg-cyan">
            <h2>IPFS</h2>
            <p>
              All content can be shared using the globally distributed IPFS
              network, the Bacalhau network runs the jobs where the data is
              already stored.
            </p>
          </div>
          <div class="cod-box bg-white">
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

/* Import our Pinia Store */
// import { storeToRefs } from "pinia";
import { useStore } from "../store";

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
// const { account } = storeToRefs(store);

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
        width: 30%;
        display: flex;
        align-content: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        padding: 20px;
        overflow: hidden;

        @include breakpoint($break-ssm) {
          width: 100%;
          align-content: center;
          justify-content: center;
        }

        h1 {
          color: $haus-blue;
          font-size: 3.25rem;
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

          img,
          svg {
            width: 800px;
            object-fit: contain;
            overflow: hidden;
            margin: -40px 0 0 -150px;
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
          min-height: 325px;
          padding: 3%;
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

    section#cod {
      background: $haus-blue;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      padding: 40px 0 0 0;

      h1 {
        color: $white;
        font-size: 3.75rem;
        margin-bottom: 20px;
        z-index: 999;
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
      }

      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        .cod-box {
          width: 27.3333333%;
          min-height: 320x;
          padding: 3%;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
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
            .svg-container {
              width: 90px;
              margin-left: 20px;
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
