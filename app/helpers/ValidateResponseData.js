export default (data, model = {}) => {
  const isDataArray = Array.isArray(data);

  if (isDataArray) {
    return data.map(item => {
      let result = { ...model };

      for (let key in model) {
        if (item[key]) {
          result[key] = item[key];
        }
      }

      return result;
    });
  } else {
    let result = { ...model };

    for (let key in model) {
      if (data[key]) {
        result[key] = data[key];
      }
    }

    return result;
  }
};
