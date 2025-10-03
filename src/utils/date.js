import moment from "moment";

let Moment = (date, format) => {
  var newDate = moment.utc(new Date(date)).format(format);
  return newDate;
}

export function isNotExpired(endDateStr) {
  const endDate = new Date(endDateStr);
  const currentDate = new Date();
  
  endDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  return currentDate <= endDate;
}

export default Moment;