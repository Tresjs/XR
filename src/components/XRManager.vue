<script setup lang="ts">
    import { XRProps } from '../types/xr'
    import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

    /**
      * Props 
      */
    const props = defineProps<XRProps>()

    // TODO: Replace primitives with intended components
    // Create a box geometry and a basic material
    const geometry = new BoxGeometry(1, 1, 1)

    // Create a mesh with the geometry and material
    const player = new Mesh(geometry, new MeshBasicMaterial({ color: 0x00ff00 }))
    const camera = new Mesh(geometry, new MeshBasicMaterial({ color: 0xff0000 }))
</script>

<template>
    <TresGroup>
        <primitive :object="player" />
        <primitive :object="camera" />
    </TresGroup>
</template>