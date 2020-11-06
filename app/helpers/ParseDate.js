// Формат входящих дат: YYYY-DD-MM
export default value => {
  try {
    const dateSplitted = value.split('-');
    const year = dateSplitted[0];
    const day = dateSplitted[2];
    const month = dateSplitted[1];

    return `${day}.${month}.${year}`;
  } catch (error) {
    console.log(error)
  }
};
