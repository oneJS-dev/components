
<div align="center">
  <img alt="oneJS" src="https://user-images.githubusercontent.com/98762998/210245869-21fdfcf0-4aff-41e3-a4c0-081505016f6d.svg" width="80px">
</div>
<!-- Title -->
<h1 align="center">
  <a href="https://oneJS.dev/">
    oneJS
  </a>
</h1>

<!-- Slogan -->
<p align="center">
  The <strong>one</strong> framework you need
</p>

<!-- Chip Cards -->
<p align="center">
  <!-- License -->
  <a href="https://github.com/onejs-dev/onejs-dev/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="oneJS is released under the MIT license."/>
  </a>
  <!-- Npm Version -->
  <a href="https://www.npmjs.org/package/@onejs-dev/components">
    <img src="https://img.shields.io/npm/v/@onejs-dev/core?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
  <!-- PRs -->
  <a href="https://reactnative.dev/docs/contributing">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
</p>

A **functional**, **JavaScript only**, **cross platform** framework.
<br><br>
oneJS is a next generation, open source JavaScript framework for building modern apps for web and mobile from a single codebase. oneJS is not owned by any Tech Giant; it is an independent project developed by contributors from all around the world. oneJS is based on three principles:

- **Functional:** Predictable, code efficient and easily testable. Pure functions are the building blocks of oneJS. Fall in love with the the functional programming paradigm ❤️.
- **JS Only. Really:** You can write your entire app in pure Vanilla JS or Typescript. That's write, not a single line of HTML, CSS or JSX needed. Can you believe it?
- **Cross Platform:** Write the same code for web and native apps. Simplicity is our true cross platform weapon; reduce your effort and multiply your reach! Powered by [React][react] and [React Native's][rn] new architecture.

[react]: https://reactjs.org/
[rn]: https://reactnative.dev/

## 🗂️ Repository: components

A component is a function that receives properties and returns a structure that can be rendered on the screen. This repository contains all the components offered out of the box by oneJS and functions to create your own. Head to the [docs][docs] section to discover all the [components][comopnents] you can import.

[components]: https://onejs.dev/docs

## 🚀 Get Started

Open your terminal window and navigate to the folder that will contain your app. Once there type the command below:

```
npx @onejs-dev/create-app
```
Follow the instructions in the terminal to setup your app. Once ready, type the start command:
```
npm start
```
Visit the [Start!][start] section of our website for more in depth content.

[start]: https://onejs.dev/get-started

## 🧪 Example

Our best publicity is our own code. The example below is our version of the "Hello World!" staple:
```js
/* Imports: Required modules to setup the app ================================================== */
import { app, read, update } from "@onejs-dev/core";
import { Text, View, Input } from "@onejs-dev/components";

/* State: Variable declaration  ================================================================= */
const state = { name: "World" };

/* App Component: Returns the structure to be rendered ========================================== */
const AppComponent = () => {
    return View({ content: { h: "center", v: "center", direction: "column" } })([
        Text({ style: { fontSize: 22, paddingBlock: 60 } })(`Hello ${read("name")}!`),
        Input({ type: "text", value: read("name"), onChange: update("name") })
    ]);
};

/* App Function: Renders the App Component in the screen ======================================== */
app({component: AppComponent, theme: {preset: "oneJS"}, state: state });
```
100% JavaScript as promised. You won’t have to write a single line in any other language.

Use the online [Playground][play] to put your skills to test.

[play]: https://onejs.dev/playground

## 📖 Documentation

The full oneJS documentation can be found on our [website][docs].

You do not require extensive JavaScript knowledge to become an expert in oneJS; the [learn section][learn] will take you from zero to hero! It is composed of several units, each focusing on a key topic. 

[docs]: https://onejs.dev/docs
[learn]: https://onejs.dev/learn

## ⚖️License

oneJS is MIT licensed.

<div align="center">
  <H1><H1>
  
  <img alt="oneJS" src="https://user-images.githubusercontent.com/98762998/210245537-180314c5-51b1-4b01-b3b8-d02d50b77d73.svg" width="60px">
</div>