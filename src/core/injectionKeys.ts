import type { InjectionKey } from 'vue'
import type { XRContext } from '../composables/useXR'

export const xrInjectionKey: InjectionKey<XRContext | null> = Symbol('tres-xr')
