<script setup lang="ts">
import { provide, ref } from 'vue'
import type { Ref } from 'vue'
import type { Object3D } from 'three'
import { Group } from 'three'
import type { XRProps } from '../types/xr'
import type { XRInteractionHandler, XRInteractionType } from '../types/interaction'
import type { XrContext } from '../core/injectionKeys'
import { xrInjectionKey } from '../core/injectionKeys'
import XRManager from './XRManager.vue'

/**
 * Props
 */
const props = defineProps<XRProps>()

const ctx: XrContext = {
  controllers: [],
  isPresenting: false,
  isHandTracking: false,
  player: new Group(),
  session: ref(null),
  foveation: 0,
  referenceSpace: 'local-floor',
  hoverState: {
    left: new Map(),
    right: new Map(),
    none: new Map(),
  },
  interactions: new Map(),
  hasInteraction(_object: Object3D, _eventType: XRInteractionType) {
    return false
    // return !!get()
    //   .interactions.get(object)
    //   ?.[eventType].some((handlerRef) => handlerRef.current)
  },
  getInteraction(_object: Object3D, _eventType: XRInteractionType) {
    // return get()
    //   .interactions.get(object)
    //   ?.[eventType].reduce((result, handlerRef) => {
    //   if (handlerRef.current) {
    //     result.push(handlerRef.current)
    //   }
    //     return result
    //   }, [] as XRInteractionHandler[])
  },
  addInteraction(_object: Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
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
  removeInteraction(_object: Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
    // const target = get().interactions.get(object)
    // if (target) {
    //   const interactionIndex = target[eventType].indexOf(handlerRef)
    //   if (interactionIndex !== -1) target[eventType].splice(interactionIndex, 1)
    // }
  },
  /* addSessionEventListener: (event, eventListener) => {
    if (ctx.session) {
      ctx.session.addEventListener(event, eventListener)
    }
  },
  removeSessionEventListener: (event, eventListener) => {
    if (ctx.session) {
      ctx.session.removeEventListener(event, eventListener)
    }
  }, */
}
provide(xrInjectionKey, ctx)
</script>

<template>
  <XRManager v-bind="props">
    <slot></slot>
  </XRManager>
</template>
