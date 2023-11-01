/**
 * An alternative to the standard reduce function that infers the type of the initial value from
 * the given array type.
 * @param array The array to reduce.
 * @param init The initial value of the accumulator.
 * @param callbackFn The function to execute on each element in the array.
 * @returns The reduced value.
 */
export function reduce<T>(
  array: T[],
  init: T[],
  callbackFn: (acc: T[], curr: T) => T[]
) {
  return array.reduce<T[]>(callbackFn, init);
}
