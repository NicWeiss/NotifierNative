export default (data, model = {}) => {
  const isDataArray = Array.isArray(data);
  let mapped = {};

  if (isDataArray) {
    mapped = data.map(item => {
      let result = { ...model };

      for (let key in model) {
        if (item[key]) {
          result[key] = item[key];
        }
      }

      return result;
    });
  } else {
    mapped = { ...model };

    for (let key in model) {
      if (data[key]) {
        mapped[key] = data[key];
      }
    }

  }

  return mapped;
};
