const changeTimeZone = (data, currentDate, gmt) => {
  if (data.time) {
    if (data.date) {
      const separatedDate = data.date.split('-');
      currentDate.setFullYear(separatedDate[0])
      currentDate.setMonth(separatedDate[1] - 1)
      currentDate.setDate(separatedDate[2]);
    }

    const separatedTime = data.time.split(':');
    currentDate.setHours(Number(separatedTime[0]) + gmt);
    currentDate.setMinutes(separatedTime[1]);

    if (data.date) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
      const date = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
      data.date = `${year}-${month}-${date}`;
    }

    const hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    data.time = `${hours}:${minutes}`;
  }

  return data;
}


const defaultAdapter = (data) => {
  const currentDate = new Date();
  const gmt = (currentDate.getTimezoneOffset() / 60) * (-1);

  if (Array.isArray(data)) {
    data = data.map(el => changeTimeZone(el, currentDate, gmt))
  } else {
    data = changeTimeZone(data, currentDate, gmt)
  }

  return data;
}

const defaultSerializer = (data) => {
  const currentDate = new Date();
  const gmt = (currentDate.getTimezoneOffset() / 60);

  if (Array.isArray()) {
    data = data.map(el => changeTimeZone(el, currentDate, gmt))
  } else {
    data = changeTimeZone(data, currentDate, gmt)
  }

  return data;
}

export { defaultAdapter, defaultSerializer };
