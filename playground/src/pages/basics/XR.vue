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
    <TresCanvas window-size>
      <XR v-bind="{onSessionStart, onError}">
        <TresMesh>
          <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
      </XR>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
