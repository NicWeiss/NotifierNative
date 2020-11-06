export default item => {
  const clearedItem = { ...item };

  Object.keys(clearedItem).forEach(key => {
    if (!clearedItem[key]) {
      delete clearedItem[key];
    }
  });

  return clearedItem;
};
