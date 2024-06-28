<script setup lang="ts">
import type { XRProps } from '../types/xr'
import { useXRContextProvider } from '../composables/useXR'
import XRManager from './XRManager.vue'

/**
 * Props
 */
const props = defineProps<XRProps>()

useXRContextProvider()
</script>

<template>
  <XRManager v-bind="props">
    <slot></slot>
  </XRManager>
</template>
