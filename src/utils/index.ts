/**
 * @function trampoline
 * @param {Function} func
 * @returns {T} any
 * @description Trampoline function.
 * Transofrms recursion into a loop under the hood, so program won't excede
 * maximum stack call. Reference: https://medium.com/openmindonline/js-monday-06-adopting-memory-safe-recursion-d26dcee409c9
 */

export function trampoline<T>(func: Function): T {
  let result = func.apply(func, ...arguments);

  while(result && typeof(result) === "function") {
    result = result();
  }

  return result;
}
