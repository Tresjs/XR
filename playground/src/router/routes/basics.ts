export const basicsRoutes = [
  {
    path: '/basics/rigid-body',
    name: 'Rigid Body',
    component: () => import('../../pages/basics/RigidBodyDemo.vue'),
  },
  {
    path: '/basics/xr',
    name: 'XR',
    component: () => import('../../pages/basics/XR.vue'),
  },
]
