import { useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Vector3 } from 'three';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import type { ParametricCurve3D } from '../curves';
import type { FrenetFrame } from '../math/frenetFrame';
import { useAppStore } from '../state/useAppStore';
import {
  getCharacteristicPlane,
  type CharacteristicPlaneType,
} from '../math/characteristicPlanes';
import { validateFrenetFrame } from '../math/validation';

interface EducationalPanelProps {
  curve: ParametricCurve3D;
  frame: FrenetFrame;
}

const PLANE_NAMES: Record<CharacteristicPlaneType, string> = {
  osculating: 'Osculating Plane',
  normal: 'Normal Plane',
  rectifying: 'Rectifying Plane',
};

function formatNumber(value: number | null | undefined, digits = 5): string {
  return value === null || value === undefined || !Number.isFinite(value)
    ? 'undefined'
    : value.toFixed(digits);
}

function vectorText(vector: Vector3 | null | undefined): string {
  return vector
    ? `(${formatNumber(vector.x)}, ${formatNumber(vector.y)}, ${formatNumber(vector.z)})`
    : 'undefined';
}

function LatexEquation({ formula, label }: { formula: string; label: string }) {
  const markup = katex.renderToString(formula, {
    displayMode: true,
    throwOnError: false,
    output: 'htmlAndMathml',
  });

  return (
    <div
      className="latex-equation"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function VectorValue({ label, value }: { label: string; value: Vector3 | null }) {
  return (
    <div className="value-row">
      <span>{label}</span>
      <code>{vectorText(value)}</code>
    </div>
  );
}

function DerivationSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="derivation-section" open>
      <summary>{title}</summary>
      <div className="derivation-content">{children}</div>
    </details>
  );
}

function PlaneEquation({ frame, type }: { frame: FrenetFrame; type: CharacteristicPlaneType }) {
  const plane = getCharacteristicPlane(frame, type);
  if (!plane) {
    return <p className="muted">Unavailable until T, N, and B are defined.</p>;
  }

  const [a, b, c] = [plane.normal.x, plane.normal.y, plane.normal.z].map((value) =>
    formatNumber(value),
  );
  const [x, y, z] = [plane.origin.x, plane.origin.y, plane.origin.z].map((value) =>
    formatNumber(value),
  );

  return (
    <>
      <div className="value-row">
        <span>Basis</span>
        <code>{type === 'osculating' ? 'T, N' : type === 'normal' ? 'N, B' : 'T, B'}</code>
      </div>
      <div className="value-row">
        <span>Normal</span>
        <code>{vectorText(plane.normal)}</code>
      </div>
      <LatexEquation
        label={`${PLANE_NAMES[type]} equation`}
        formula={`${a}(x-${x})+${b}(y-${y})+${c}(z-${z})=0`}
      />
    </>
  );
}

export function EducationalPanel({ curve, frame }: EducationalPanelProps) {
  const verboseMode = useAppStore((state) => state.verboseMode);
  const validation = useMemo(() => validateFrenetFrame(frame), [frame]);
  const speed = frame.firstDerivative.length();
  const crossMagnitude = frame.firstDerivative
    .clone()
    .cross(frame.secondDerivative)
    .length();

  return (
    <aside className="education-panel">
      <section className="panel-section current-frame">
        <div className="panel-kicker">Current frame</div>
        <h2>{curve.name}</h2>
        <p className="parameter-readout">t = {formatNumber(frame.t, 4)}</p>
        <VectorValue label="r(t)" value={frame.position} />
        <div className="metric-grid">
          <div><span>Curvature κ</span><strong>{formatNumber(frame.curvature)}</strong></div>
          <div><span>Torsion τ</span><strong>{formatNumber(frame.torsion)}</strong></div>
        </div>
      </section>

      <section className="panel-section frame-values">
        <div className="panel-kicker">Frenet frame</div>
        <VectorValue label="T" value={frame.tangent} />
        <VectorValue label="N" value={frame.normal} />
        <VectorValue label="B" value={frame.binormal} />
      </section>

      <section className="panel-section concepts">
        <div className="panel-kicker">Learn the geometry</div>
        <DerivationSection title="Unit Tangent T">
          <p>Points in the instantaneous direction of travel along the curve.</p>
          <LatexEquation
            label="Unit tangent formula"
            formula={String.raw`\mathbf{T}(t)=\frac{\mathbf{r}'(t)}{\|\mathbf{r}'(t)\|}`}
          />
        </DerivationSection>
        <DerivationSection title="Principal Normal N">
          <p>Points toward the direction in which the tangent is changing.</p>
          <LatexEquation
            label="Principal normal formula"
            formula={String.raw`\mathbf{N}(t)=\frac{\mathbf{T}'(t)}{\|\mathbf{T}'(t)\|}`}
          />
        </DerivationSection>
        <DerivationSection title="Binormal B">
          <p>Completes the right-handed frame and is perpendicular to T and N.</p>
          <LatexEquation
            label="Binormal formula"
            formula={String.raw`\mathbf{B}(t)=\mathbf{T}(t)\times\mathbf{N}(t)`}
          />
        </DerivationSection>
        <DerivationSection title="Curvature k">
          <p>Measures how quickly the curve changes direction.</p>
          <LatexEquation
            label="Curvature formula"
            formula={String.raw`\kappa(t)=\frac{\|\mathbf{r}'(t)\times\mathbf{r}''(t)\|}{\|\mathbf{r}'(t)\|^3}`}
          />
        </DerivationSection>
        <DerivationSection title="Torsion t">
          <p>Measures how strongly the curve twists out of its osculating plane.</p>
          <LatexEquation
            label="Torsion formula"
            formula={String.raw`\tau(t)=\frac{(\mathbf{r}'(t)\times\mathbf{r}''(t))\cdot\mathbf{r}'''(t)}{\|\mathbf{r}'(t)\times\mathbf{r}''(t)\|^2}`}
          />
        </DerivationSection>
        <DerivationSection title="Characteristic planes">
          <p><strong>Osculating:</strong> spanned by T and N; normal B.</p>
          <p><strong>Normal:</strong> spanned by N and B; normal T.</p>
          <p><strong>Rectifying:</strong> spanned by T and B; normal N.</p>
        </DerivationSection>
      </section>

      {verboseMode && <section className="panel-section verbose-section">
        <div className="panel-kicker">Verbose calculation</div>
        <DerivationSection title="1. Position and derivatives">
          <VectorValue label="r(t)" value={frame.position} />
          <VectorValue label="r'(t)" value={frame.firstDerivative} />
          <VectorValue label="r''(t)" value={frame.secondDerivative} />
          <VectorValue label="r'''(t)" value={frame.thirdDerivative} />
        </DerivationSection>
        <DerivationSection title="2. Tangent and normal">
          <LatexEquation label="Speed calculation" formula={`\\|\\mathbf{r}'(t)\\|=${formatNumber(speed)}`} />
          <VectorValue label="T" value={frame.tangent} />
          <VectorValue label="N" value={frame.normal} />
        </DerivationSection>
        <DerivationSection title="3. Curvature and torsion">
          <LatexEquation
            label="Derivative cross product magnitude"
            formula={`\\|\\mathbf{r}'(t)\\times\\mathbf{r}''(t)\\|=${formatNumber(crossMagnitude)}`}
          />
          <LatexEquation label="Curvature result" formula={`\\kappa=${formatNumber(frame.curvature)}`} />
          <LatexEquation label="Torsion result" formula={`\\tau=${formatNumber(frame.torsion)}`} />
          {frame.diagnostics.length > 0 && (
            <div className="diagnostics">{frame.diagnostics.map((message) => <p key={message}>{message}</p>)}</div>
          )}
        </DerivationSection>
        <DerivationSection title="4. Plane equations">
          {(Object.keys(PLANE_NAMES) as CharacteristicPlaneType[]).map((type) => (
            <div className="plane-equation" key={type}>
              <h3>{PLANE_NAMES[type]}</h3>
              <PlaneEquation frame={frame} type={type} />
            </div>
          ))}
        </DerivationSection>
        <DerivationSection title="5. Frame validation">
          <div className={validation.isValid ? 'validation valid' : 'validation invalid'}>
            {validation.isValid ? 'VALID orthonormal frame' : 'INCOMPLETE or invalid frame'}
          </div>
          <LatexEquation
            label="Frame normalization check"
            formula={String.raw`\|\mathbf{T}\|=\|\mathbf{N}\|=\|\mathbf{B}\|=1`}
          />
          <LatexEquation
            label="Frame orthogonality check"
            formula={String.raw`\mathbf{T}\cdot\mathbf{N}=\mathbf{T}\cdot\mathbf{B}=\mathbf{N}\cdot\mathbf{B}=0`}
          />
          {validation.messages.map((message) => <p className="muted" key={message}>{message}</p>)}
        </DerivationSection>
      </section>}
    </aside>
  );
}