# Introduction

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

::: code-group

```bash [npm]
npm install @tresjs/xr
```

```bash [yarn]
yarn add @tresjs/xr
```

```bash [pnpm]
pnpm add @tresjs/xr
```

## Try it online

### Playground

You can try Tres XR online using the official [playground](https://play.tresjs.org/). Check it out:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

We have a brand new [StackBlitz](https://stackblitz.com/) starter to try Tres XR online. Check it out:

<!-- ![](/stackblitz-starter.png) -->

## Labs

We also have a showcase lab of examples made with Tres XR. Check it out [here](https://playground.tresjs.org/).

<!-- ![](/tresjs-lab.png) -->

## Motivation

XR is an interesting and engaging new immerging technology paradigm. It consolidates and encapsulates a stack of diverse hardware and software designed to allow users to enjoy personal, immersive, and exciting experiences in ways not achievable with more traditional technology.

With the explosion of popularity and interest of XR technology in recent years from consumers and enterprise users, and the mixed reality headset offerings from some of the biggest technology companies such as Meta, Apple, Microsoft, and Sony, XR is becoming more accessible to the masses and is an interesting and fun medium for developers to create web based experiences for.

With the introduction of the WebVR specification over a decade ago for web browsers (later deprecated by the now all encapsulating WebXR device API), and the emmergence of Three JS for building 3D web applications, and web frameworks for building VR specific experiences such as AFrame, the abiility to create VR experiences was for the first time simplified and accessible to web developers.

Fast forward to today where the WebXR specification offers both AR and VR functionality, XR headsets with built in browsers and advanced graphics capabilities are readily available worldwide, the most popular javascript frameworks for building any type of application (Vue/React) both have open source libraries dedicated to 3D application (Tres/React Three Fiber).

With this level of technology readily available to both Vue and React developers, it makes perfect logical sense to advance this developer experience even futher with a specialised sub-framework specifically tailored to creating XR experiences, as an Vue equivalent of React XR (React XR itself being a R3F plugin).

This is why this XR framework is invisioned to close the gap between creating XR immersive experiences, and maximising the utilisisation of the vast Vue/Tres ecosystem to provide a simple and consistent way for Vue developers to create any XR experience they can imagine.