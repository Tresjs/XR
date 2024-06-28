<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { VRButton, XR } from '@tresjs/xr'

function onSessionStart() {
  console.log('session started')
}
function onError(error) {
  console.log('error callback', error)
}
</script>

<template>
  <div>
    <VRButton />
    <TresCanvas window-size alpha>
      <TresPerspectiveCamera :position="[0, 0, 0]" />
      <XR v-bind="{ onSessionStart, onError }">
        <TresMesh :position="[-2, 0, -5]">
          <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
      </XR>
      <TresMesh :position="[2, 0, -5]">
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
