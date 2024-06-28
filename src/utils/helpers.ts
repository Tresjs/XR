/**
 * Filters to unique entries of an array.
 */
export const filterUniq = <T>(arr: T[]): T[] => Array.from(new Set<T>(arr))
