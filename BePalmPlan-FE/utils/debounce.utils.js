export const DEBOUNCE_TIME = 1000;
export const debounce = (func, delay) => {
  let debounceTimeoutId;
  return (...args) => {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => func(...args), delay);
  };
};
