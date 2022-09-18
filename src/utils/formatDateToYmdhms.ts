const formatDateToYmdhms = (date: Date) => {
  const ymdRegex = /(\d\w*)/g;
  const [yyyy, mm, dd] = date.toLocaleDateString().match(ymdRegex)!;
  const [amPm, hhmmss] = date.toLocaleTimeString().split(' ');
  const [h, m, s] = hhmmss.split(':');

  return `${yyyy}년 ${mm}월 ${dd}일 ${amPm} ${h}시 ${m}분`;
};

export { formatDateToYmdhms };
