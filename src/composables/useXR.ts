import type { Intersection, Object3D } from 'three'
import { Group } from 'three'
import { type Ref, inject, provide, ref, toRefs } from 'vue'
import type { XRController } from '../classes/XRController'
import { xrInjectionKey } from '../core/injectionKeys'
import type { XRInteractionHandler, XRInteractionType } from '../types/interaction'
import type { XRMode, XRProps } from '../types/xr'

export interface XRContext {
  isPresenting: Ref<boolean>
  isHandTracking: Ref<boolean>
  player: Group
  session: Ref<XRSession | null>
  mode: Ref<XRMode>
  controllers: Ref<XRController[]>
  /**
   * Enables foveated rendering. `Default is `0`
   * 0 = no foveation, full resolution
   * 1 = maximum foveation, the edges render at lower resolution
   */
  foveation: Ref<number>
  /**
   * The target framerate for the XRSystem. Smaller rates give more CPU headroom at the cost of responsiveness.
   * Recommended range is `72`-`120`. Default is unset and left to the device.
   * @note If your experience cannot effectively reach the target framerate, it will be subject to frame reprojection
   * which will halve the effective framerate. Choose a conservative estimate that balances responsiveness and
   * headroom based on your experience.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Rendering#refresh_rate_and_frame_rate
   */
  frameRate?: number
  /** Type of WebXR reference space to use. Default is `local-floor` */
  referenceSpace?: Ref<XRReferenceSpaceType>
  hoverState: Record<XRHandedness, Map<Object3D, Intersection>>
  interactions: Map<Object3D, Record<XRInteractionType, Ref<XRInteractionHandler>[]>>
  hasInteraction: (_object: Object3D, _eventType: XRInteractionType) => boolean
  getInteraction: (_object: Object3D, _eventType: XRInteractionType) => XRInteractionHandler[] | undefined
  addInteraction: (_object: Object3D, _eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
  removeInteraction: (_object: Object3D, _eventType: XRInteractionType, handlerRef: Ref<XRInteractionHandler>) => void
}

export function useXRContextProvider(props: XRProps) {
  const { referenceSpace, foveation } = toRefs(props)
  const ctx: XRContext = {
    controllers: ref([]),
    isPresenting: ref(false),
    isHandTracking: ref(false),
    mode: ref('immersive-vr'),
    player: new Group(),
    session: ref(null),
    foveation,
    referenceSpace,
    hoverState: {
      left: new Map(),
      right: new Map(),
      none: new Map(),
    },
    interactions: new Map(),
    hasInteraction(_object: Object3D, _eventType: XRInteractionType) {
      return false
      // return !!get()
      //   .interactions.get(object)
      //   ?.[eventType].some((handlerRef) => handlerRef.current)
    },
    getInteraction(_object: Object3D, _eventType: XRInteractionType) {
      // return get()
      //   .interactions.get(object)
      //   ?.[eventType].reduce((result, handlerRef) => {
      //   if (handlerRef.current) {
      //     result.push(handlerRef.current)
      //   }
      //     return result
      //   }, [] as XRInteractionHandler[])
    },
    addInteraction(_object: Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
      // const interactions = get().interactions
      // if (!interactions.has(object)) {
      //   interactions.set(object, {
      //     onHover: [],
      //     onBlur: [],
      //     onSelect: [],
      //     onSelectEnd: [],
      //     onSelectStart: [],
      //     onSelectMissed: [],
      //     onSqueeze: [],
      //     onSqueezeEnd: [],
      //     onSqueezeStart: [],
      //     onSqueezeMissed: [],
      //     onMove: []
      //   })
      // }
    },
    removeInteraction(_object: Object3D, _eventType: XRInteractionType, _handlerRef: Ref<XRInteractionHandler>) {
      // const target = get().interactions.get(object)
      // if (target) {
      //   const interactionIndex = target[eventType].indexOf(handlerRef)
      //   if (interactionIndex !== -1) target[eventType].splice(interactionIndex, 1)
      // }
    },
    /* addSessionEventListener: (event, eventListener) => {
      if (ctx.session) {
        ctx.session.addEventListener(event, eventListener)
      }
    },
    removeSessionEventListener: (event, eventListener) => {
      if (ctx.session) {
        ctx.session.removeEventListener(event, eventListener)
      }
    }, */
  }
  provide(xrInjectionKey, ctx)
}

export function useXRContext(): XRContext {
  const context = inject<Partial<XRContext>>(xrInjectionKey)

  if (!context) {
    throw new Error('useXRContext must be used together with useXRContextProvider')
  }

  return context as XRContext
}

export const useXR = useXRContext
