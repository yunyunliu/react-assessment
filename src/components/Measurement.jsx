const Measurement = ({ data, formatDate, getTime }) => {
  const { parameter, value, unit, date } = data;
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
