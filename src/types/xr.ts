export interface GlobalSessionState {
  session: XRSession | null
  referenceSpaceType: XRReferenceSpaceType | null
}

export type XRManagerEventType = 'sessionstart' | 'sessionend'

export interface XRManagerEvent {
    type: XRManagerEventType
    target: XRSession
}

export interface XREventRepresentation {
    type: string
    target: any
  }
  export interface XREvent<T extends XREventRepresentation> {
    nativeEvent: T
    target: T['target']
  }
  
  export type XRControllerEventType = Exclude<THREE.XRControllerEventType, XRSessionEventType>
  export interface XRControllerEvent {
    type: XRControllerEventType
    // target: XRController
    data?: XRInputSource
    fake?: boolean
  }
  
  export type XREventHandler<T extends XREventRepresentation> = (event: XREvent<T>) => void
  export interface XREventOptions {
    handedness?: XRHandedness
  }


export interface XRProps {
    /**
     * Enables foveated rendering. `Default is `0`
     * 0 = no foveation, full resolution
     * 1 = maximum foveation, the edges render at lower resolution
    */
   foveation?: number
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
  referenceSpace?: XRReferenceSpaceType
  /** Called as an XRSession is requested */
  onSessionStart?: XREventHandler<XRManagerEvent>
  /** Called after an XRSession is terminated */
  onSessionEnd?: XREventHandler<XRManagerEvent>
  /** Called when an XRSession is hidden or unfocused. */
  onVisibilityChange?: XREventHandler<XRSessionEvent>
  /** Called when available inputsources change */
  onInputSourcesChange?: XREventHandler<XRSessionEvent>
}

export type XRButtonStatus = 'unsupported' | 'exited' | 'entered'
export type XRButtonUnsupportedReason = 'unknown' | 'https' | 'security'

export interface XRButtonProps {
    /** The type of `XRSession` to create */
    mode: 'AR' | 'VR' | 'inline'
    /**
     * `XRSession` configuration options
     * @see https://immersive-web.github.io/webxr/#feature-dependencies
     */
    sessionInit?: XRSessionInit
    /** Whether this button should only enter an `XRSession`. Default is `false` */
    enterOnly?: boolean
    /** Whether this button should only exit an `XRSession`. Default is `false` */
    exitOnly?: boolean
    /** This callback gets fired if XR initialization fails. */
    onError?: (error: Error) => void
  }

  export interface XRState {
    isPresenting: boolean
    isHandTracking: boolean
    player: THREE.Group
    session: XRSession | null
    foveation: number
    frameRate?: number
  }