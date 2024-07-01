<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/xr'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera
      :position="[0, 2, 6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 1, 0]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody>
          <TresMesh>
            <TresPlaneGeometry :rotate-x="-Math.PI / 2" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
