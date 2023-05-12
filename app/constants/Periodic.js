const periodics = {
  once: 'Once',
  day_of_week: 'Day of week',
  every_month: 'Monthly',
  every_year: 'Yearly',
  everyday: 'Every day',
  workday: 'On workdays',
  weekend: 'Weekend',
  first_month_day: 'First day of the month',
  last_month_day: 'Last day of the month'
}

const dayOfWeek = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
}


export default {
  get_periodic: periodics,
  get_day_of_week: dayOfWeek,

  getListOfPeriods: () => {
    const list = [];

    for (const [key, value] of Object.entries(periodics)) {
      list.push(
        {
          id: key,
          name: value
        }
      );
    }

    return list;
  },

  getListOfWeekDays: () => {
    const list = [];

    for (const [key, value] of Object.entries(dayOfWeek)) {
      list.push(
        {
          id: key,
          name: value
        }
      );
    }

    return list;
  },

  getPeriodsForDate: ['once', 'every_month', 'every_year']
};
