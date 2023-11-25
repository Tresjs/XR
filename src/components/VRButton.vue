<template>
    <XRButton mode="VR" v-bind="{sessionInit}" :style="buttonStyles"></XRButton>
</template>

<script setup lang="ts">
    import XRButton from './XRButton.vue'

    import { buttonStyles } from './buttonStyles'

    const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }
</script>