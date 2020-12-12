/**
 * Combines an old object with another object which contains properties
 * that should be updated with new values; and creates and returns a
 * new object with these properties updated.
 *
 * ```
 *   const oldObject = {
 *     a: 1,
 *     b: 2,
 *     c: 'three'
 *   }
 *   const updatedProperties = {
 *     b: 'two',
 *     c: 3
 *   }
 * ```
 * `updateObject(oldObject, updatedProperties)` will return
 * ```
 *   {
 *     a: 1,
 *     b: 'two',
 *     c: 3
 *   }
 * ```
 *
 * @param {object} oldObject The object in which `updatedProperties` will be merged
 * @param {object} updatedProperties an object containing properties and their values that will be merged with the `oldObject`
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}
