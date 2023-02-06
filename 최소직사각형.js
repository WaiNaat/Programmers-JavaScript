const solution = (sizes) => {
  let walletLonger = 0;
  let walletShorter = 0;
  sizes.forEach((size) => {
    const [longer, shorter] = size.sort((a, b) => b - a);
    if (longer > walletLonger) walletLonger = longer;
    if (shorter > walletShorter) walletShorter = shorter;
  });
  return walletLonger * walletShorter;
};
