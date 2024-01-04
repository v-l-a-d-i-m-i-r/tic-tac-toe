export const classNames = (conditions: Record<string, boolean>): string => Object
  .entries(conditions)
  .filter(([, condition]) => Boolean(condition))
  .map(([className]) => className)
  .join(' ');
