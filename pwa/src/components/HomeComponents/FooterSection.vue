<template>
  <section id="footer">
    <div class="footer-menu">
      <nav class="footer-navbar">
        <a
          href="https://ethglobal.com/showcase/datahaus-jvhhb"
          alt="Filecoin Space Warp 2023"
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
          href="https://twitter.com/webmoss"
          alt="Twitter"
          target="_blank"
          rel="noopener"
          >twitter</a
        >
        <a
          href="https://www.linkedin.com/in/craig-moss-21822628/"
          alt="LinkedIn"
          target="_blank"
          rel="noopener"
          >linkedIn</a
        >
      </nav>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 44px;

  @include breakpoint($break-ssm) {
    padding: 10px 0;
  }

  color: $white;
  background: haus-blue;

  .footer-menu {
    display: flex;
    align-items: center;

    .footer-navbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0;
      padding: 0.3em;
      font-size: 0.9rem;

      @include breakpoint($break-ssm) {
        padding: 0;
        font-size: 0.8rem;
        justify-content: center;
      }

      a {
        font-size: 0.9rem;
        color: $white;
        margin-right: 14px;
        padding-bottom: 1px;
        text-decoration: none;
        border-bottom: 0.5px solid;
        transition: 0.6s;
        cursor: pointer;

        @include breakpoint($break-ssm) {
          font-size: 0.7rem;
        }

        &:hover {
          font-weight: bold;
          border-bottom: 0.5px solid $haus-cyan;
        }

        &:focus {
          border-bottom: 0.5px solid $haus-cyan;
        }
      }

      svg {
        cursor: pointer;
        font-size: 2em;
      }
    }
  }
}
</style>
