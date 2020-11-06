const processToTwoDigits = value => value > 9 ? value : `0${value}`;

// Формат входящих дат: js объект Date
export default (dateStart, dateEnd) => {
  try {
    if (dateStart && dateEnd) {
      const day = processToTwoDigits(dateStart.getDate());
      const month = processToTwoDigits(dateStart.getMonth() + 1);
      const year = dateStart.getFullYear();

      const timeStart = `${processToTwoDigits(dateStart.getHours())}:${processToTwoDigits(dateStart.getMinutes())}`;
      const timeEnd = `${processToTwoDigits(dateEnd.getHours())}:${processToTwoDigits(dateEnd.getMinutes())}`;

      return {
        date: `${day}.${month}.${year}`,
        dateAlternate: `${year}-${month}-${day}`,
        timeStart: timeStart,
        timeEnd: timeEnd,
      };
    } else {
      return {
        date: '',
        timeStart: '',
        timeEnd: '',
      };
    }
  } catch (error) {
    console.log(error);
  }
};
