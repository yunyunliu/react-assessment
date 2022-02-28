const Measurement = ({ data, formatDate }) => {
  const { parameter, value, unit, date } = data;

  const getTime = dateTime => {
    const time = dateTime.split('T')[1];
    return time.slice(0, time.length - 4);
  }

  return (
    <div className='param-data'>
      <div style={{ fontSize: 20 }}>{parameter === 'pm25' ? 'PM2.5' : parameter.toUpperCase()}</div>
      <div>{value}</div>
      <div>{unit}</div>
      <div>{formatDate(date.utc)} {getTime(date.utc)}</div>
    </div>
  );
};

export default Measurement;
