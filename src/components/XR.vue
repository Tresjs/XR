<script setup lang="ts">
import type { XRProps } from '../types/xr'
import { useXRContextProvider } from '../composables/useXR'
import XRManager from './XRManager.vue'

/**
 * Props
 */
const props = withDefaults(defineProps<XRProps>(), {
  foveation: 0,
  referenceSpace: 'local-floor',
})

useXRContextProvider(props)
</script>

<template>
  <XRManager v-bind="props">
    <slot></slot>
  </XRManager>
</template>
