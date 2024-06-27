import type { Group, Intersection, Object3D } from 'three'
import type { InjectionKey, Ref } from 'vue'
import type { XRInteractionHandler, XRInteractionType } from '../types/interaction'
import type { XRController } from '../classes/XRController'

export interface XrContext {
  isPresenting: Ref<boolean>
  isHandTracking: Ref<boolean>
  player: Group
  session: Ref<XRSession | null>
  controllers: Ref<XRController[]>
  foveation: number
  frameRate?: number
  hoverState: Record<XRHandedness, Map<Object3D, Intersection>>
  interactions: Map<Object3D, Record<XRInteractionType, Ref<XRInteractionHandler>[]>>
  hasInteraction: (_object: Object3D, _eventType: XRInteractionType) => boolean
  getInteraction: (_object: Object3D, _eventType: XRInteractionType) => XRInteractionHandler[] | undefined
  addInteraction: (_object: Object3D, _eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
  removeInteraction: (_object: Object3D, _eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
}

export const xrInjectionKey: InjectionKey<XrContext | null> = Symbol('tres-xr')
