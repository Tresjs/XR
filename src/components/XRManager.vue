<script setup lang="ts">
    import { inject, watchEffect } from 'vue'
    import { XRProps, XRManagerEvent } from '../types/xr'
    import InteractionManager from './InteractionManager.vue'
    import { useTresContext } from '@tresjs/core'
    import { useGlobalSessionStore } from '../stores/globalSession'
    import { XRController } from '../classes/XRController'
    const { renderer, camera } = useTresContext()
    // TODO: Grab renderer from tres context and use as GL var
    const globalSessionStore = useGlobalSessionStore()

    /**
      * Props 
      */
    const props = withDefaults(defineProps<XRProps>(), {
        foveation: 0,
        frameRate: undefined,
        referenceSpace: 'local-floor'
    })

    const state = inject('state')
    const {player, session, controllers} = state

    watchEffect(() => {
        const handlers = [0, 1].map((id) => {
            const target = new XRController(id, renderer.value)
            const onConnected = () => {
                state.controllers = [...state.controllers, target]
            }
            const onDisconnected = () => {
                state.controllers = state.controllers.filter((it) => it !== target)
            }

            target.addEventListener('connected', onConnected)
            target.addEventListener('disconnected', onDisconnected)

            return () => {
                target.removeEventListener('connected', onConnected)
                target.removeEventListener('disconnected', onDisconnected)
            }
        })
        // return () => handlers.forEach((cleanup) => cleanup())
    })
    //   }, [gl, set])
    watchEffect(() => {
        globalSessionStore.$subscribe(() => {
            state.session = globalSessionStore.session
        })
    })

    watchEffect(() => {
        const {foveation} = props

        renderer.value.xr.setFoveation(foveation)
    })

    watchEffect(() => {
        const {frameRate} = props

        try {
            if (frameRate) globalSessionStore.session?.updateTargetFrameRate?.(frameRate)
        } catch (_) {
            // Framerate not supported or configurable
        }
    })

    watchEffect(() => {
        const {referenceSpace} = props

        renderer.value.xr.setReferenceSpaceType(referenceSpace)
        globalSessionStore.referenceSpaceType = referenceSpace
    })

    watchEffect(() => {
        if (!session) return void renderer.value.xr.setSession(null!)

    const handleSessionStart = (nativeEvent: XRManagerEvent) => {
        state.isPresenting = true
    //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
    }
    const handleSessionEnd = (nativeEvent: XRManagerEvent) => {
        Object.assign(state, {isPresenting: false, session: null})
        globalSessionStore.session = null
    //   onSessionEndRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
    }
    const handleVisibilityChange = (nativeEvent: XRSessionEvent) => {
    //   onVisibilityChangeRef.current?.({ nativeEvent, target: session })
    }
    const handleInputSourcesChange = (nativeEvent: XRInputSourceChangeEvent) => {
      const isHandTracking = Object.values(session.inputSources).some((source) => source.hand)
      Object.assign(state, {isHandTracking})
    //   onInputSourcesChangeRef.current?.({ nativeEvent, target: session })
    }

    renderer.value.xr.addEventListener('sessionstart', handleSessionStart)
    renderer.value.xr.addEventListener('sessionend', handleSessionEnd)
    session.addEventListener('visibilitychange', handleVisibilityChange)
    session.addEventListener('inputsourceschange', handleInputSourcesChange)

    renderer.value.xr.setSession(session).then(() => {
      // on setSession, three#WebXRManager resets foveation to 1
      // so foveation set needs to happen after it
      renderer.value.xr.setFoveation(state.foveation)
    })

    return () => {
        renderer.value.xr.removeEventListener('sessionstart', handleSessionStart)
        renderer.value.xr.removeEventListener('sessionend', handleSessionEnd)
        session.removeEventListener('visibilitychange', handleVisibilityChange)
        session.removeEventListener('inputsourceschange', handleInputSourcesChange)
    }
})
//   }, [session, gl.xr, set, get])
</script>

<template>
    <InteractionManager>
        <primitive :object="player" />
        <primitive v-if="camera" :object="camera" />
        <primitive v-for="(controller, index) in controllers" :key="index" :object="controller" />
    </InteractionManager>
</template>