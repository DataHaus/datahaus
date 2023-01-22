<template>
  <section id="content">
    <SidebarView />
    <div class="deals">
      <h1>Storage Deals / Bounties</h1>
      <p>Filecoin storage providers can compete to win storage bounties.</p>
    </div>
  </section>
</template>
<script>
import { provide } from "vue";
import { Notyf } from "notyf";
/* LFG */
export default {
  name: "DealsView",
  setup() {
    const NotfyProvider = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "bottom",
      },
      types: [
        {
          type: "loading",
          background: "orange",
          duration: 0,
          dismissible: true,
          icon: {
            className: "icon icon-loading",
            tagName: "i",
          },
        },
      ],
    });
    provide("notyf", NotfyProvider);
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  .deals {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    color: $haus-blue;
    background: $white;
    padding: 20px 40px;
  }
}
</style>
