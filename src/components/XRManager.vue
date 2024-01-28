<script setup lang="ts">
    import { computed, inject, watchEffect } from 'vue'
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

    console.log('props', props)

    const XRCamera = computed(() => {
        return camera?.value ?? {}
    })

    const {
        state, session, isHandTracking, isPresenting, addSessionEventListener, removeSessionEventListener
    } = inject('state')
    const {player, controllers} = state

    watchEffect(() => {
        console.log('handler watch effect')
        // const handlers = [0, 1].map((id) => {
        //     const target = new XRController(id, renderer.value)
        //     const onConnected = () => {
        //         state.controllers = [...state.controllers, target]
        //     }
        //     const onDisconnected = () => {
        //         state.controllers = state.controllers.filter((it) => it !== target)
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
        const {foveation} = props

        renderer.value.xr.setFoveation(foveation)
    })

    watchEffect(() => {
        console.log('watch effect framerate')
        const {frameRate} = props

        // try {
            // if (frameRate) globalSessionStore.session?.updateTargetFrameRate?.(frameRate)
        // } catch (_) {
            // Framerate not supported or configurable
        // }
    })

    watchEffect(() => {
        console.log('cam', camera.value)
        console.log('watch effect ref space')
        const {referenceSpace} = props

        renderer.value.xr.setReferenceSpaceType(referenceSpace)
        globalSessionStore.referenceSpaceType = referenceSpace
    })

    const handleSessionStart = (nativeEvent: XRManagerEvent) => {
            isPresenting.value = true
        //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
        }
        const handleSessionEnd = (nativeEvent: XRManagerEvent) => {
            isPresenting.value = false
            session.value = null
            globalSessionStore.session = null
        //   onSessionEndRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
        }
        const handleVisibilityChange = (nativeEvent: XRSessionEvent) => {
        //   onVisibilityChangeRef.current?.({ nativeEvent, target: session })
        }
        const handleInputSourcesChange = (nativeEvent: XRInputSourceChangeEvent) => {
            isHandTracking.value = Object.values(state.session.inputSources).some((source) => source.hand)
        //   onInputSourcesChangeRef.current?.({ nativeEvent, target: session })
        }

    watchEffect(() => {
        console.log('watch effect session handling', session)
        const {xr} = renderer.value
        if (!session) return void xr.setSession(null!)

        xr.addEventListener('sessionstart', handleSessionStart)
        xr.addEventListener('sessionend', handleSessionEnd)
        addSessionEventListener('visibilitychange', handleVisibilityChange)
        addSessionEventListener('inputsourceschange', handleInputSourcesChange)

        renderer.value.xr.setSession(session.value).then(() => {
            // on setSession, three#WebXRManager resets foveation to 1
            // so foveation set needs to happen after it
            console.log('renderer xr set session', session, renderer.value.xr)
            renderer.value.xr.setFoveation(state.foveation)
        })
    }, {onTrack: () => {
        const {xr} = renderer.value
        if (!session) return void xr.setSession(null!)

        xr.removeEventListener('sessionstart', handleSessionStart)
        xr.removeEventListener('sessionend', handleSessionEnd)
        removeSessionEventListener('visibilitychange', handleVisibilityChange)
        removeSessionEventListener('inputsourceschange', handleInputSourcesChange)
    }})
</script>

<template>
    <InteractionManager>
        <primitive :object="player" />
        <!-- <TresPerspectiveCamera /> -->
        <primitive :object="XRCamera" />
        <primitive v-for="(controller, index) in controllers" :key="index" :object="controller" />
        <slot />
    </InteractionManager>
</template>