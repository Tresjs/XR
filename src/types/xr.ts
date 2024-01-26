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