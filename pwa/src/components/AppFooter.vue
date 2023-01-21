<template>
  <footer id="footer">
    <div class="footer-menu">
      <nav class="footer-navbar">
        <a
          href="https://ethglobal.com/showcase/"
          alt="Space Warp"
          target="_blank"
          rel="noopener"
          >showcase</a
        >
        <a
          href="https://github.com/DataHaus/datahaus"
          alt="GitHub"
          target="_blank"
          rel="noopener"
          >github</a
        >
        <a
          href="https://twitter.com/WebMoss"
          alt="Twitter"
          target="_blank"
          rel="noopener"
          >twitter</a
        >
      </nav>
    </div>
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
};
</script>
<style lang="scss">
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 44px;
  background: $haus-blue;

  @include breakpoint($break-ssm) {
    padding: 10px 0;
  }

  .footer-menu {
    display: flex;
    align-items: center;

    .footer-navbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      padding: 0.3em;
      font-size: 0.8rem;
      @include breakpoint($break-ssm) {
        padding: 0;
        font-size: 0.8rem;
        justify-content: center;
      }

      a {
        font-size: 0.8rem;
        color: $white;
        margin-right: 14px;
        padding-bottom: 1px;
        text-decoration: none;
        cursor: pointer;
        @include breakpoint($break-ssm) {
          font-size: 0.6rem;
        }
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
