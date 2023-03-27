<template>
  <div class="metric-col">
    <div class="metric-box">
      <div class="metric-box-label">Tipset Height :</div>
      <div class="metric-box-value">
        {{ latestTipsetHeight }}
      </div>
    </div>
    <div class="metric-box">
      <div class="metric-box-label">Tipset Time :</div>
      <div class="metric-box-value">
        {{ latestTipsetTime }}
      </div>
    </div>
    <div class="metric-box">
      <div class="metric-box-label">Miner :</div>
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
      hash: null,
      height: null,
      timestamp: null,
      miner: null,
      blockcid: null,
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

.metric-col {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: flex-end;
  justify-content: flex-start;

  .metric-box {
    width: 260px;
    min-height: 35px;
    padding: 0 10px;
    border-radius: 40px;
    color: $white;
    background: $haus-blue;
    border: 1px solid $haus-cyan;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    @include breakpoint($break-ssm) {
      width: 94%;
    }

    .metric-box-label {
      color: $white;
      font-size: 16px;
      font-weight: bold;
    }
    .metric-box-value {
      color: $white;
      font-size: 16px;
      font-weight: bold;
      margin-left: 0.4em;
    }
  }
}
</style>
