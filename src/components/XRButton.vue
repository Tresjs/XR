<template>
    <button @click="handleButtonClick">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
    import { computed, ref, watchEffect } from 'vue'
    // Composables
    import { useHelpers } from '../composables/useHelpers'
    import { XRButtonProps, XRButtonStatus, XRButtonUnsupportedReason } from '../types/xr'
    // Store
    import { useGlobalSessionStore } from '../stores/globalSession'
    import type { Ref } from 'vue'

    const { uniq } = useHelpers()

    const globalSessionStore = useGlobalSessionStore()

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
    const props = withDefaults(defineProps<XRButtonProps>(), {
        enterOnly: false, exitOnly: false
    })        

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
        if (globalSessionStore.session) {
            console.warn('@tresjs/xr: session already started, please stop it first')
            return
        }

        const options = getSessionOptions(globalSessionStore.referenceSpaceType, sessionInit)
        const session = await navigator.xr!.requestSession(sessionMode, options)
        console.log('request session', sessionMode, options, session)

        globalSessionStore.session = session
        return session
    }

    const stopSession = async () => {
        if (!globalSessionStore.session) {
            console.warn('@tres/xr: no session to stop, please start it first')
            return
        }

        await globalSessionStore.session.end()
        globalSessionStore.session = null
    }

    const toggleSession = async (sessionMode: XRSessionMode,
    { sessionInit, enterOnly, exitOnly }: Pick<XRButtonProps, 'sessionInit' | 'enterOnly' | 'exitOnly'> = {}
    ) => {
        // Bail if certain toggle way is disabled
        if (globalSessionStore.session && enterOnly) return
        if (!globalSessionStore.session && exitOnly) return

        // Exit/enter session
        if (globalSessionStore.session) {
            return await stopSession()
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

    globalSessionStore.$subscribe((mutation, state) => {
        if (state.session) {
          setStatus('entered')
        } else if (status.value !== 'unsupported') {
          setStatus('exited')
        }
    })

    watchEffect(() => {
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