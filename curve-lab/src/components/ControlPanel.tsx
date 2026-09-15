import { curveRegistry, getCurveById } from '../curves';
import { useAppStore, type VisibilitySettings } from '../state/useAppStore';

const VECTOR_TOGGLES: { key: keyof VisibilitySettings; label: string }[] = [
  { key: 'showTangent', label: 'T' },
  { key: 'showNormal', label: 'N' },
  { key: 'showBinormal', label: 'B' },
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
  const setSelectedCurveId = useAppStore((s) => s.setSelectedCurveId);
  const setT = useAppStore((s) => s.setT);
  const toggleVisibility = useAppStore((s) => s.toggleVisibility);

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
    </div>
  );
}
