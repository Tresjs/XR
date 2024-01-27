<script setup lang="ts">
    import { XRProps } from '../types/xr'
    import InteractionManager from './InteractionManager.vue'
    import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
    import { useTresContext } from '@tresjs/core'
    import { useGlobalSessionStore } from '../stores/globalSession'
    import { XRManagerEvent } from '../types'
    import { onMounted } from 'vue'
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

    // TODO: Replace primitives with intended components
    // Create a box geometry and a basic material
    const geometry = new BoxGeometry(1, 1, 1)

    // Create a mesh with the geometry and material
    const player = new Mesh(geometry, new MeshBasicMaterial({ color: 0x00ff00 }))

    // globalSessionStore.$subscribe((mutation, state) => {
    //     renderer.value.xr = state.session
    // })
    onMounted(() => {
        const {foveation} = props

        renderer.value.xr.setFoveation(foveation)
    })

    onMounted(() => {
        const {frameRate} = props

        try {
            if (frameRate) globalSessionStore.session?.updateTargetFrameRate?.(frameRate)
        } catch (_) {
            // Framerate not supported or configurable
        }
    })

    onMounted(() => {
        const {referenceSpace} = props

        renderer.value.xr.setReferenceSpaceType(referenceSpace)
        globalSessionStore.referenceSpaceType = referenceSpace
    })

    onMounted(() => {
    // if (!session) return void gl.xr.setSession(null!)

    const handleSessionStart = (nativeEvent: XRManagerEvent) => {
    //   set(() => ({ isPresenting: true }))
    //   onSessionStartRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
    }
    const handleSessionEnd = (nativeEvent: XRManagerEvent) => {
    //   set(() => ({ isPresenting: false, session: null }))
    //   globalSessionStore.setState(() => ({ session: null }))
    //   onSessionEndRef.current?.({ nativeEvent: { ...nativeEvent, target: session }, target: session })
    }
    const handleVisibilityChange = (nativeEvent: XRSessionEvent) => {
    //   onVisibilityChangeRef.current?.({ nativeEvent, target: session })
    }
    const handleInputSourcesChange = (nativeEvent: XRInputSourceChangeEvent) => {
    //   const isHandTracking = Object.values(session.inputSources).some((source) => source.hand)
    //   set(() => ({ isHandTracking }))
    //   onInputSourcesChangeRef.current?.({ nativeEvent, target: session })
    }

    renderer.value.xr.addEventListener('sessionstart', handleSessionStart)
    renderer.value.xr.addEventListener('sessionend', handleSessionEnd)
    // session.addEventListener('visibilitychange', handleVisibilityChange)
    // session.addEventListener('inputsourceschange', handleInputSourcesChange)

    // renderer.value.xr.setSession(session).then(() => {
      // on setSession, three#WebXRManager resets foveation to 1
      // so foveation set needs to happen after it
//       renderer.value.xr.setFoveation(get().foveation)
    })

//     return () => {
//       gl.xr.removeEventListener('sessionstart', handleSessionStart)
//       gl.xr.removeEventListener('sessionend', handleSessionEnd)
//       session.removeEventListener('visibilitychange', handleVisibilityChange)
//       session.removeEventListener('inputsourceschange', handleInputSourcesChange)
//     }
//   }, [session, gl.xr, set, get])
    // })
</script>

<template>
    <InteractionManager>
        <primitive :object="player" />
        <Suspense>
            <!-- <primitive :object="camera" /> -->
        </Suspense>
    </InteractionManager>
</template>