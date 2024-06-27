import type { InjectionKey, ShallowRef } from 'vue'

export interface XrContext {

}

export const xrInjectionKey: InjectionKey<ShallowRef<XrContext | null>> = Symbol('tres-xr')
