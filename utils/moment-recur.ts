import moment from 'moment';
import 'moment-recur-ts';

export const getHabitPattern = (recurrence: any, createdAt: string) => {
  let recurPattern;

  const date = createdAt.substring(0, 10);
  const fromStart = moment(date);

  // EVERYDAY
  if (recurrence.everyday) {
    const pattern = fromStart.recur().every(1).day();
    recurPattern = pattern;

    // DAYS OF THE WEEK
  } else if (recurrence.daysOfWeek?.length) {
    console.log('recurrence', recurrence);
    const pattern = fromStart.recur().every(recurrence.daysOfWeek).daysOfWeek();
    recurPattern = pattern;

    // DAYS OF THE MONTH
  } else if (recurrence.daysOfMonth?.length) {
    const pattern = fromStart.recur().every(recurrence.daysOfMonth).daysOfMonth();
    recurPattern = pattern;
  }

  return recurPattern;
};
