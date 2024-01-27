<template>
    <XRManager v-bind="props" />
</template>

<script setup lang="ts">
  import { provide, reactive } from 'vue'
  import * as THREE from 'three'
  import XRManager from './XRManager.vue'
  import { XRProps, XRState } from '../types/xr'

  /**
    * Props 
    */
  const props = defineProps<XRProps>()

  const state: XRState = reactive({
    controllers: [],
    isPresenting: false,
    isHandTracking: false,
    player: new THREE.Group(),
    session: null,
    foveation: 0,
    referenceSpace: 'local-floor',
  })

  provide('state', state)
</script>