import { curveRegistry, getCurveById } from '../curves';
import { useAppStore, type VisibilitySettings } from '../state/useAppStore';

const VECTOR_TOGGLES: { key: keyof VisibilitySettings; label: string }[] = [
  { key: 'showTangent', label: 'T' },
  { key: 'showNormal', label: 'N' },
  { key: 'showBinormal', label: 'B' },
];

const PLANE_TOGGLES: { key: keyof VisibilitySettings; label: string }[] = [
  { key: 'showOsculatingPlane', label: 'Osculating' },
  { key: 'showNormalPlane', label: 'Normal' },
  { key: 'showRectifyingPlane', label: 'Rectifying' },
];

/**
 * Bare-bones controls for Phase 1: pick a curve, drag t, toggle which
 * Frenet vectors are shown. No formulas live here — it only reads/writes
 * the Zustand store.
 */
export function ControlPanel() {
  const selectedCurveId = useAppStore((s) => s.selectedCurveId);
  const t = useAppStore((s) => s.t);
  const visibility = useAppStore((s) => s.visibility);
  const verboseMode = useAppStore((s) => s.verboseMode);
  const setSelectedCurveId = useAppStore((s) => s.setSelectedCurveId);
  const setT = useAppStore((s) => s.setT);
  const toggleVisibility = useAppStore((s) => s.toggleVisibility);
  const setVerboseMode = useAppStore((s) => s.setVerboseMode);

  const curve = getCurveById(selectedCurveId);
  const [start, end] = curve.domain;

  return (
    <div className="control-panel">
      <label>
        Curve
        <select value={selectedCurveId} onChange={(e) => setSelectedCurveId(e.target.value)}>
          {curveRegistry.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        t = {t.toFixed(3)}
        <input
          type="range"
          min={start}
          max={end}
          step={(end - start) / 1000}
          value={t}
          onChange={(e) => setT(parseFloat(e.target.value))}
        />
      </label>

      <div className="vector-toggles">
        {VECTOR_TOGGLES.map(({ key, label }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={visibility[key]}
              onChange={() => toggleVisibility(key)}
            />
            {label}
          </label>
        ))}
      </div>

      <fieldset className="plane-toggles">
        <legend>Planes</legend>
        {PLANE_TOGGLES.map(({ key, label }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={visibility[key]}
              onChange={() => toggleVisibility(key)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <label className="verbose-toggle">
        <input
          type="checkbox"
          checked={verboseMode}
          onChange={(event) => setVerboseMode(event.target.checked)}
        />
        Verbose mode
      </label>
    </div>
  );
}
