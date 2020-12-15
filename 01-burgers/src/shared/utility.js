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
 * @param {object} oldObject the object in which `updatedProperties` will be merged
 * @param {object} updatedProperties an object containing properties and their values that will be merged with the `oldObject`
 */
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

/**
 * Checks whether a given `value` satisfies all validation `rules`.
 * For example, `rules` could be an object as follows
 * ```
 *   rules = {
 *     required: true,
 *     isEmail: true,
 *     minLength: 6
 *   }
 * ```
 * @param {string|number|boolean} value the value to be checked
 * @param {object} rules an object representing a map of what validation rules should be checked
 * @returns `true` if all `rules` are satisfied, `false` otherwise.
 */
export const checkValidity = (value, rules) => {
  if (!rules) {
    return true
  }

  let isValid = true
  if (rules.required) {
    isValid = isValid && value.trim() !== ''
  }
  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength
  }
  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = isValid && pattern.test(value)
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = isValid && pattern.test(value)
  }

  return isValid
}
