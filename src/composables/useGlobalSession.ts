import { ref } from 'vue'
import { useLogger } from './useLogger'

const session = ref<XRSession | null>(null)
const referenceSpace = ref<XRReferenceSpaceType | null>(null)
const mode = ref<XRSessionMode>('immersive-vr')

export function useGlobalSession() {
  const { logWarning, logError } = useLogger()

  const startSession = async (options: XRSessionInit) => {
    if (session.value) {
      logWarning('session already started, please stop it first')
      return
    }

    try {
      session.value = await navigator.xr!.requestSession(mode.value, options)
    }
    catch (error) {
      logError('Failed to start session:', error)
    }
  }

  const endSession = async () => {
    if (!session.value) {
      logWarning('no session to stop, please start it first')
      return
    }

    try {
      await session.value.end()
    }
    catch (error) {
      logError('Failed to end session:', error)
    }
    finally {
      session.value = null
    }
  }

  return {
    session,
    referenceSpace,
    mode,
    startSession,
    endSession,
  }
}
