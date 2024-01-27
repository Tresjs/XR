<template>
    <XRManager v-bind="props" />
</template>

<script setup lang="ts">
  import { provide, reactive } from 'vue'
  import type { Ref } from 'vue'
  import * as THREE from 'three'
  import XRManager from './XRManager.vue'
  import { XRProps } from '../types/xr'
  import { XRState } from '../types/context'
  import { XRInteractionType, XRInteractionHandler } from '../types/interaction'

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
    hoverState: {
      left: new Map(),
      right: new Map(),
      none: new Map()
    },
    interactions: new Map(),
    hasInteraction(object: THREE.Object3D, eventType: XRInteractionType) {
      // return !!get()
      //   .interactions.get(object)
      //   ?.[eventType].some((handlerRef) => handlerRef.current)
    },
    getInteraction(object: THREE.Object3D, eventType: XRInteractionType) {
      // return get()
      //   .interactions.get(object)
      //   ?.[eventType].reduce((result, handlerRef) => {
      //   if (handlerRef.current) {
      //     result.push(handlerRef.current)
      //   }
      //     return result
      //   }, [] as XRInteractionHandler[])
    },
    addInteraction(object: THREE.Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) {
      // const interactions = get().interactions
      // if (!interactions.has(object)) {
      //   interactions.set(object, {
      //     onHover: [],
      //     onBlur: [],
      //     onSelect: [],
      //     onSelectEnd: [],
      //     onSelectStart: [],
      //     onSelectMissed: [],
      //     onSqueeze: [],
      //     onSqueezeEnd: [],
      //     onSqueezeStart: [],
      //     onSqueezeMissed: [],
      //     onMove: []
      //   })
      // }
    },
    removeInteraction(object: THREE.Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) {
      // const target = get().interactions.get(object)
      // if (target) {
      //   const interactionIndex = target[eventType].indexOf(handlerRef)
      //   if (interactionIndex !== -1) target[eventType].splice(interactionIndex, 1)
      // }
    }
  })

  provide('state', state)
</script>