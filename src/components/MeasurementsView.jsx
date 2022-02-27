import { useState, useEffect } from 'react';

const MeasurementsView = ({ data, setId, formatDate }) => {
  const { location, country, city, coordinates, count, lastUpdated, firstUpdated, sourceName, parameters} = data;
  const [measurements, setMeasurements] = useState(null);
  const [mostRecent, setMostRecent] = useState([]);

  useEffect(() => {
    let url= 'https://docs.openaq.org/v1/measurements?limit=1&country=US&location=' +  location;
    const recent = parameters.map(current => (
      fetch(url + '&parameter=' + current).then(data => data.json())
    ));

    Promise.all(recent)
        .then(dataArr => dataArr.map(current => current.results[0]))
        .then(resultArr => setMostRecent(resultArr));
    // console.log('mostRecent', mostRecent)
}, []);

  if (mostRecent && mostRecent.length > 0) {
      return (
      <div className='measurements'>
        <header>
          <h1 style={{ fontSize: 48 }}>{location}</h1>
          <div>in <span style={{ fontSize: 24, marginLeft: 5 }}>{`${city}, ${country}`}</span></div>
        </header>
        <div className='details'>
          <div className='panel'>
            <h3 style={{ marginTop: 0 }}>Details</h3>
            <div>Measurements {count} </div>
            <div>Coordinates {`${coordinates.latitude}, ${coordinates.longitude}`}</div>
            <div>Project Collection Dates {`${formatDate(firstUpdated)} - ${formatDate(lastUpdated)}`}</div>
          </div>
          <div className='mid-panel'>
            <h3 style={{ marginTop: 0 }}>Latest Measurements</h3>
            {
            // mostRecent.map((current, i) => {
            //   console.log('mostRecent', mostRecent)
            //   return (
            //   <div key={i}>{current.parameter}</div>
            //   )})
            console.log('most recent', mostRecent)


              }
          </div>
          <div className='panel'>
            <h3 style={{ marginTop: 0 }}>Source</h3>
            <div>{sourceName}</div>
          </div>
        </div>
      </div>
    )
  }
  return null;

};

export default MeasurementsView;
