export const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export const getScrollProgress = (documentLike, windowLike) => {
  const runway = documentLike.documentElement.scrollHeight - windowLike.innerHeight;
  return runway > 0 ? clamp(windowLike.scrollY / runway) : 0;
};
