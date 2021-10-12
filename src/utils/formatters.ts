export const formatNumberWithCommas = (num: number): string =>
  num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const commaEveryThirdChar = (num: number): string =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
