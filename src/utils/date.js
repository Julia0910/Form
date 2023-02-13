export const renderAgePhrase = (number) => {
  const lastOne = Number(number.toString().slice(-1));
  if (number > 10 && number < 15) {
    return `${number} лет`;
  }
  if (lastOne === 1) return `${number} год`;
  if ([2, 3, 4].indexOf(lastOne) >= 0) return `${number} года`;
  return `${number} лет`;
};
