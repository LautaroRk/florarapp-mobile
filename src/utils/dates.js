export const dateToString = (dateObject, showYear = false) => {
  const date = twoDigits(dateObject.getDate());
  const month = twoDigits(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear().toString().substring(2,5);
  let _hours = dateObject.getHours();
  let _minutes = dateObject.getMinutes();
  const _seconds = dateObject.getSeconds();
  // @TODO: REVISAR
  if (_seconds >= 59) _minutes += 1;
  if (_minutes === 60) {
    _minutes = 0;
    _hours += 1;
  }
  const minutes = twoDigits(_minutes);
  const hours = twoDigits(_hours);

  const isToday = new Date().setHours(0,0,0) == dateObject.setHours(0,0,0);
  const fullDate = isToday ? 'HOY' : `${date}/${month}${showYear ? '/' + year : ''}`;
  
  return `${fullDate}  ${hours}:${minutes}hs`;
};

export const msToTime = (ms) => {
  // 1h = 3600000ms
  const hours = getHours(ms);
  // 1m = 60000ms
  const minutes = getMinutes(ms);
  // 1s = 1000ms
  const seconds = getSeconds(ms);

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

// Averiguar si no es mas performatico declararla en el mismo archivo del componente Seconds (dentro de Timer)
export const getSeconds = (ms) => {
  return twoDigits(parseInt((ms % 60000) / 1000));
};

export const getMinutes = (ms) => {
  return twoDigits(parseInt((ms % 3600000) / 60000)) + ':';
};

export const getHours = (ms) => {
  if (ms < 3600000) return '';
  return twoDigits(parseInt(ms / 3600000)) + ':';
};

export const twoDigits = (number) => {
  if (number < 10) return '0' + number;
  return number; 
};