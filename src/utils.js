/**
 * Tests a given value on being a string.
 *
 * @param value *   Value to test
 * @return {boolean}
 */
const isString = value =>
  Object.prototype.toString.call(value) === '[object String]'

exports.isString = isString

/**
 * Tests a given value on being an Object.
 *
 * @param value *   Value to test
 * @return {boolean}
 */
const isObject = value =>
  Object.prototype.toString.call(value) === '[object Object]'

exports.isObject = isObject
