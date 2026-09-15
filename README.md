# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
# 3D Curve & Frenet Frame Visualizer

An interactive educational laboratory for exploring parametric 3D curves and their differential-geometric properties.

The application lets users select supported curves, move through a parameter domain, inspect the Frenet frame, visualize characteristic planes, and read the calculations behind the visualization. The current interface includes hover labels, LaTeX-rendered formulas, educational explanations, verbose calculations, and frame validation.

## Features

- Parametric curve selection, including lines, circles, helices, sine curves, trefoil knots, and polynomial curves.
- Interactive parameter `t` control.
- Frenet frame visualization: tangent `T`, normal `N`, and binormal `B`.
- Osculating, normal, and rectifying plane visualization.
- Hover labels for the curve, selected point, vectors, and planes.
- Current-frame numerical summary.
- Verbose mode with derivatives, curvature, torsion, plane equations, and validation checks.
- KaTeX-rendered mathematical equations.
- Explicit handling of degenerate Frenet-frame cases.

## Tech Stack

- React 19 and TypeScript
- Vite
- Three.js
- React Three Fiber and Drei
- Zustand
- KaTeX
- Vitest and Testing Library
- ESLint

## Getting Started

Requirements: Node.js and npm.

```bash
git clone https://github.com/Gupta-Kartik7658/CGM-Simulations.git
cd CGM-Simulations/curve-lab
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
npm test          # Run the test suite once
npm run lint      # Run ESLint
```

## Project Structure

```text
curve-lab
├── src/
    ├── components/       React controls, educational UI, and scene components
    ├── curves/           Parametric curve implementations and registry
    ├── hooks/            React adapters for mathematical calculations
    ├── math/             Frenet frame, vector, plane, tolerance, and validation logic
    ├── state/            Zustand application state
    └── tests/            Curve and mathematical unit tests
```

The mathematics engine is independent of React and Three.js. Renderers and UI components consume the computed `FrenetFrame`; they should not reimplement differential-geometry calculations.

## SRS Reference

The complete product requirements are documented in the [Software Requirements Specification](Software%20Requirements%20Specification%20%E2%80%94%203D%20Curve%20%26%20Frenet%20Frame%20Visualizer.md) at the repository root.

Important SRS sections include:

- Characteristic plane definitions
- Frenet-frame calculations and numerical validation
- Verbose mode requirements
- Educational information boxes
- Rendering and state architecture
- Future interpolation and curve-fitting compatibility

## Contribution Rules

1. Keep mathematics, rendering, UI, and state management separated.
2. Add new curves through the shared `ParametricCurve3D` interface and registry.
3. Keep the Frenet-frame engine as the single source of truth for displayed calculations and geometry.
4. Handle undefined or degenerate quantities explicitly; do not allow `NaN` or `Infinity` to reach the UI or renderer.
5. Add or update focused tests for mathematical behavior and edge cases.
6. Preserve accessible labels and keyboard-operable controls.
7. Use KaTeX for user-facing mathematical equations rather than hand-written plain-text approximations.
8. Run `npm run build`, `npm test`, and `npm run lint` before submitting changes.
9. Keep changes focused and do not commit generated `dist` output.

## License

See the repository [LICENSE](LICENSE) file.
