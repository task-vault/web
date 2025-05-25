const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  };

  return date.toLocaleString('en-US', options).replace(',', '');
};

export default formatDeadline;
