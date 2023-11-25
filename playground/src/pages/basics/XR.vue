<script setup lang="ts">
  import { TresCanvas } from '@tresjs/core'
  import { XRButton } from '@tresjs/xr'
</script>

<template>
  <div>
    <XRButton mode="VR">Immersive Experience</XRButton>
    <TresCanvas>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
