// File names in Camel Case
// Functions that are reusable are stored here

import moment from 'moment';

const padZero = (num: number, size: number) => {
  let s = String(num);
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};

// convert to format: 00:00
export const timeConvert = (num: number) => {
  const minutes = padZero(Math.floor(num / 1000 / 60), 2);
  const seconds = padZero(num % 60, 2);
  return `${minutes}:${seconds}`;
};

export const secondToTime = (num: number) => {
  const minutes = padZero(Math.floor(num / 60), 2);
  const seconds = padZero(num % 60, 2);
  return `${minutes}:${seconds}`;
};

export const unixToDatetime = (s: number) => {
  // let unix_timestamp: number = parseInt(s, 10);
  var timestamp = moment.unix(s);
  return timestamp.format('DD/MM');
};
