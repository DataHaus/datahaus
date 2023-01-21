<script>
/* Components */
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";
/* LFG */
export default {
  name: "App",
  components: [AppHeader, AppFooter, ReloadPrompt],
};
</script>
<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
  <AppFooter />
  <ReloadPrompt />
</template>
