<template>
  <section id="content">
    <SidebarView />
    <div class="cod">
      <h1>Compute Over Data</h1>
      <p>Run Batch Processing or big data jobs using Balhau.</p>
    </div>
  </section>
</template>
<script>
import { provide } from "vue";
import { Notyf } from "notyf";
/* LFG */
export default {
  name: "CodView",
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

  .cod {
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
