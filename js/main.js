function getRandomIntFromTo(from, to) {
  if (from < 0 || to <= from) {
    return false;
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from)) + from;
}

function getRandomIntFromToWithComma(from, to, countSignsAfterComma) {
  if (from < 0 || to <= from) {
    return false;
  }
  return +(Math.random() * (to - from)).toFixed(countSignsAfterComma) + from;
}

getRandomIntFromTo(0, 4);
getRandomIntFromToWithComma(0.4, 4.9, 3);
