<template>
  <section id="pod">
    <h1>Proof-of-Deal</h1>
    <div class="subtitle">
      On successful completion of a storage deal with your chosen storage
      provider, you can mint a Proof-of-deal NFT or POD. POD's can be used to
      manage your data and provide a proof of data ownership.
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#pod {
  background: $haus-cyan;
  background-image: url("../../assets/images/BG5.png");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 0 0;

  h1 {
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

    @include breakpoint($break-ssm) {
      padding: 30px 5%;
      margin-bottom: 0;
    }
  }
}
</style>
