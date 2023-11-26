// export function useXR<T = XRState>(
//     selector: StateSelector<XRState, T> = (state) => state as unknown as T,
//     equalityFn?: EqualityChecker<T>
//   ) {
//     const store = React.useContext(XRContext)
//     if (!store) throw new Error('useXR must be used within an <XR /> component!')
//     return store(selector, equalityFn)
//   }
  
//   export function useController(handedness: XRHandedness) {
//     const controllers = useXR((state) => state.controllers)
//     const controller = React.useMemo(
//       () => controllers.find(({ inputSource }) => inputSource?.handedness && inputSource.handedness === handedness),
//       [handedness, controllers]
//     )
  
//     return controller
//   }
  