<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import type { Ref } from 'vue'
import * as THREE from 'three'
import type { XRProps } from '../types/xr'
import type { XRState } from '../types/context'
import type { XRInteractionHandler, XRInteractionType } from '../types/interaction'
import XRManager from './XRManager.vue'

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
    none: new Map(),
  },
  interactions: new Map(),
  hasInteraction(_object: THREE.Object3D, _eventType: XRInteractionType) {
    // return !!get()
    //   .interactions.get(object)
    //   ?.[eventType].some((handlerRef) => handlerRef.current)
  },
  getInteraction(_object: THREE.Object3D, _eventType: XRInteractionType) {
    // return get()
    //   .interactions.get(object)
    //   ?.[eventType].reduce((result, handlerRef) => {
    //   if (handlerRef.current) {
    //     result.push(handlerRef.current)
    //   }
    //     return result
    //   }, [] as XRInteractionHandler[])
  },
  addInteraction(_object: THREE.Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
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
  removeInteraction(_object: THREE.Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
    // const target = get().interactions.get(object)
    // if (target) {
    //   const interactionIndex = target[eventType].indexOf(handlerRef)
    //   if (interactionIndex !== -1) target[eventType].splice(interactionIndex, 1)
    // }
  },
})

function addSessionEventListener(event, eventListener) {
  if (state?.session) {
    state.session.addEventListener(event, eventListener)
  }
}
function removeSessionEventListener(event, eventListener) {
  if (state?.session) {
    state.session.removeEventListener(event, eventListener)
  }
}

provide('state', {
  state,
  addSessionEventListener,
  removeSessionEventListener,
  session: computed({
    get() {
      return state.session
    },
    set(session) {
      Object.assign(state, { session })
    },
  }),
  isPresenting: computed({
    get() {
      return state.isPresenting
    },
    set(isPresenting) {
      Object.assign(state, { isPresenting })
    },
  }),
  isHandTracking: computed({
    get() {
      return state.isHandTracking
    },
    set(isHandTracking) {
      Object.assign(state, { isHandTracking })
    },
  }),
})
</script>

<template>
  <XRManager v-bind="props">
    <slot></slot>
  </XRManager>
</template>
