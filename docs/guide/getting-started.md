# Installation

Add Tres XR to an existing Tres JS project

::: code-group

```bash [pnpm]
pnpm add @tresjs/xr
```

```bash [npm]
npm install @tresjs/xr
```

```bash [yarn]
yarn add @tresjs/xr
```

## Getting started

You can install Tres XR as any other Vue plugin

```ts
import { createApp } from 'vue'
import TresXr from '@tresjs/xr'
import App from './App.vue'

export const app = createApp(App)

app.use(TresXr)
app.mount('#app')
```

Or you can use it directly in your component

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { VRButton, XR } from '@tresjs/xr'
</script>

<template>
  <VRButton />
  <TresCanvas window-size>
    <XR>
      <!-- Your scene here -->
    </XR>
  </TresCanvas>
</template>
```

::: tip
This is recommended for performance and bundle size reasons, tree-shaking will work better and you will only import the components that you use.
:::