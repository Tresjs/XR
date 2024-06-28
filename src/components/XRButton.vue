<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue'
// Composables
import type { Ref } from 'vue'
import type { XRButtonProps, XRButtonStatus, XRButtonUnsupportedReason } from '../types/xr'
import { filterUniq } from '../utils/helpers'
import { useGlobalSession } from '../composables/useGlobalSession'

/**
 * Props
 */
const props = withDefaults(defineProps<XRButtonProps>(), {
  mode: 'VR',
  enterOnly: false,
  exitOnly: false,
})

const { mode } = toRefs(props)

const status: Ref<XRButtonStatus> = ref('exited') // 'entered' | 'exited' | 'unsupported'
const reason: Ref<XRButtonUnsupportedReason> = ref('unknown') // 'https' | 'security' | 'unknown'

const sessionMode = computed(() => {
  return (mode.value === 'inline' ? mode.value : `immersive-${mode.value.toLowerCase()}`) as XRSessionMode
})

function setStatus(statusValue: XRButtonStatus) {
  status.value = statusValue
}

function setReason(reasonValue: XRButtonUnsupportedReason) {
  reason.value = reasonValue
}

watchEffect(() => {
  if (!navigator?.xr) { return void setStatus('unsupported') }

  navigator.xr
    .isSessionSupported(sessionMode.value)
    .then((supported) => {
      if (!supported) {
        const isHttps = location.protocol === 'https:'
        setStatus('unsupported')
        setReason(isHttps ? 'unknown' : 'https')
      }
      else {
        setStatus('exited')
      }
    }).catch((error) => {
      setStatus('unsupported')
      // https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/isSessionSupported#exceptions
      if ('name' in error && error.name === 'SecurityError') {
        setReason('security')
      }
      else {
        setReason('unknown')
      }
    })
})

const label = computed(() => {
  switch (status.value) {
    case 'entered':
      return `Exit ${mode.value}`
    case 'exited':
      return `Enter ${mode.value}`
    case 'unsupported':
    default:
      switch (reason.value) {
        case 'https':
          return 'HTTPS needed'
        case 'security':
          return `${mode.value} blocked`
        case 'unknown':
        default:
          return `${mode.value} unsupported`
      }
  }
})

const { session, mode: modeCtx, startSession, endSession, referenceSpace } = useGlobalSession()

const sessionOptions = computed<XRSessionInit | undefined>(() => {
  if (!referenceSpace?.value && !props.sessionInit) {
    return undefined
  }

  if (referenceSpace?.value && !props.sessionInit) {
    return { optionalFeatures: [referenceSpace?.value] }
  }

  if (referenceSpace?.value && props.sessionInit) {
    return { ...props.sessionInit, optionalFeatures: filterUniq([...(props.sessionInit.optionalFeatures ?? []), referenceSpace?.value]) }
  }

  return props.sessionInit
})

const toggleSession = async ({ enterOnly, exitOnly }: Pick<XRButtonProps, 'sessionInit' | 'enterOnly' | 'exitOnly'> = {},
) => {
  // Bail if certain toggle way is disabled
  if (session.value && enterOnly) { return }
  if (!session.value && exitOnly) { return }

  // Exit/enter session
  if (session.value) {
    status.value = 'exited'
    return await endSession()
  }
  else {
    const options = sessionOptions.value as XRSessionInit
    status.value = 'entered'
    return await startSession(options)
  }
}

function handleButtonClick() {
  modeCtx.value = sessionMode.value
  try {
    toggleSession({
      enterOnly: props.enterOnly,
      exitOnly: props.exitOnly,
    })
  }
  catch (e) {
    const onError = props.onError
    if (onError && e instanceof Error) {
      onError(e)
    }
    else { throw e }
  }
}

/* const globalSessionStore = useGlobalSessionStore()

const getSessionOptions = (globalStateReferenceSpaceType: XRReferenceSpaceType | null, sessionInit: XRSessionInit | undefined): XRSessionInit | undefined => {
  if (!globalStateReferenceSpaceType && !sessionInit) {
    return undefined
  }

  if (globalStateReferenceSpaceType && !sessionInit) {
    return { optionalFeatures: [globalStateReferenceSpaceType] }
  }

  if (globalStateReferenceSpaceType && sessionInit) {
    return { ...sessionInit, optionalFeatures: filterUniq([...(sessionInit.optionalFeatures ?? []), globalStateReferenceSpaceType]) }
  }

  return sessionInit
}

const startSession = async (sessionMode: XRSessionMode, sessionInit: XRButtonProps['sessionInit']) => {
  if (globalSessionStore.session) {
    console.warn('@tresjs/xr: session already started, please stop it first')
    return
  }

  const options = getSessionOptions(globalSessionStore.referenceSpaceType, sessionInit)
  const session = await navigator.xr!.requestSession(sessionMode, options)
  // eslint-disable-next-line no-console
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

const toggleSession = async (sessionMode: XRSessionMode, { sessionInit, enterOnly, exitOnly }: Pick<XRButtonProps, 'sessionInit' | 'enterOnly' | 'exitOnly'> = {},
) => {
  // Bail if certain toggle way is disabled
  if (globalSessionStore.session && enterOnly) { return }
  if (!globalSessionStore.session && exitOnly) { return }

  // Exit/enter session
  if (globalSessionStore.session) {
    return await stopSession()
  }
  else {
    return await startSession(sessionMode, sessionInit)
  }
}

const status: Ref<XRButtonStatus> = ref('exited')
const reason: Ref<XRButtonUnsupportedReason> = ref('unknown')
const mode = computed(() => {
  return props.mode
})

const sessionMode = computed(() => {
  return (mode.value === 'inline' ? mode.value : `immersive-${mode.value.toLowerCase()}`) as XRSessionMode
})

const label = computed(() => {
  switch (status.value) {
    case 'entered':
      return `Exit ${mode.value}`
    case 'exited':
      return `Enter ${mode.value}`
    case 'unsupported':
    default:
      switch (reason.value) {
        case 'https':
          return 'HTTPS needed'
        case 'security':
          return `${mode.value} blocked`
        case 'unknown':
        default:
          return `${mode.value} unsupported`
      }
  }
})

async function setStatus(statusValue: XRButtonStatus) {
  status.value = statusValue
}

async function setReason(reasonValue: XRButtonUnsupportedReason) {
  reason.value = reasonValue
}

function handleButtonClick() {
  try {
    toggleSession(sessionMode.value, {
      sessionInit: props.sessionInit,
      enterOnly: props.enterOnly,
      exitOnly: props.exitOnly,
    })
  }
  catch (e) {
    const onError = props.onError
    if (onError && e instanceof Error) {
      onError(e)
    }
    else { throw e }
  }
}

globalSessionStore.$subscribe((_mutation, state) => {
  if (state.session) {
    setStatus('entered')
  }
  else if (status.value !== 'unsupported') {
    setStatus('exited')
  }
})

watchEffect(() => {
  if (!navigator?.xr) { return void setStatus('unsupported') }

  navigator.xr
    .isSessionSupported(sessionMode.value)
    .then((supported) => {
      if (!supported) {
        const isHttps = location.protocol === 'https:'
        setStatus('unsupported')
        setReason(isHttps ? 'unknown' : 'https')
      }
      else {
        setStatus('exited')
      }
    }).catch((error) => {
      setStatus('unsupported')
      // https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/isSessionSupported#exceptions
      if ('name' in error && error.name === 'SecurityError') {
        setReason('security')
      }
      else {
        setReason('unknown')
      }
    })
}) */
</script>

<template>
  <button @click="handleButtonClick">
    {{ label }}
  </button>
</template>
