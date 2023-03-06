<template>
  <div class="row">
    <div class="metric-box">
      <h3>Tipset Height</h3>
      <div class="metric-box-value">
        {{ latestTipsetHeight }}
      </div>
    </div>
    <div class="metric-box">
      <h3>Latest Tipset Time</h3>
      <div class="metric-box-value">
        {{ latestTipsetTime }}
      </div>
    </div>
    <div class="metric-box">
      <h3>Miner</h3>
      <div class="metric-box-value">
        {{ tipsetMiner }}
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
/* Import our Services and APIs */
import beryxApi from "../../services/beryxApi.js";
/* LFG */
export default {
  name: "MetricBoxes",
  setup() {
    const tipsetLatest = ref({
      height: null,
      timestamp: null,
    });

    /* Computed Values for Dashboard */
    const latestTipsetHeight = computed(() => {
      return tipsetLatest.value.height;
    });

    const latestTipsetTime = computed(() => {
      const date = new Date(tipsetLatest.value.timestamp);
      return new Intl.DateTimeFormat("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        // timeZone: "Africa/Johannesburg",
      }).format(date);
    });

    const tipsetMiner = computed(() => {
      return tipsetLatest.value.miner;
    });

    async function getTipset() {
      const beryx = new beryxApi();
      tipsetLatest.value = await beryx.getTipsetLatest();
    }

    onMounted(async () => {
      await getTipset();
    });

    return {
      latestTipsetHeight,
      latestTipsetTime,
      tipsetMiner,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;

  .metric-box {
    width: 40%;
    min-height: 55px;
    padding: 0 1%;
    border-radius: 40px;
    border: 2px solid $haus-cyan;
    margin: 0 3% 0 1%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;

    @include breakpoint($break-ssm) {
      width: 94%;
    }

    h3 {
      color: $haus-blue;
      font-size: 16px;
      margin: 0;
      text-align: center;
      margin-block-start: 0.6em;
      margin-block-end: 0.15em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
    }
    .metric-box-value {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 0.4em;
    }
  }
}
</style>
