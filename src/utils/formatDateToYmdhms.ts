const formatDateToYmdhms = (date: Date) => {
  const [yyyy, mm, dd] = date.toISOString().split('T')[0].split('-');
  const [h, m, s] = date.toTimeString().split(' ')[0].split(':');

  const amPm = Number(h) < 12 ? '오전' : '오후';
  const formatMonth = Number(h) < 12 ? Number(h) : Number(h) - 12;

  return `${yyyy}년 ${Number(mm)}월 ${dd}일 ${amPm} ${formatMonth}시 ${m}분`;
};

export { formatDateToYmdhms };
