import { ITEM_DEFINITIONS } from './items.js';

export const SAVE_KEY = 'castaway.south-bay.save';
export const SAVE_VERSION = 3;

function sanitizeStacks(stacks = {}) {
  const clean = {};
  for (const [itemId, quantity] of Object.entries(stacks)) {
    const definition = ITEM_DEFINITIONS[itemId];
    if (!definition || !Number.isInteger(quantity) || quantity < 0) continue;
    if (quantity > 0) clean[itemId] = Math.min(quantity, definition.maxStack);
  }
  return clean;
}

export function normalizeSave(candidate) {
  if (!candidate || typeof candidate !== 'object') return null;
  const v2 = candidate.version === 1 ? { ...candidate, version: 2, day: 1, fireFuel: 64, phase: 'day1' } : candidate;
  const migrated = v2.version === 2 ? {
    ...v2,
    version: 3,
    fullness: v2.day === 2 ? 54 : 62,
    fallenTreeCleared: false,
    signalRevealed: false,
    stormTime: 0,
  } : v2;
  if (migrated.version !== SAVE_VERSION) return null;
  const objectiveIndex = Number.isInteger(migrated.objectiveIndex) ? Math.min(Math.max(migrated.objectiveIndex, 0), 19) : 0;
  const equippedTool = migrated.inventory?.equipped?.tool;
  const stacks = sanitizeStacks(migrated.inventory?.stacks);
  return {
    version: SAVE_VERSION,
    savedAt: typeof migrated.savedAt === 'string' ? migrated.savedAt : new Date(0).toISOString(),
    objectiveIndex,
    inventory: { version: 1, stacks, equipped: { tool: equippedTool === 'stone_axe' && stacks.stone_axe ? 'stone_axe' : null } },
    water: Number.isFinite(migrated.water) ? Math.min(Math.max(migrated.water, 0), 100) : 46,
    energy: Number.isFinite(migrated.energy) ? Math.min(Math.max(migrated.energy, 0), 100) : 71,
    wetness: Number.isFinite(migrated.wetness) ? Math.min(Math.max(migrated.wetness, 0), 100) : 8,
    fullness: Number.isFinite(migrated.fullness) ? Math.min(Math.max(migrated.fullness, 0), 100) : 62,
    fireFuel: Number.isFinite(migrated.fireFuel) ? Math.min(Math.max(migrated.fireFuel, 0), 100) : 0,
    shelterBuilt: Boolean(migrated.shelterBuilt),
    fallenTreeCleared: Boolean(migrated.fallenTreeCleared),
    signalRevealed: Boolean(migrated.signalRevealed),
    stormTime: Number.isFinite(migrated.stormTime) ? Math.min(Math.max(migrated.stormTime, 0), 180) : 0,
    phase: ['day1', 'night1', 'day2'].includes(migrated.phase) ? migrated.phase : 'day1',
    day: migrated.day === 2 ? 2 : 1,
    position: Array.isArray(migrated.position) && migrated.position.length === 3 && migrated.position.every(Number.isFinite) ? migrated.position : [0, 0.18, 43],
  };
}

export function saveGame(storage, snapshot) {
  const normalized = normalizeSave({ ...snapshot, version: SAVE_VERSION, savedAt: new Date().toISOString() });
  if (!normalized) return false;
  storage.setItem(SAVE_KEY, JSON.stringify(normalized));
  return true;
}

export function loadGame(storage) {
  try {
    const raw = storage.getItem(SAVE_KEY);
    return raw ? normalizeSave(JSON.parse(raw)) : null;
  } catch (_error) {
    return null;
  }
}

export function clearGame(storage) {
  storage.removeItem(SAVE_KEY);
}
