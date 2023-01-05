// Input date format: YYYY-DD-MMTHH-MM+HH:MM
export default (dateStart, dateEnd) => {
  try {
    if (dateStart && dateEnd) {
      const dateTimeStartSplitted = dateStart.split(' ');
      const dateTimeEndSplitted = dateEnd.split(' ');

      const dateSplitted = dateTimeStartSplitted[0].split('-');
      const year = dateSplitted[0];
      const day = dateSplitted[2];
      const month = dateSplitted[1];

      const timeStartSplitted = dateTimeStartSplitted[1];
      const timeEndSplitted = dateTimeEndSplitted[1];

      return {
        date: `${day}.${month}.${year}`,
        timeStart: timeStartSplitted,
        timeEnd: timeEndSplitted,
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
