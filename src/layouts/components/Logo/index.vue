<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import logo from "@/assets/layouts/miku.jpg?url"
import logoText1 from "@/assets/layouts/miku.jpg?url"
import logoText2 from "@/assets/layouts/miku.jpg?url"

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
})

const settingsStore = useSettingsStore()
const { layoutMode } = storeToRefs(settingsStore)
</script>

<template>
  <div class="layout-logo-container" :class="{ collapse: props.collapse, 'layout-mode-top': layoutMode === 'top' }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <!-- <img :src="logo" class="layout-logo" /> -->
        <div>校园签到系统</div>
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="layout-title">校园签到系统</div>
        <!-- <img :src="layoutMode !== 'left' ? logoText2 : logoText1" class="layout-logo-text" /> -->
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
  .layout-title{
    color: white;
    // font-weight: 600;
    font-size: 1.5rem;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
