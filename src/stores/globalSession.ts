import { defineStore } from 'pinia'
import type { GlobalSessionState } from '../types/xr'

export const useGlobalSessionStore = defineStore('globalSession', {
  state: (): GlobalSessionState => {
    return {
      session: null,
      referenceSpaceType: null,
    }
  },
})
