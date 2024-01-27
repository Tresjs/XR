import { XRController } from '../classes/XRController'

export interface XRInteractionEvent {
    intersection?: THREE.Intersection
    intersections: THREE.Intersection[]
    target: XRController
}

  export type XRInteractionType =
  | 'onHover'
  | 'onBlur'
  | 'onSelect'
  | 'onSelectEnd'
  | 'onSelectStart'
  | 'onSelectMissed'
  | 'onSqueeze'
  | 'onSqueezeEnd'
  | 'onSqueezeStart'
  | 'onSqueezeMissed'
  | 'onMove'

  export type XRInteractionHandler = (event: XRInteractionEvent) => void