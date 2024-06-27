import type { Group, Intersection, Object3D } from 'three'
import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { XRInteractionHandler, XRInteractionType } from '../types/interaction'

export interface XrContext {
  isPresenting: boolean
  isHandTracking: boolean
  player: Group
  session: XRSession | null
  foveation: number
  frameRate?: number
  hoverState: Record<XRHandedness, Map<Object3D, Intersection>>
  interactions: Map<Object3D, Record<XRInteractionType, Ref<XRInteractionHandler>[]>>
  hasInteraction: (object: Object3D, eventType: XRInteractionType) => boolean
  getInteraction: (object: Object3D, eventType: XRInteractionType) => XRInteractionHandler[] | undefined
  addInteraction: (object: Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
  removeInteraction: (object: Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
}

export const xrInjectionKey: InjectionKey<ShallowRef<XrContext | null>> = Symbol('tres-xr')
