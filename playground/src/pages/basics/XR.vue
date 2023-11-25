<script setup lang="ts">
  import { TresCanvas } from '@tresjs/core'
  import { VRButton } from '@tresjs/xr'
</script>

<template>
  <div>
    <VRButton>Immersive Experience</VRButton>
    <TresCanvas window-size>
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
