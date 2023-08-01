<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :key="$route.name" :is="Component"  v-if="$route.meta.iscache"/>
    </keep-alive>
  </router-view>
  <router-view v-if="!$route.meta.iscache" />
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
