<!-- eslint-disable no-console -->
<script setup lang="ts">
import { watch } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import type { XRManagerEvent, XRProps } from '../types/xr'
import { useXR } from '../composables/useXR'
import { useGlobalSession } from '../composables/useGlobalSession'
import InteractionManager from './InteractionManager.vue'

/**
 * Props
 */
const props = withDefaults(defineProps<XRProps>(), {
  foveation: 0,
  frameRate: undefined,
  referenceSpace: 'local-floor',
})

// Global XR context
const { session: globalSession, referenceSpace: globalReferenceSpace } = useGlobalSession()

// XR context
const { session, foveation, isHandTracking, isPresenting } = useXR()

// TresJS context
const { renderer, camera, scene, render: renderCtx } = useTresContext()

// Sync XR Content with Global Session

watch(globalSession, (value) => {
  if (value) {
    session.value = value
  }
})

// Watch Props Changes
watch(() => props.referenceSpace, (value) => {
  renderer.value.xr.setReferenceSpaceType(value)
  globalReferenceSpace.value = value as XRReferenceSpaceType
})

watch(() => props.foveation, (value) => {
  foveation.value = value
  renderer.value.xr.setFoveation(value)
})

const handleSessionStart = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = true
  //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
}
const handleSessionEnd = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = false
  session.value = null
  globalSession.value = null
  //   onSessionEndRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
}
const handleVisibilityChange = (_nativeEvent: XRSessionEvent) => {
  //   onVisibilityChangeRef.current?.({ nativeEvent, target: session })
}
const handleInputSourcesChange = (_nativeEvent: XRInputSourceChangeEvent) => {
  isHandTracking.value = Object.values(session.value?.inputSources).some(source => source.hand)
  //   onInputSourcesChangeRef.current?.({ nativeEvent, target: session })
}

const handleXRFrame = () => {
  if (camera.value && renderCtx.frames.value > 0) {
    renderer.value.render(scene.value, camera.value)
  }
}

const { render } = useLoop()

// React to session
watch(session, (value) => {
  if (!value) {
    renderer.value.xr.setSession(null!)
  }

  renderer.value.xr.addEventListener('sessionstart', handleSessionStart)
  renderer.value.xr.addEventListener('sessionend', handleSessionEnd)
  value?.addEventListener('visibilitychange', handleVisibilityChange)
  value?.addEventListener('inputsourceschange', handleInputSourcesChange)
  renderer.value.xr.enabled = true
  renderer.value.xr.setSession(session.value).then(() => {
    // on setSession, three#WebXRManager resets foveation to 1
    // so foveation set needs to happen after it
    console.log('renderer xr set session', session, renderer.value.xr)
    renderer.value.xr.setFoveation(props.foveation)
  })

  console.log('scene', scene.value)

  render(({ invalidate }) => {
    renderer.value.xr.setAnimationLoop(renderer.value.xr.isPresenting ? handleXRFrame : null)
    if (!renderer.value.xr.isPresenting && renderCtx.mode.value === 'on-demand') { invalidate() }
  })
}, {
  onTrack: () => {
    if (!session.value) {
      return void renderer.value.xr.setSession(null!)
    }
    renderer.value.xr.setSession(null!)
    renderer.value.xr.removeEventListener('sessionstart', handleSessionStart)
    renderer.value.xr.removeEventListener('sessionend', handleSessionEnd)
    session.value?.removeEventListener('visibilitychange', handleVisibilityChange)
    session.value?.removeEventListener('inputsourceschange', handleInputSourcesChange)
  },
})
</script>

<template>
  <InteractionManager>
    <!--  <primitive :object="player" />
    <primitive :object="XRCamera" />
    <primitive v-for="(controller, index) in controllers" :key="index" :object="controller" /> -->
    <slot></slot>
  </InteractionManager>
</template>
