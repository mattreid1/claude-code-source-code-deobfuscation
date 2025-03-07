# TypeScript Project Setup

## Problem
The TypeScript project had configuration issues preventing it from running correctly with `yarn dev`. The primary issue was related to ESM (ECMAScript Modules) compatibility with TypeScript.

## Diagnosis
1. The project was using `ts-node --esm` to run TypeScript files
2. The `package.json` had `"type": "module"` indicating this is an ESM project
3. TypeScript was configured correctly in `tsconfig.json` with `"module": "NodeNext"` 
4. However, there was an incompatibility with how `ts-node` was handling TypeScript files in an ESM context

## Solution Steps

### 1. Initial Dependencies Installation
First, dependencies were installed using:
```bash
yarn install
```
This created the `yarn.lock` file and installed all required packages.

### 2. First Approach - Using ts-node with ESM
Initially attempted to fix the setup by:
1. Modifying the dev script to use Node's loader API:
   ```json
   "dev": "NODE_OPTIONS=\"--loader ts-node/esm\" node src/cli.ts"
   ```
2. Creating a `tsconfig.node.json` file to configure ts-node:
   ```json
   {
     "extends": "./tsconfig.json",
     "ts-node": {
       "esm": true,
       "experimentalSpecifierResolution": "node"
     }
   }
   ```

This approach encountered errors with Node.js module resolution.

### 3. Second Approach - Using tsx
Switched to using `tsx`, a more modern alternative for running TypeScript in ESM projects:

1. Installed tsx:
   ```bash
   yarn add -D tsx
   ```

2. Modified the dev script in `package.json`:
   ```json
   "dev": "tsx src/cli.ts"
   ```

This approach worked successfully, allowing the TypeScript project to run with:
```bash
yarn dev
```

## Benefits of tsx vs ts-node
- Better ESM compatibility
- Significantly faster startup times
- Simpler configuration with no need for special flags
- Native support for TypeScript in ESM projects
- Backed by esbuild for performance

## Conclusion
The TypeScript project is now properly configured with ESM support, and the development environment is working correctly with `yarn dev`.