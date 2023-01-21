<template>
  <section id="content">
    <div class="main">
      <section id="home">
        <div class="left">
          <h1>DataHaus</h1>
          <p>
            DataHaus is a decentralized data warehouse built on the Filecoin
            Virtual Machine which provides a reliable data foundation that
            efficiently handles all data types.
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
            Create storage deals / bounties for your valuable data, the Filecoin
            storage providers compete to win storage bounties and bring the
            costs down for the client.
          </p>
          <div class="about-graphic">
            <img src="../assets/images/BG4.png" />
          </div>
        </div>
        <div class="right">
          <div class="about-box bg-blue">
            <h2>Storage</h2>
            <p>
              Create storage deals / bounties for your valuable data, the
              Filecoin storage providers compete to win storage bounties and
              bring the costs down for the client. In addition you can receive
              discounts on entire sectors and volume discounts, where the price
              is further reduced for purchasing multiple sectors at once.
            </p>
          </div>
          <div class="about-box bg-cyan">
            <h2>Storage</h2>
            <p>
              Create storage deals / bounties for your valuable data, the
              Filecoin storage providers compete to win storage bounties and
              bring the costs down for the client. In addition you can receive
              discounts on entire sectors and volume discounts, where the price
              is further reduced for purchasing multiple sectors at once.
            </p>
          </div>
          <div class="about-box bg-cyan">
            <h2>Storage</h2>
            <p>
              Create storage deals / bounties for your valuable data, the
              Filecoin storage providers compete to win storage bounties and
              bring the costs down for the client. In addition you can receive
              discounts on entire sectors and volume discounts, where the price
              is further reduced for purchasing multiple sectors at once.
            </p>
          </div>
          <div class="about-box bg-blue">
            <h2>Storage</h2>
            <p>
              Create storage deals / bounties for your valuable data, the
              Filecoin storage providers compete to win storage bounties and
              bring the costs down for the client. In addition you can receive
              discounts on entire sectors and volume discounts, where the price
              is further reduced for purchasing multiple sectors at once.
            </p>
          </div>
        </div>
      </section>
      <section id="cod">
        <h1>COD</h1>
        <p>
          Create subsets of core data sets for batch processing, analytics and
          AI use cases. DataHaus offers compute over data or COD services
        </p>
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
      }

      a {
        color: $white;
        font-weight: bold;
        border-bottom: 1px solid $white;
        text-decoration: none;
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
          height: 325px;
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
      }
    }

    section#cod {
      color: $white;
      background: $haus-blue;
      border-bottom: 1px solid $haus-blue;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      padding: 40px 20px;

      h1 {
        color: $white;
        font-size: 3.25rem;
        margin-bottom: 20px;
      }

      a {
        color: $white;
        font-weight: bold;
        border-bottom: 1px solid $white;
        text-decoration: none;
      }

      p {
        color: $white;
        line-height: 1.7;
        margin-bottom: 20px;
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
