import moment from 'moment-timezone';

export const guessTimeZone = () => {
  try {
    return moment.tz.guess();
  } catch (err) {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (err) {
      return 'UTC';
    }
  }
};
