<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, inject, onMounted, unref, watch, watchEffect } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import type { XRManagerEvent, XRProps } from '../types/xr'
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
const { renderer, camera, scene, render: renderCtx } = useTresContext()
// TODO: Grab renderer from tres context and use as GL var
const globalSessionStore = useGlobalSessionStore()

const XRCamera = computed(() => {
  return camera?.value ?? {}
})

const {
  session,
  player,
  controllers,
  isPresenting,
  isHandTracking,
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

const handleSessionStart = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = true
  //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
}
const handleSessionEnd = (_nativeEvent: XRManagerEvent) => {
  isPresenting.value = false
  session.value = null
  globalSessionStore.session = null
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
    <!--  <primitive :object="player" />
    <primitive :object="XRCamera" />
    <primitive v-for="(controller, index) in controllers" :key="index" :object="controller" /> -->
    <slot></slot>
  </InteractionManager>
</template>
