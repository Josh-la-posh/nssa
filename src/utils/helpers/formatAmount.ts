export const formatAmount = (amount?: number) => {
  const res = Number(amount || 0).toLocaleString('default', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return res;
};
