<script>
/* Components */
import AppHeader from "./components/AppHeader.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
/* LFG */
export default {
  name: "App",
  components: [AppHeader, ReloadPrompt],
};
</script>
<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
  <ReloadPrompt />
</template>
