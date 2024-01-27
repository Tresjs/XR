import type { Ref } from 'vue'
import { XRInteractionType, XRInteractionHandler } from './interaction'

export interface XRState {
    isPresenting: boolean
    isHandTracking: boolean
    player: THREE.Group
    session: XRSession | null
    foveation: number
    frameRate?: number
    hoverState: Record<XRHandedness, Map<THREE.Object3D, THREE.Intersection>>
    interactions: Map<THREE.Object3D, Record<XRInteractionType, Ref<XRInteractionHandler>[]>>
    hasInteraction: (object: THREE.Object3D, eventType: XRInteractionType) => boolean
    getInteraction: (object: THREE.Object3D, eventType: XRInteractionType) => XRInteractionHandler[] | undefined
    addInteraction: (object: THREE.Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
    removeInteraction: (object: THREE.Object3D, eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
}