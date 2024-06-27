export function useHelpers() {
  /**
   * Filters to unique entries of an array.
   */
  const uniq = <T>(arr: T[]): T[] => Array.from(new Set<T>(arr))

  return { uniq }
}
