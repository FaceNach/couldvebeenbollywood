export const formattedPercentage = (num: number): number => {
  if (num <= 0.01) {
    const out = parseFloat(num.toFixed(8));
    return out;
  }

  return parseFloat(num.toFixed(2));
};
