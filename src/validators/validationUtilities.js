export function isEmail(email) {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
}
export function isAlpha(str) {
  return /^[a-zA-Z]*$/.test(str);
}
export function isPassword(str) {
  return str.length >= 6;
}
export function isEmpty(str) {
  return str === "";
}
export function codeLength(str) {
  return str.length === 5;
}
export function isNumeric(code) {
  return !isNaN(parseInt(code));
}
