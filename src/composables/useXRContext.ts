import { ref } from 'vue'

export function useXRContext() {
  const session = ref(null)
  const referenceSpaceType = ref(null)

  return { session, referenceSpaceType }
}
