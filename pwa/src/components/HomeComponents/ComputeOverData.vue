<template>
  <section id="cod">
    <h1>COD</h1>
    <div class="subtitle">
      Bacalhau is a network of open compute resources made available to serve
      any data processing workload that unlocks a new collaborative data
      processing ecosystem.
    </div>
    <div class="row">
      <div class="cod-box-one bg-blue">
        <h2>Bacalhau <BacalhauWhite /></h2>
        <p>
          The Bacalhau Project offers simple, low cost, decentralized tools and
          data computing that addresses deep rooted gaps in managing big data.
        </p>
      </div>
      <div class="cod-box-two bg-cyan">
        <h2>IPFS</h2>
        <p>
          All content can be shared using the globally distributed IPFS network,
          the Bacalhau network runs the jobs or data services where the data is
          already stored.
        </p>
      </div>
      <div class="cod-box-three bg-white">
        <h2>Compute Over Data</h2>
        <p>
          Bacalhau enables users to run arbitrary docker containers and wasm
          images against data stored in IPFS. Bacalhau is a peer-to-peer network
          of nodes where each node participates in executing (computing) jobs
          submitted to the cluster.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import BacalhauWhite from "../../assets/svgs/BacalhauWhite.vue";
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

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
</style>
