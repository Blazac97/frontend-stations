import moment from "moment";

export const getHumanizedDuration = (duration: moment.Duration) => {
  const result: string[] = [];
  const years = duration.years();
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  if (years) {
    result.push(`${years}г`);
  }
  if (months) {
    result.push(`${months} мес`);
  }
  if (weeks) {
    result.push(`${weeks} нед`);
  }
  if (days) {
    result.push(`${days} д`);
  }
  if (hours) {
    result.push(`${hours} ч`);
  }
  if (minutes) {
    result.push(`${minutes} мин`);
  }
  return result.join(" ");
};
