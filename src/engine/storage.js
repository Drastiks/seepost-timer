const STORAGE_KEY = 'atelier_comptoir_progression_v1';

const DEFAULT_STATE = {
  currentLevelId: 1,
  completedIds: []
};

function hasLocalStorage() {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function loadProgress() {
  if (!hasLocalStorage()) {
    return { ...DEFAULT_STATE, completedIds: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, completedIds: [] };
    const parsed = JSON.parse(raw);
    const completedIds = Array.isArray(parsed.completedIds)
      ? [...new Set(parsed.completedIds.filter((n) => Number.isInteger(n) && n >= 1 && n <= 40))]
      : [];
    const currentLevelId =
      Number.isInteger(parsed.currentLevelId) && parsed.currentLevelId >= 1 && parsed.currentLevelId <= 40
        ? parsed.currentLevelId
        : 1;
    return { currentLevelId, completedIds };
  } catch {
    return { ...DEFAULT_STATE, completedIds: [] };
  }
}

export function saveProgress(state) {
  if (!hasLocalStorage()) return;
  try {
    const payload = {
      currentLevelId: state.currentLevelId,
      completedIds: [...new Set(state.completedIds)]
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function markLevelCompleted(state, levelId) {
  const completedIds = state.completedIds.includes(levelId)
    ? state.completedIds
    : [...state.completedIds, levelId].sort((a, b) => a - b);
  const nextState = {
    currentLevelId: levelId,
    completedIds
  };
  saveProgress(nextState);
  return nextState;
}

export function resetProgress() {
  const fresh = { ...DEFAULT_STATE, completedIds: [] };
  if (hasLocalStorage()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return fresh;
}
