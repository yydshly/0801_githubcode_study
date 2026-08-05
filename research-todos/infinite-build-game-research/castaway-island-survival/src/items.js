export const ITEM_DEFINITIONS = Object.freeze({
  wood: Object.freeze({ id: 'wood', name: '干燥木料', category: 'material', maxStack: 20, symbol: '▰', description: '潮线上晒干的木料，可制作工具与避雨棚。' }),
  stone: Object.freeze({ id: 'stone', name: '锋利石块', category: 'material', maxStack: 20, symbol: '◆', description: '质地坚硬、边缘锋利，可作为石斧的刃。' }),
  stone_axe: Object.freeze({ id: 'stone_axe', name: '石斧', category: 'tool', maxStack: 1, symbol: '⌁', description: '用木柄和石刃绑成的基础工具，已装备在工具槽。' }),
  raw_fish: Object.freeze({ id: 'raw_fish', name: '新鲜礁鱼', category: 'food', maxStack: 5, symbol: '◁', description: '刚从潟湖捕获，必须在营火上烤熟。' }),
  cooked_fish: Object.freeze({ id: 'cooked_fish', name: '烤熟的鱼', category: 'food', maxStack: 5, symbol: '◀', description: '第一份稳定食物，也是你在岛上活过第一日的证明。' }),
});

export const RECIPES = Object.freeze({
  stone_axe: Object.freeze({
    id: 'stone_axe',
    name: '制作石斧',
    output: Object.freeze({ itemId: 'stone_axe', quantity: 1 }),
    ingredients: Object.freeze({ wood: 1, stone: 2 }),
  }),
});

export function createInventory(initial = {}) {
  const stacks = new Map();
  const equipped = { tool: null };

  function validateItem(itemId) {
    if (!ITEM_DEFINITIONS[itemId]) throw new Error(`Unknown item: ${itemId}`);
  }

  function count(itemId) {
    validateItem(itemId);
    return stacks.get(itemId) ?? 0;
  }

  function canAdd(itemId, quantity = 1) {
    validateItem(itemId);
    return Number.isInteger(quantity) && quantity > 0 && count(itemId) + quantity <= ITEM_DEFINITIONS[itemId].maxStack;
  }

  function add(itemId, quantity = 1) {
    if (!canAdd(itemId, quantity)) return false;
    stacks.set(itemId, count(itemId) + quantity);
    return true;
  }

  function remove(itemId, quantity = 1) {
    validateItem(itemId);
    if (!Number.isInteger(quantity) || quantity <= 0 || count(itemId) < quantity) return false;
    const remaining = count(itemId) - quantity;
    if (remaining) stacks.set(itemId, remaining);
    else stacks.delete(itemId);
    if (equipped.tool === itemId && remaining === 0) equipped.tool = null;
    return true;
  }

  function consume(itemId, quantity = 1) {
    validateItem(itemId);
    if (ITEM_DEFINITIONS[itemId].category !== 'food') return false;
    return remove(itemId, quantity);
  }

  function canCraft(recipeId) {
    const recipe = RECIPES[recipeId];
    if (!recipe) return false;
    if (!canAdd(recipe.output.itemId, recipe.output.quantity)) return false;
    return Object.entries(recipe.ingredients).every(([itemId, quantity]) => count(itemId) >= quantity);
  }

  function craft(recipeId) {
    const recipe = RECIPES[recipeId];
    if (!recipe || !canCraft(recipeId)) return false;
    const before = new Map(stacks);
    try {
      for (const [itemId, quantity] of Object.entries(recipe.ingredients)) {
        if (!remove(itemId, quantity)) throw new Error('Atomic remove failed');
      }
      if (!add(recipe.output.itemId, recipe.output.quantity)) throw new Error('Atomic add failed');
      if (ITEM_DEFINITIONS[recipe.output.itemId].category === 'tool') equipped.tool = recipe.output.itemId;
      return true;
    } catch (_error) {
      stacks.clear();
      before.forEach((quantity, itemId) => stacks.set(itemId, quantity));
      return false;
    }
  }

  function equip(slot, itemId) {
    if (slot !== 'tool' || count(itemId) < 1 || ITEM_DEFINITIONS[itemId].category !== 'tool') return false;
    equipped.tool = itemId;
    return true;
  }

  function serialize() {
    return { version: 1, stacks: Object.fromEntries(stacks), equipped: { ...equipped } };
  }

  function restore(serialized) {
    if (!serialized || typeof serialized !== 'object') return false;
    const nextStacks = new Map();
    for (const [itemId, quantity] of Object.entries(serialized.stacks ?? {})) {
      if (!ITEM_DEFINITIONS[itemId] || !Number.isInteger(quantity) || quantity < 0 || quantity > ITEM_DEFINITIONS[itemId].maxStack) return false;
      if (quantity > 0) nextStacks.set(itemId, quantity);
    }
    const nextTool = serialized.equipped?.tool ?? null;
    if (nextTool && (ITEM_DEFINITIONS[nextTool]?.category !== 'tool' || !nextStacks.get(nextTool))) return false;
    stacks.clear();
    nextStacks.forEach((quantity, itemId) => stacks.set(itemId, quantity));
    equipped.tool = nextTool;
    return true;
  }

  Object.entries(initial).forEach(([itemId, quantity]) => {
    validateItem(itemId);
    if (quantity > 0) stacks.set(itemId, Math.min(quantity, ITEM_DEFINITIONS[itemId].maxStack));
  });

  return { count, add, remove, consume, canCraft, craft, equip, serialize, restore, equipped };
}
