![repository-banner.png](/public/repo-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/xr?color=%2382DBCA" alt="npm package"></a>

<a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>

</p>
<br/>

# XR

> Vue components and composable functions to build AR/VR experiences with [TresJS](https://tresjs.org)

- ⚡️ Powered by Vite
- 🦾 Fully Typed

## Installation

```bash
pnpm i @tresjs/xr
```

## Docs

Checkout the [docs](https://xr.tresjs.org/)

## Demos

- [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs)

## Contributing

We are open to contributions, please read the [contributing guide](https://github.com/Tresjs/tres/blob/main/CONTRIBUTING.md) to get started.

### Build

To build the package run:

```bash
pnpm run build
```

### Playground

To run the playground run, its a great way to test the components and helpers locally:

First install dependencies

```
pnpm i
```

And then to run the development server on http://localhost:5173

```bash
pnpm run playground
```

### Test

TODO...

### Docs

To run de docs in dev mode

```bash
pnpm run docs:dev
```

To build them

```bash
pnpm run docs:build
```

## License

[MIT](/LICENSE)

## Sponsors

Be the first to support this project [here](https://github.com/sponsors/tresjs) ☺️

## Logic
- Watch effects trigger for first time
- VRButton is clicked
- handleButtonClick method of XRButton is triggered
- toggleSession is called
- startSession is called
- XR session is requested
- XR session is saved to global session pinia store
- Set status as entered
- Save copy of global session XR session to provided state
- Watch effects trigger for second time (after reactive depedencies update)
