<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, inject, watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'
import type { XRProps } from '../types/xr'
import { useGlobalSessionStore } from '../stores/globalSession'
import type { XrContext } from '../core/injectionKeys'
import { xrInjectionKey } from '../core/injectionKeys'
import InteractionManager from './InteractionManager.vue'

/**
 * Props
 */
const props = withDefaults(defineProps<XRProps>(), {
  foveation: 0,
  frameRate: undefined,
  referenceSpace: 'local-floor',
})
const { renderer, camera } = useTresContext()
// TODO: Grab renderer from tres context and use as GL var
const globalSessionStore = useGlobalSessionStore()

const XRCamera = computed(() => {
  return camera?.value ?? {}
})

const {
  session,
  player,
  controllers,
/*   isHandTracking,
  isPresenting, */
} = inject(xrInjectionKey) as XrContext

watchEffect(() => {
  console.log('handler watch effect')
  // const handlers = [0, 1].map((id) => {
  //     const target = new XRController(id, renderer.value)
  //     const onConnected = () => {
  //         controllers = [...controllers, target]
  //     }
  //     const onDisconnected = () => {
  //         controllers = controllers.filter((it) => it !== target)
  //     }

  //     target.addEventListener('connected', onConnected)
  //     target.addEventListener('disconnected', onDisconnected)

  //     return () => {
  //         target.removeEventListener('connected', onConnected)
  //         target.removeEventListener('disconnected', onDisconnected)
  //     }
  // })
  // return () => handlers.forEach((cleanup) => cleanup())
})
//   }, [gl, set])
watchEffect(() => {
  globalSessionStore.$subscribe(() => {
    console.log('watch effect global ses to state')
    session.value = globalSessionStore.session
  })
})

watchEffect(() => {
  console.log('watch effect fov')
  const { foveation } = props

  renderer.value.xr.setFoveation(foveation)
})

watchEffect(() => {
  console.log('watch effect framerate')
  /* const { frameRate } = props */

  // try {
  // if (frameRate) globalSessionStore.session?.updateTargetFrameRate?.(frameRate)
  // } catch (_) {
  // Framerate not supported or configurable
  // }
})

watchEffect(() => {
  console.log('cam', camera.value)
  console.log('watch effect ref space')
  const { referenceSpace } = props

  renderer.value.xr.setReferenceSpaceType(referenceSpace)
  globalSessionStore.referenceSpaceType = referenceSpace
})

/* const handleSessionStart = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = true
  //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
} */
/* const handleSessionEnd = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = false
  session.value = null
  globalSessionStore.session = null
  //   onSessionEndRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
} */
/* const handleVisibilityChange = (_nativeEvent: XRSessionEvent) => {
  //   onVisibilityChangeRef.current?.({ nativeEvent, target: session })
} */
/* const handleInputSourcesChange = (_nativeEvent: XRInputSourceChangeEvent) => {
  isHandTracking.value = Object.values(session.inputSources).some(source => source.hand)
  //   onInputSourcesChangeRef.current?.({ nativeEvent, target: session })
} */

/* watchEffect(() => {
  console.log('watch effect session handling', session)
  const { xr } = renderer.value
  if (!session) { return void xr.setSession(null!) }

  xr.addEventListener('sessionstart', handleSessionStart)
  xr.addEventListener('sessionend', handleSessionEnd)
  session.value.addEventListener('visibilitychange', handleVisibilityChange)
  session.value.addEventListener('inputsourceschange', handleInputSourcesChange)

  renderer.value.xr.setSession(session.value).then(() => {
    // on setSession, three#WebXRManager resets foveation to 1
    // so foveation set needs to happen after it
    console.log('renderer xr set session', session, renderer.value.xr)
    renderer.value.xr.setFoveation(foveation)
  })
}, { onTrack: () => {
  const { xr } = renderer.value
  if (!session) { return void xr.setSession(null!) }

  xr.removeEventListener('sessionstart', handleSessionStart)
  xr.removeEventListener('sessionend', handleSessionEnd)
  session.value.removeEventListener('visibilitychange', handleVisibilityChange)
  session.value.removeEventListener('inputsourceschange', handleInputSourcesChange)
} }) */
</script>

<template>
  <InteractionManager>
    <primitive :object="player" />
    <!-- <TresPerspectiveCamera /> -->
    <primitive :object="XRCamera" />
    <primitive v-for="(controller, index) in controllers" :key="index" :object="controller" />
    <slot></slot>
  </InteractionManager>
</template>
