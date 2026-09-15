import { create } from 'zustand';
import { curveRegistry } from '../curves';

export interface VisibilitySettings {
  showTangent: boolean;
  showNormal: boolean;
  showBinormal: boolean;
}

interface AppState {
  selectedCurveId: string;
  t: number;
  visibility: VisibilitySettings;
  setSelectedCurveId: (id: string) => void;
  setT: (t: number) => void;
  toggleVisibility: (key: keyof VisibilitySettings) => void;
}

const initialCurve = curveRegistry[0];
const initialT = (initialCurve.domain[0] + initialCurve.domain[1]) / 2;

/**
 * Minimal application-level state, per the SRS's instruction to keep
 * Phase 1 state simple: which curve is selected, the current parameter t,
 * and which Frenet vectors are visible. Nothing here computes or stores
 * derived math — components read this and pass it into the math engine
 * via useFrenetFrame.
 */
export const useAppStore = create<AppState>((set) => ({
  selectedCurveId: initialCurve.id,
  t: initialT,
  visibility: { showTangent: true, showNormal: true, showBinormal: true },

  setSelectedCurveId: (id) =>
    set(() => {
      const curve = curveRegistry.find((c) => c.id === id) ?? initialCurve;
      const [start, end] = curve.domain;
      return { selectedCurveId: curve.id, t: (start + end) / 2 };
    }),

  setT: (t) => set({ t }),

  toggleVisibility: (key) =>
    set((state) => ({
      visibility: { ...state.visibility, [key]: !state.visibility[key] },
    })),
}));
