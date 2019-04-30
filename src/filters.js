/** @format */

import dayjs from 'dayjs';

export default {
  dateTime(time) {
    return time && dayjs(time).format('YYYY-MM-DD HH:mm:ss');
  },
  date(time) {
    return time && dayjs(time).format('YYYY-MM-DD');
  },
};
