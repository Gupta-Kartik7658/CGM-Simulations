# Software Requirements Specification (SRS)

## Project Title

**Interactive 3D Curves, Frenet Frames & Characteristic Planes Visualizer**

## Document Status

Version 1.0 — Initial Development Specification

## Intended Implementation

- **Frontend:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **3D Rendering:** Three.js
- **React/Three.js Integration:** React Three Fiber
- **State Management:** Zustand or an equivalently lightweight state-management solution
- **Styling/UI:** CSS, CSS Modules, Tailwind CSS, or another lightweight component styling approach
- **Deployment:** Static web deployment such as Vercel, Netlify, GitHub Pages, or equivalent

---

# 1. Purpose

The purpose of this application is to provide an interactive educational visualization environment for studying **parametric 3D curves and their differential-geometric properties**.

The application shall allow a user to select or define a 3D parametric curve and interactively inspect, at any point on the curve:

- Position vector
- First derivative
- Second derivative
- Third derivative
- Unit tangent vector \(T\)
- Principal normal vector \(N\)
- Binormal vector \(B\)
- Curvature \(\kappa\)
- Torsion \(\tau\)
- Osculating plane
- Normal plane
- Rectifying plane

The application shall make the relationships between these entities visually obvious.

The application shall also expose the mathematical calculations behind the visualization through an optional **Verbose Mode**, allowing students to inspect the intermediate values and equations used internally by the geometry engine.

The architecture shall be designed so that future versions can add interpolation and curve-fitting techniques such as:

- Bézier curves
- Hermite interpolation
- Lagrange interpolation
- Least-squares curve fitting
- User-defined interpolation/fitting methods

without requiring substantial changes to the core Frenet-frame and visualization systems.

---

# 2. Goals

## 2.1 Primary Goals

The system shall:

1. Display arbitrary supported 3D parametric curves.
2. Allow interactive movement through the curve using its parameter \(t\).
3. Calculate the Frenet frame at the selected point.
4. Visually display \(T\), \(N\), and \(B\).
5. Display the three characteristic planes:
   - Osculating plane
   - Normal plane
   - Rectifying plane
6. Allow each visualization layer to be enabled or disabled independently.
7. Display numerical values associated with the selected point.
8. Explain each mathematical characteristic through hoverable information elements.
9. Provide a verbose mathematical/debugging view.
10. Animate the movement of the selected point along the curve.
11. Gracefully handle mathematically invalid or degenerate points.
12. Provide a modular architecture suitable for future curve-generation methods.

---

# 3. Educational Objectives

The application is intended primarily as a **learning and demonstration tool**.

The user should be able to visually understand that:

- A 3D curve is represented parametrically.
- The tangent describes instantaneous direction.
- The normal describes the direction of change of the tangent.
- The binormal is perpendicular to both tangent and normal.
- The Frenet frame changes as the curve moves through space.
- Curvature describes how strongly the curve bends.
- Torsion describes how strongly the curve twists out of its osculating plane.
- The three characteristic planes are formed from combinations of \(T\), \(N\), and \(B\).
- The same mathematical engine works independently of how the curve itself was generated.

The visualization should prioritize **intuition + mathematical correctness**.

---

# 4. Terminology

The implementation shall use the following terminology consistently.

Given a regular parametric curve:

\[
\mathbf r(t)
=
\begin{bmatrix}
x(t)\\
y(t)\\
z(t)
\end{bmatrix}
\]

define:

### Position

\[
\mathbf r(t)
\]

### First derivative

\[
\mathbf r'(t)
\]

### Second derivative

\[
\mathbf r''(t)
\]

### Third derivative

\[
\mathbf r'''(t)
\]

### Unit tangent

\[
\mathbf T(t)
=
\frac{\mathbf r'(t)}
{\|\mathbf r'(t)\|}
\]

### Principal normal

\[
\mathbf N(t)
=
\frac{\mathbf T'(t)}
{\|\mathbf T'(t)\|}
\]

Where convenient, the implementation may use an equivalent derivative-based expression.

### Binormal

\[
\mathbf B(t)
=
\mathbf T(t)\times\mathbf N(t)
\]

### Curvature

\[
\kappa(t)
=
\frac{\|\mathbf r'(t)\times\mathbf r''(t)\|}
{\|\mathbf r'(t)\|^3}
\]

### Torsion

\[
\tau(t)
=
\frac{
(\mathbf r'(t)\times\mathbf r''(t))
\cdot\mathbf r'''(t)
}{
\|\mathbf r'(t)\times\mathbf r''(t)\|^2
}
\]

---

# 5. Characteristic Planes

The system shall use the standard differential-geometric definitions below.

## 5.1 Osculating Plane

The osculating plane is spanned by:

\[
T,\ N
\]

Its normal vector is:

\[
B
\]

Therefore:

\[
\Pi_O = \operatorname{span}(T,N)
\]

The UI shall identify it explicitly as:

**Osculating Plane (T-N Plane)**

---

## 5.2 Normal Plane

The normal plane is spanned by:

\[
N,\ B
\]

Its normal vector is:

\[
T
\]

Therefore:

\[
\Pi_N = \operatorname{span}(N,B)
\]

The UI shall identify it explicitly as:

**Normal Plane (N-B Plane)**

---

## 5.3 Rectifying Plane

The rectifying plane is spanned by:

\[
T,\ B
\]

Its normal vector is:

\[
N
\]

Therefore:

\[
\Pi_R = \operatorname{span}(T,B)
\]

The UI shall identify it explicitly as:

**Rectifying Plane (T-B Plane)**

> Note: The implementation and documentation shall use the standard term **Rectifying Plane**. If an instructor or course uses "rectilinear plane", the UI may optionally mention that the standard differential-geometric terminology is "rectifying plane."

---

# 6. Scope

## 6.1 Version 1 Scope

Version 1 shall focus on:

- Parametric 3D curve rendering
- Curve selection
- Parameter selection
- Frenet frame calculation
- Vector visualization
- Characteristic plane visualization
- Curvature
- Torsion
- Mathematical information panels
- Verbose calculation mode
- Animation
- Frame-trail visualization
- Debugging and mathematical validation

## 6.2 Future Scope

Future versions shall add:

- Bézier curves
- Hermite curves
- Lagrange interpolation
- Least-squares interpolation/fitting
- Interactive control points
- User-entered point data
- Curve fitting comparisons
- Curvature and torsion graphs
- Derivative visualization
- Exporting curves/data
- Saving/loading visualization configurations

These shall not be tightly coupled to Version 1 implementation.

---

# 7. Supported Initial Curve Library

The system shall initially provide several predefined curves.

## 7.1 Straight Line

Example:

\[
r(t)=(at+b,\ ct+d,\ et+f)
\]

Purpose:

- Basic vector behavior
- Degenerate curvature demonstration
- Understanding tangent direction

---

## 7.2 Circle

Example:

\[
r(t)=(R\cos t,R\sin t,0)
\]

Purpose:

- Constant curvature
- Zero torsion
- Easily understood osculating plane

---

## 7.3 Helix

Example:

\[
r(t)=
(a\cos t,\ a\sin t,\ bt)
\]

Parameters:

- Radius \(a\)
- Vertical growth \(b\)
- Parameter range

Purpose:

- Primary 3D Frenet-frame demonstration
- Nonzero curvature
- Nonzero torsion
- Clearly visible frame rotation

---

## 7.4 3D Sine-Type Curve

Example:

\[
r(t)=
(t,\sin(t),\cos(t))
\]

or an equivalent configurable 3D sinusoidal curve.

Purpose:

- Demonstrate continuously changing curvature
- Demonstrate changing frame orientation

---

## 7.5 Trefoil Knot

Provide a standard parametric trefoil-knot implementation.

Purpose:

- Complex spatial behavior
- Strong demonstration of frame movement
- Useful demonstration for animation and frame trails

---

## 7.6 Polynomial 3D Curve

Allow a configurable polynomial curve, e.g.

\[
r(t)=
(a_0+a_1t+a_2t^2,\,
b_0+b_1t+b_2t^2,\,
c_0+c_1t+c_2t^2)
\]

Later this can evolve into a general custom parametric curve editor.

---

# 8. Functional Requirements

## FR-001: Curve Selection

The application shall provide a curve selector.

The selector shall initially include:

- Straight Line
- Circle
- Helix
- 3D Sine Curve
- Trefoil Knot
- Polynomial Curve

Changing the selected curve shall immediately update the 3D visualization and associated numerical data.

---

## FR-002: Curve Parameter Configuration

Where applicable, curve-specific parameters shall be configurable.

For example, the helix shall expose:

- Radius
- Vertical pitch/growth
- Parameter minimum
- Parameter maximum

When a parameter changes:

1. The curve shall update.
2. The Frenet frame shall recalculate.
3. All active planes shall update.
4. Numerical values shall update.
5. Any animation shall use the new parameter domain.

---

## FR-003: Selected Parameter \(t\)

The UI shall contain a parameter slider.

The user shall be able to select a specific point:

\[
t=t_0
\]

The UI shall display the current numerical value of \(t\).

A numeric input may additionally be provided for precision.

Moving the slider shall update all dependent calculations in real time.

---

# 9. Position and Differential Quantities

For the currently selected \(t\), the system shall calculate and optionally display:

\[
r(t)
\]

\[
r'(t)
\]

\[
r''(t)
\]

\[
r'''(t)
\]

The values shall be displayed using configurable numerical precision.

Example:

```text
t = 2.3141

r(t)   = (1.352, 0.842, 2.314)
r'(t)  = (-0.842, 1.352, 1.000)
r''(t) = (-1.352, -0.842, 0.000)
r'''(t)= (0.842, -1.352, 0.000)
```

---

# 10. Frenet Frame Engine

The mathematics engine shall calculate:

- Tangent \(T\)
- Normal \(N\)
- Binormal \(B\)
- Curvature \(\kappa\)
- Torsion \(\tau\)

The engine shall return structured data.

Suggested conceptual structure:

```typescript
interface FrenetFrame {
    t: number;

    position: Vector3;

    firstDerivative: Vector3;
    secondDerivative: Vector3;
    thirdDerivative: Vector3;

    tangent?: Vector3;
    normal?: Vector3;
    binormal?: Vector3;

    curvature: number;
    torsion?: number;

    tangentValid: boolean;
    normalValid: boolean;
    binormalValid: boolean;
    curvatureValid: boolean;
    torsionValid: boolean;
}
```

This structure is conceptual; exact implementation details may differ.

---

# 11. Mathematical Validation

The engine shall verify expected orthogonality and normalization properties where the frame is valid.

For valid Frenet frames:

\[
\|T\|\approx1
\]

\[
\|N\|\approx1
\]

\[
\|B\|\approx1
\]

and:

\[
T\cdot N\approx0
\]

\[
T\cdot B\approx0
\]

\[
N\cdot B\approx0
\]

The engine should optionally expose these diagnostics in Verbose Mode.

Example:

```text
Frame validation

|T| = 1.000000
|N| = 1.000000
|B| = 1.000000

T · N = 0.000001
T · B = 0.000000
N · B = 0.000001

Status: VALID
```

A configurable numerical tolerance shall be used rather than exact floating-point equality.

---

# 12. Degenerate and Invalid Cases

The application shall not produce uncontrolled `NaN`, `Infinity`, broken meshes, or silent incorrect values.

## 12.1 Zero First Derivative

If:

\[
\|\mathbf r'(t)\|\approx0
\]

the tangent is undefined.

The UI shall communicate this clearly.

Example:

```text
Tangent undefined at this point.
Reason:
||r'(t)|| is approximately zero.
```

---

## 12.2 Zero Curvature

If:

\[
\|\mathbf r'(t)\times\mathbf r''(t)\|\approx0
\]

then the principal normal/binormal and torsion may be undefined.

The system shall handle this explicitly.

Example:

```text
Frenet frame partially undefined.

Curvature ≈ 0.
Principal normal cannot be determined reliably.
```

The renderer shall hide invalid vectors/planes or represent their unavailable status clearly rather than displaying misleading geometry.

---

# 13. Vector Visualization

## 13.1 Tangent Vector

Display \(T\) as an arrow originating at the selected point.

The arrow shall have configurable scale.

---

## 13.2 Normal Vector

Display \(N\) as an arrow originating at the selected point.

---

## 13.3 Binormal Vector

Display \(B\) as an arrow originating at the selected point.

---

## 13.4 Common Origin

By default:

\[
T,\ N,\ B
\]

shall originate from the same selected curve point.

This shall make their orthogonality visually apparent.

---

## 13.5 Vector Scale

The UI shall provide a vector-scale control.

Example:

```text
Vector Scale
[---------●-------]
```

Changing this value shall alter rendered arrow length without altering mathematical values.

---

# 14. Characteristic Plane Visualization

Each characteristic plane shall be rendered as a translucent finite quadrilateral centered at the selected point.

The planes shall not extend infinitely.

## 14.1 Plane Basis

Osculating plane:

\[
T,N
\]

Normal plane:

\[
N,B
\]

Rectifying plane:

\[
T,B
\]

---

## 14.2 Plane Size

The UI shall provide a plane-size control.

Example:

```text
Plane Size
[-------●----------]
```

---

## 14.3 Independent Visibility

Each plane shall have its own visibility toggle.

Example:

```text
☑ Osculating Plane
☐ Normal Plane
☐ Rectifying Plane
```

Multiple planes may be visible simultaneously.

---

# 15. Characteristic Information Tooltips

Every major geometric characteristic shall have an associated **information box / tooltip**.

The information box shall appear when the user hovers over an info icon, label, card, checkbox, or other clearly discoverable UI element.

The tooltip shall provide:

1. Name
2. Short conceptual explanation
3. Formula/equation
4. Relationship to other quantities

The goal is educational clarity rather than a long textbook treatment.

---

# 16. Required Information Boxes

## 16.1 Tangent

Title:

**Unit Tangent \(T\)**

Explanation:

Describes the instantaneous direction of motion along the curve.

Equation:

\[
T =
\frac{r'(t)}{\|r'(t)\|}
\]

---

## 16.2 Normal

Title:

**Principal Normal \(N\)**

Explanation:

Points in the direction in which the tangent vector is changing.

Equation:

\[
N =
\frac{T'(t)}{\|T'(t)\|}
\]

---

## 16.3 Binormal

Title:

**Binormal \(B\)**

Explanation:

A vector perpendicular to both the tangent and principal normal.

Equation:

\[
B=T\times N
\]

---

## 16.4 Curvature

Title:

**Curvature \(\kappa\)**

Explanation:

Measures how rapidly the curve changes direction.

Equation:

\[
\kappa =
\frac{\|r'(t)\times r''(t)\|}
{\|r'(t)\|^3}
\]

---

## 16.5 Torsion

Title:

**Torsion \(\tau\)**

Explanation:

Measures the twisting of the curve out of its osculating plane.

Equation:

\[
\tau =
\frac{(r'\times r'')\cdot r'''}
{\|r'\times r''\|^2}
\]

---

## 16.6 Osculating Plane

Title:

**Osculating Plane**

Explanation:

The plane spanned by the tangent and principal normal. It is the plane that most closely approximates the curve locally.

Basis:

\[
T,N
\]

Normal:

\[
B
\]

---

## 16.7 Normal Plane

Title:

**Normal Plane**

Explanation:

The plane perpendicular to the tangent direction.

Basis:

\[
N,B
\]

Normal:

\[
T
\]

---

## 16.8 Rectifying Plane

Title:

**Rectifying Plane**

Explanation:

The plane spanned by the tangent and binormal directions.

Basis:

\[
T,B
\]

Normal:

\[
N
\]

---

# 17. Verbose Mode

## 17.1 Purpose

The application shall include a UI control named:

**Verbose**

or:

**Verbose Mode**

This feature shall expose intermediate mathematical calculations performed by the geometry engine.

It shall be intended for students who want to understand not only the final result but how it was obtained.

---

## 17.2 Default State

Verbose Mode shall be disabled by default.

---

## 17.3 Verbose Panel

When enabled, a panel shall display a structured derivation for the current parameter \(t\).

Example:

```text
VERBOSE CALCULATION
─────────────────────────────

1. Parameter

t = 2.314159

2. Position

r(t)
= (x(t), y(t), z(t))
= (1.3521, 0.8427, 2.3142)

3. First derivative

r'(t)
= (-0.8427, 1.3521, 1.0000)

||r'(t)||
= 1.8642

4. Tangent

T = r'(t) / ||r'(t)||
  = (-0.4522, 0.7252, 0.5364)

5. Second derivative

r''(t)
= (-1.3521, -0.8427, 0)

6. Cross product

r'(t) × r''(t)
= ( ... )

7. Curvature

κ
= ||r' × r''|| / ||r'||³
= 0.4821

8. Principal Normal

N
= ( ... )

9. Binormal

B
= T × N
= ( ... )

10. Third derivative

r'''(t)
= ( ... )

11. Torsion

τ
= ...
```

---

# 18. Verbose Mode Requirements

Verbose Mode shall:

- Never modify the mathematical calculation.
- Never change the visualization result.
- Update live when \(t\) changes.
- Update live when curve parameters change.
- Clearly separate equations from numerical substitutions.
- Indicate when a calculation is invalid.
- Use sufficient precision to make verification possible.
- Allow scrolling for long derivations.
- Remain visually readable on smaller screens.

The implementation should avoid placing all verbose information in a giant single unstructured block.

Prefer collapsible sections:

```text
▼ Position
▼ First Derivative
▼ Tangent
▼ Second Derivative
▼ Curvature
▼ Normal
▼ Binormal
▼ Third Derivative
▼ Torsion
▼ Plane Construction
▼ Validation
```

---

# 19. Plane Equation Display

When Verbose Mode is enabled, the system should optionally display the equation of the currently active planes.

For a plane through \(P_0\) with normal \(n\):

\[
n\cdot (x-P_0)=0
\]

Example:

```text
Osculating Plane

Normal:
B = (0.42, -0.71, 0.56)

Point:
P = (1.20, 0.82, 2.31)

Equation:

0.42(x-1.20)
-0.71(y-0.82)
+0.56(z-2.31)
= 0
```

This is particularly valuable educationally.

---

# 20. Animation

The application shall provide:

- Play
- Pause
- Reset
- Animation speed

When playing, \(t\) shall continuously move through the curve's domain.

As \(t\) changes:

- Selected point moves.
- Tangent updates.
- Normal updates.
- Binormal updates.
- Curvature updates.
- Torsion updates.
- Visible planes move and rotate.
- Numerical displays update.
- Verbose calculations update.

---

# 21. Frenet Frame Trail

The system shall optionally render Frenet-frame samples along the entire curve.

A frame consists of:

\[
T_i,N_i,B_i
\]

computed at sampled values:

\[
t_0,t_1,\ldots,t_n
\]

The UI shall provide:

```text
☐ Show Frame Trail

Frame Density
[------●--------]
```

Higher density shall show more frame instances.

The current frame at the selected point shall remain visually distinguishable from historical/sample frames.

---

# 22. Coordinate System

The scene shall contain optional:

- X-axis
- Y-axis
- Z-axis
- Grid

The user shall be able to toggle axes/grid.

The selected point should remain understandable relative to the world coordinate system.

---

# 23. Camera and Navigation

The 3D viewport shall support:

- Orbit
- Pan
- Zoom
- Camera reset

The user shall be able to inspect the geometry from arbitrary viewpoints.

A "Reset View" action shall return the camera to a sensible default position.

---

# 24. UI Structure

Recommended overall layout:

```text
┌───────────────────────────────────────────────────────────────┐
│                         HEADER                                │
│  3D Curve & Frenet Frame Visualizer                          │
├─────────────────────────────────────┬─────────────────────────┤
│                                     │ Curve                   │
│                                     │                         │
│                                     │ Parameter               │
│                                     │                         │
│             3D VIEW                 │ Visualization           │
│                                     │                         │
│                                     │ Characteristics         │
│                                     │                         │
│                                     │ Numerical Values        │
│                                     │                         │
├─────────────────────────────────────┴─────────────────────────┤
│ Verbose Calculation Panel (when enabled)                      │
└───────────────────────────────────────────────────────────────┘
```

The actual implementation may adapt this layout responsively.

---

# 25. Visualization Controls

Controls shall include at minimum:

```text
Curve
[ Helix ▼ ]

Parameter
[────────●────────]  t = 2.314

☑ Show Curve
☑ Show Point

Vectors
☑ Tangent
☑ Normal
☑ Binormal

Planes
☑ Osculating
☐ Normal
☐ Rectifying

Additional
☐ Frame Trail
☑ Axes
☑ Grid

Verbose
☐ Verbose Mode

Animation
[ ▶ Play ]
[ ⏸ Pause ]
[ ↻ Reset ]
```

---

# 26. Visual Hierarchy

The visualization shall make it easy to distinguish:

- Curve
- Selected point
- Tangent
- Normal
- Binormal
- Each plane

The exact color palette is an implementation choice, but the application must maintain consistent visual identity.

For example, one consistent color can represent \(T\) everywhere, another \(N\), and another \(B\), including labels, equations, and controls.

Do not rely on color alone; labels and/or line patterns should reinforce meaning.

---

# 27. Data/Math Architecture

The mathematics engine must be independent of React and Three.js rendering.

The recommended conceptual architecture is:

```text
Curve Definition
       │
       ▼
Parametric Curve API
       │
       ▼
Derivative Engine
       │
       ▼
Frenet Frame Engine
       │
       ├── T
       ├── N
       ├── B
       ├── κ
       └── τ
       │
       ▼
Plane Builder
       │
       ▼
Visualization Layer
```

The UI should consume the results rather than implement the calculations itself.

---

# 28. Parametric Curve Interface

All curve implementations shall conform to a common abstraction.

Conceptual interface:

```typescript
interface ParametricCurve3D {
    readonly name: string;
    readonly domain: [number, number];

    position(t: number): Vector3;
    derivative(t: number): Vector3;
    secondDerivative(t: number): Vector3;
    thirdDerivative(t: number): Vector3;
}
```

Optional future methods may include:

```typescript
sample(count: number): Vector3[];
metadata(): CurveMetadata;
parameters(): CurveParameterDefinition[];
```

---

# 29. Future Interpolation Compatibility

The system shall not assume that curves are analytical functions written by hand.

A future interpolation-generated curve shall still satisfy the common curve interface.

For example:

```text
                 Curve Source
                      │
       ┌──────────────┼───────────────┐
       │              │               │
   Analytic       Interpolation     Fitting
       │              │               │
     Helix         Bézier          Least Squares
     Circle        Hermite
     Sine          Lagrange
       │              │
       └──────────────┼───────────────┘
                      ▼
               ParametricCurve3D
                      │
                      ▼
              Frenet Frame Engine
```

This architecture is mandatory for future extensibility.

---

# 30. Rendering Architecture

The 3D renderer should use independently composable components.

Suggested conceptual components:

```text
Scene
 ├── CoordinateAxes
 ├── Grid
 ├── CurveRenderer
 ├── SelectedPoint
 ├── VectorArrow
 │    ├── TangentArrow
 │    ├── NormalArrow
 │    └── BinormalArrow
 ├── CharacteristicPlane
 │    ├── OsculatingPlane
 │    ├── NormalPlane
 │    └── RectifyingPlane
 ├── FrenetFrameTrail
 └── Labels
```

The components should receive calculated geometry rather than perform mathematical calculations independently.

---

# 31. State Architecture

A centralized state model shall track:

```typescript
interface VisualizerState {
    selectedCurveId: string;
    parameter: number;

    showCurve: boolean;
    showPoint: boolean;

    showTangent: boolean;
    showNormal: boolean;
    showBinormal: boolean;

    showOsculatingPlane: boolean;
    showNormalPlane: boolean;
    showRectifyingPlane: boolean;

    showFrameTrail: boolean;
    showAxes: boolean;
    showGrid: boolean;

    vectorScale: number;
    planeScale: number;
    frameDensity: number;

    verboseMode: boolean;

    isPlaying: boolean;
    animationSpeed: number;
}
```

Exact names may differ.

---

# 32. Performance Requirements

The system shall remain interactive while the parameter slider is being moved.

For standard supported curves:

- Curve geometry should update without visible lag.
- Vector visualization should update in real time.
- Plane geometry should update in real time.
- Verbose numerical calculations should update without freezing the UI.

The system should avoid unnecessary React re-renders and unnecessary recreation of Three.js resources.

Derived mathematical data should be memoized/cached where appropriate.

---

# 33. Numerical Precision

The internal engine shall use standard JavaScript floating-point number precision unless there is a compelling reason to introduce another numeric representation.

The UI shall allow configurable display precision, for example:

```text
2 decimals
4 decimals
6 decimals
```

Internal calculations shall not be rounded prematurely.

Only presentation values should be rounded.

---

# 34. Curve Sampling

For rendering a continuous curve, the renderer shall sample the mathematical curve over its parameter domain.

The sampling density shall be configurable internally and may later be exposed to advanced users.

Rendering resolution and mathematical precision shall be treated as separate concerns.

---

# 35. Mathematical Correctness Requirements

For known curves, automated tests shall verify the engine.

Examples:

### Circle

Expected:

- Constant curvature
- Zero torsion
- Tangent/normal behavior consistent with circular motion

### Straight line

Expected:

- Constant tangent
- Curvature approximately zero
- Frenet frame unavailable where curvature is zero

### Helix

Expected:

- Nonzero constant curvature
- Nonzero constant torsion for the standard circular helix
- Consistent orthogonal frame

These tests shall be part of the development process.

---

# 36. Unit Testing

The project shall contain tests for:

## Vector mathematics

- Dot product
- Cross product
- Norm
- Normalization

## Differential quantities

- First derivative
- Second derivative
- Third derivative

## Frenet calculations

- Tangent
- Normal
- Binormal
- Curvature
- Torsion

## Plane construction

- Plane basis
- Plane normal
- Plane orientation
- Plane equation

## Degenerate handling

- Zero tangent
- Zero curvature
- Torsion denominator near zero

---

# 37. Acceptance Criteria — Core MVP

The MVP shall be considered successful when:

1. A user can open the application and see a 3D curve.
2. The user can select at least five predefined curves.
3. The user can change the parameter \(t\).
4. The selected point moves along the curve.
5. Tangent updates correctly.
6. Normal updates correctly.
7. Binormal updates correctly.
8. Osculating plane updates correctly.
9. Normal plane updates correctly.
10. Rectifying plane updates correctly.
11. Each vector can be independently hidden/shown.
12. Each plane can be independently hidden/shown.
13. Curvature is displayed.
14. Torsion is displayed.
15. Play/Pause animation works.
16. Frame-trail visualization works.
17. Hovering an information control shows the mathematical explanation for each major characteristic.
18. Verbose Mode shows intermediate mathematical calculations.
19. Invalid Frenet-frame situations are handled without application crashes.
20. The same Frenet engine works across all supported curves.

---

# 38. UX Acceptance Criteria

A student unfamiliar with the implementation should be able to determine:

- Which point on the curve is currently being studied.
- Which vector is tangent.
- Which vector is normal.
- Which vector is binormal.
- Which plane is which.
- What curvature means.
- What torsion means.
- How \(T,N,B\) relate to the three planes.

without reading source code.

The information tooltip system shall make mathematical explanations discoverable without cluttering the primary viewport.

---

# 39. Verbose Mode Acceptance Criteria

When Verbose Mode is enabled:

- The current \(t\) is visible.
- \(r(t)\) is visible.
- \(r'(t)\) is visible.
- \(r''(t)\) is visible.
- \(r'''(t)\) is visible.
- Tangent computation is visible.
- Normal computation is visible.
- Binormal computation is visible.
- Curvature calculation is visible.
- Torsion calculation is visible where valid.
- Plane construction basis is visible.
- Plane equation is optionally visible.
- Validation/orthogonality checks are visible.
- Invalid operations explain why they are unavailable.

The calculations shown shall correspond exactly to the data used by the renderer.

---

# 40. Accessibility

The application should:

- Support keyboard navigation where practical.
- Provide labels for controls.
- Not rely exclusively on color.
- Maintain sufficient visual contrast.
- Provide descriptive text for information controls.
- Make sliders keyboard accessible.
- Avoid extremely small interactive targets.

Accessibility shall not compromise the 3D educational visualization.

---

# 41. Responsive Design

The application shall support:

- Desktop
- Laptop
- Tablet

The primary intended experience is desktop/laptop due to the 3D viewport.

On smaller screens:

```text
3D viewport
      ↓
Controls
      ↓
Numerical Information
      ↓
Verbose Calculations
```

The layout may become vertically stacked.

---

# 42. Error Handling

The application shall gracefully handle:

- Invalid curve parameters
- Invalid parameter ranges
- Undefined derivative
- Zero derivative
- Zero curvature
- Undefined Frenet frame
- Numerical instability
- Invalid custom input in future curve editors

Errors should be presented as useful educational messages rather than generic exceptions.

---

# 43. Recommended UI Sections

The application should conceptually contain:

## Header

Project title + optional short description.

## Curve Configuration

Curve selector and curve-specific parameters.

## 3D Viewport

Primary visualization.

## Visualization Controls

Show/hide vectors, planes, axes, frame trail, etc.

## Current Point Information

Coordinates and mathematical properties.

## Characteristic Information

Hoverable educational explanations.

## Animation Controls

Play/pause/reset/speed.

## Verbose Panel

Detailed mathematical calculations.

---

# 44. Optional but Recommended: Current Frame Card

A compact summary card should show:

```text
CURRENT FRAME

t = 2.314

T = (...)
N = (...)
B = (...)

κ = 0.482
τ = -0.231
```

This allows students to quickly observe the state without opening Verbose Mode.

---

# 45. Optional but Recommended: Formula Overlay

The viewport may support an optional overlay showing:

```text
Tangent: T
Normal: N
Binormal: B
```

next to arrows.

Plane labels may similarly appear:

```text
Osculating
Normal
Rectifying
```

Labels should move with the 3D geometry.

---

# 46. Optional Advanced Feature: Local Coordinate Frame

The application may display a mini local coordinate indicator showing:

```text
T → local x-like direction
N → local y-like direction
B → local z-like direction
```

This can reinforce that the Frenet frame acts as a moving local coordinate system along the curve.

---

# 47. Optional Advanced Feature: Frenet Frame Sampling

The application may support a "Sample Frames" mode that displays frames at many points.

The user should be able to control the sampling density.

This is especially useful when demonstrating how torsion affects the orientation of the frame along the curve.

---

# 48. Future Feature: Curvature/Torsion Graphs

Reserved for a future release.

The curve parameter shall become the graph's horizontal axis.

The system shall support:

\[
\kappa(t)
\]

and

\[
\tau(t)
\]

plots.

Eventually, hovering/clicking the graph should synchronize \(t\) with the point in the 3D viewport.

---

# 49. Future Feature: Interactive Control Points

The architecture should anticipate curves defined by user-selected points.

A later version may allow users to:

- Add points
- Delete points
- Drag points in 3D
- Reorder points
- Change point coordinates numerically

The resulting curve shall still implement the common `ParametricCurve3D` abstraction wherever appropriate.

---

# 50. Future Interpolation Module

Future versions shall provide a curve-generation module.

Suggested conceptual structure:

```text
Curve Generator
├── Analytic
│   ├── Line
│   ├── Circle
│   ├── Helix
│   └── Custom Parametric
│
├── Interpolation
│   ├── Bézier
│   ├── Hermite
│   └── Lagrange
│
└── Fitting
    └── Least Squares
```

Each generated curve should feed into the same downstream system:

```text
Curve
 ↓
Derivatives
 ↓
T / N / B
 ↓
Curvature / Torsion
 ↓
Characteristic Planes
 ↓
Visualization
```

No future curve-generation algorithm should need to duplicate Frenet logic.

---

# 51. Future Bézier Support

Expected future capabilities:

- 2D/3D Bézier curve
- Control points
- Degree
- Curve visualization
- Control polygon
- First derivative
- Second derivative
- Frenet frame

---

# 52. Future Hermite Support

Expected inputs:

- Start point
- End point
- Start tangent
- End tangent

The application shall render:

- Hermite curve
- Control/tangent information
- Frenet frame
- Characteristic planes

---

# 53. Future Lagrange Support

Expected inputs:

\[
(t_i,P_i)
\]

The system shall construct an interpolating curve.

Visualization shall optionally show:

- Interpolation points
- Curve
- Polynomial information
- Frenet frame

---

# 54. Future Least-Squares Support

Expected inputs:

- Data points
- Polynomial/order or fitting model
- Optional weighting

The application should visualize:

- Original data
- Fitted curve
- Residuals
- Fitted curve's Frenet frame

---

# 55. Software Architecture Principle

The project shall follow these core principles:

### Separation of concerns

Mathematics, rendering, UI, and application state shall remain separate.

### Reusability

The Frenet-frame engine shall operate on any supported `ParametricCurve3D`.

### Extensibility

Adding a new curve should not require modification of the renderer.

### Educational transparency

The user should be able to inspect the mathematics used to create the visualization.

### Numerical robustness

Undefined mathematical quantities shall be detected and communicated.

---

# 56. Suggested Project Structure

```text
src/
│
├── app/
│   ├── App.tsx
│   └── routes/
│
├── components/
│   ├── layout/
│   ├── controls/
│   ├── information/
│   ├── statistics/
│   └── verbose/
│
├── visualization/
│   ├── Scene.tsx
│   ├── CurveRenderer.tsx
│   ├── FrenetFrameRenderer.tsx
│   ├── VectorArrow.tsx
│   ├── PlaneRenderer.tsx
│   ├── FrameTrail.tsx
│   └── CoordinateSystem.tsx
│
├── math/
│   ├── vectorMath.ts
│   ├── derivatives.ts
│   ├── frenet.ts
│   ├── curvature.ts
│   ├── torsion.ts
│   ├── planes.ts
│   └── validation.ts
│
├── curves/
│   ├── types.ts
│   ├── line.ts
│   ├── circle.ts
│   ├── helix.ts
│   ├── sine3d.ts
│   ├── trefoil.ts
│   └── polynomial.ts
│
├── state/
│   └── visualizerStore.ts
│
├── data/
│   └── characteristicDefinitions.ts
│
├── hooks/
│
├── utils/
│
└── tests/
    ├── math/
    └── curves/
```

The exact file structure may differ during implementation, but the conceptual separation shall remain.

---

# 57. Development Order

Implementation should proceed in this order.

## Phase 1 — Project Foundation

- Create React + TypeScript + Vite project.
- Configure Three.js / React Three Fiber.
- Set up basic application layout.
- Set up state-management layer.
- Establish math module.

## Phase 2 — Curve Engine

Implement:

- Common curve interface
- Line
- Circle
- Helix
- Sine
- Trefoil
- Polynomial

## Phase 3 — Differential Geometry Engine

Implement and test:

- Derivatives
- Tangent
- Normal
- Binormal
- Curvature
- Torsion
- Validation
- Degenerate cases

## Phase 4 — 3D Renderer

Implement:

- Camera
- Grid
- Axes
- Curve
- Selected point
- Vector arrows
- Planes

## Phase 5 — User Controls

Implement:

- Curve selection
- Curve parameters
- \(t\) slider
- Visibility toggles
- Scale controls
- Camera reset

## Phase 6 — Educational UI

Implement:

- Current-frame card
- Characteristic tooltips
- Equations
- Plane explanations
- Mathematical information

## Phase 7 — Verbose Mode

Implement:

- Intermediate values
- Derivation sections
- Numerical checks
- Plane equations
- Error/degenerate explanations

## Phase 8 — Animation & Frame Trail

Implement:

- Play/pause
- Speed
- Moving point
- Frenet frame animation
- Frame trail

## Phase 9 — Testing and Polish

- Mathematical unit tests
- Visual validation
- Edge-case testing
- Responsive layout
- Performance optimization
- Accessibility
- Deployment

---

# 58. Definition of Done — Version 1

Version 1 is complete when the application can function as a self-contained classroom demonstration tool.

A user must be able to:

1. Select a curve.
2. Change its parameters.
3. Move through the curve using \(t\).
4. See the current point.
5. See \(T,N,B\).
6. Toggle each vector independently.
7. See the three characteristic planes.
8. Toggle each plane independently.
9. See curvature and torsion.
10. Animate movement along the curve.
11. Display multiple Frenet frames along the curve.
12. Inspect mathematical explanations through hoverable information controls.
13. Enable Verbose Mode.
14. Follow the actual calculations performed by the engine.
15. Encounter clear handling when the Frenet frame is mathematically undefined.
16. Reset the camera and visualization.
17. Use the application without knowing anything about the implementation.

---

# 59. Important Implementation Constraint

The renderer must never become the source of truth for mathematical data.

The architecture must follow:

```text
Mathematical Engine
        │
        ▼
Mathematical State
        │
        ├──────────────► UI
        │
        └──────────────► Renderer
```

and not:

```text
Renderer
   │
   └── performs mathematics
```

All displayed values, arrows, planes, labels, and verbose calculations must ultimately originate from the same underlying mathematical computation.

This ensures that the visualization and the displayed mathematics cannot silently disagree.

---

# 60. Final Product Vision

The final product should feel like an interactive **Differential Geometry Laboratory for Computer Graphics**.

The core interaction should look approximately like:

```text
                 3D CURVE

                         N
                         ↑
                         │
                         │
                   ───── ● ─────→ T
                        /
                       /
                      B

                ┌─────────────────┐
                │ Osculating      │
                │ Plane           │
                └─────────────────┘

t = 2.314

κ = 0.482
τ = -0.231

[ Tangent ✓ ]
[ Normal ✓ ]
[ Binormal ✓ ]

[ Osculating Plane ✓ ]
[ Normal Plane    ]
[ Rectifying Plane ]

[ VERBOSE ]
```

The user should be able to change \(t\), rotate the camera, enable/disable visual elements, inspect equations, and watch the entire Frenet frame evolve in real time.

The architecture shall then allow future functionality such as:

```text
Analytic Curves
       +
Bézier
       +
Hermite
       +
Lagrange
       +
Least Squares
       ↓
Same Differential Geometry Engine
       ↓
Same Frenet Frame
       ↓
Same Characteristic Planes
       ↓
Same Visualization System
```

This architecture turns the project from a one-off 3D visualization into an extensible **Computer Graphics + Differential Geometry + Numerical Methods educational platform**.