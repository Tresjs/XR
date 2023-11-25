<template>
    <button @click="handleButtonClick">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
    import { computed, ref, onMounted } from 'vue'
    import type { Ref } from 'vue'
    import create from 'vue-zustand'

    /**
     * Filters to unique entries of an array.
     */
    const uniq = <T>(arr: T[]): T[] => Array.from(new Set<T>(arr))

    interface GlobalSessionState {
        set: SetState<GlobalSessionState>
        get: GetState<GlobalSessionState>
        session: XRSession | null
        referenceSpaceType: XRReferenceSpaceType | null
    }
    const globalSessionStore = create<GlobalSessionState>((set, get) => ({ set, get, session: null, referenceSpaceType: null }))

    export type XRButtonStatus = 'unsupported' | 'exited' | 'entered'
    export type XRButtonUnsupportedReason = 'unknown' | 'https' | 'security'

    export interface XRButtonProps {
        /** The type of `XRSession` to create */
        mode: 'AR' | 'VR' | 'inline'
        /**
         * `XRSession` configuration options
         * @see https://immersive-web.github.io/webxr/#feature-dependencies
         */
        sessionInit?: XRSessionInit
        /** Whether this button should only enter an `XRSession`. Default is `false` */
        enterOnly?: boolean
        /** Whether this button should only exit an `XRSession`. Default is `false` */
        exitOnly?: boolean
        /** This callback gets fired if XR initialization fails. */
        onError?: (error: Error) => void
    }

    const getSessionOptions = (globalStateReferenceSpaceType: XRReferenceSpaceType | null, sessionInit: XRSessionInit | undefined): XRSessionInit | undefined => {
        if (!globalStateReferenceSpaceType && !sessionInit) {
            return undefined
        }

        if (globalStateReferenceSpaceType && !sessionInit) {
            return { optionalFeatures: [globalStateReferenceSpaceType] }
        }

        if (globalStateReferenceSpaceType && sessionInit) {
            return { ...sessionInit, optionalFeatures: uniq([...(sessionInit.optionalFeatures ?? []), globalStateReferenceSpaceType]) }
        }

        return sessionInit
    }

    /**
      * Props 
      */
    const props = defineProps<XRButtonProps>()
        /** React children, can also accept a callback returning an `XRButtonStatus` */
        // children?: React.ReactNode | ((status: XRButtonStatus) => React.ReactNode)
    // })

    function handleButtonClick() {
        try {
            toggleSession(sessionMode.value, {
                sessionInit: props.sessionInit, enterOnly: props.enterOnly, exitOnly: props.exitOnly
            })
        } catch (e) {
            const onError = props.onError
            if (onError && e instanceof Error) onError(e)
            else throw e
        }
    }

    const startSession = async (sessionMode: XRSessionMode, sessionInit: XRButtonProps['sessionInit']) => {
        const xrState = globalSessionStore.getState()

        if (xrState.session) {
            console.warn('@tresjs/xr: session already started, please stop it first')
            return
        }

        const options = getSessionOptions(xrState.referenceSpaceType, sessionInit)
        const session = await navigator.xr!.requestSession(sessionMode, options)
        xrState.set(() => ({ session }))
        return session
    }

    //     export const stopSession = async () => {
    //     const xrState = globalSessionStore.getState()

    //     if (!xrState.session) {
    //         console.warn('@react-three/xr: no session to stop, please start it first')
    //         return
    //     }

    //     await xrState.session.end()
    //     xrState.set({ session: null })
    // }

    const toggleSession = async (sessionMode: XRSessionMode,
    { sessionInit, enterOnly, exitOnly }: Pick<XRButtonProps, 'sessionInit' | 'enterOnly' | 'exitOnly'> = {}
    ) => {
        const xrState = globalSessionStore.getState()

        // Bail if certain toggle way is disabled
        if (xrState.session && enterOnly) return
        if (!xrState.session && exitOnly) return

        // Exit/enter session
        if (xrState.session) {
            // return await stopSession()
            console.log('stop')
        } else {
            return await startSession(sessionMode, sessionInit)
        }
    }

    const getLabel = (status: XRButtonStatus, mode: XRButtonProps['mode'], reason: XRButtonUnsupportedReason) => {
        switch (status) {
            case 'entered':
            return `Exit ${mode}`
            case 'exited':
            return `Enter ${mode}`
            case 'unsupported':
            default:
            switch (reason) {
                case 'https':
                return 'HTTPS needed'
                case 'security':
                return `${mode} blocked`
                case 'unknown':
                default:
                return `${mode} unsupported`
            }
        }
    }

    const status: Ref<XRButtonStatus> = ref('exited')
    const reason: Ref<XRButtonUnsupportedReason> = ref('unknown')
    const mode = computed(() => {
        return props.mode
    })

    const label = computed(() => {
        return getLabel(status.value, mode.value, reason.value)
    })

    const sessionMode = computed(() => {
        return (mode.value === 'inline' ? mode.value : `immersive-${mode.value.toLowerCase()}`) as XRSessionMode
    })

    async function setStatus(statusValue: XRButtonStatus) {
        status.value = statusValue
    }

    async function setReason(reasonValue: XRButtonUnsupportedReason) {
        reason.value = reasonValue
    }

    onMounted(() => {
        globalSessionStore.subscribe((state) => {
            if (state.session) {
                setStatus('entered')
            } else if (status.value !== 'unsupported') {
                setStatus('exited')
            }
        })

        if (!navigator?.xr) return void setStatus('unsupported')

        navigator.xr
            .isSessionSupported(sessionMode.value)
            .then((supported) => {
                if (!supported) {
                    const isHttps = location.protocol === 'https:'
                    setStatus('unsupported')
                    setReason(isHttps ? 'unknown' : 'https')
                } else {
                    setStatus('exited')
                }
            }).catch((error) => {
                setStatus('unsupported')
                // https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/isSessionSupported#exceptions
                if ('name' in error && error.name === 'SecurityError') {
                    setReason('security')
                } else {
                    setReason('unknown')
                }
            })
    })
</script>