import { useState, useEffect } from 'react';

const MeasurementsView = ({ data, setId, formatDate }) => {
  const { location, country, city, coordinates, count, lastUpdated, firstUpdated, sourceName, parameters} = data;
  const [measurements, setMeasurements] = useState(null);
  const [mostRecent, setMostRecent] = useState(null);

  useEffect(() => {
    let url= 'https://docs.openaq.org/v1/measurements?limit=100&country=US&location=' +  location;
    const recent = [];
    const getMostRecent = () => {
      parameters.forEach(async current => {
        const res = await fetch(url + '&parameter=' + current);
        const data = await res.json();
        recent.push(data.results[0]);
      });
    }
    getMostRecent();
    setMostRecent(recent);
    // console.log('mostRecent', mostRecent)
}, []);

  // if (measurements) {
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
            {console.log('recent', mostRecent)}
          </div>
          <div className='panel'>
            <h3 style={{ marginTop: 0 }}>Source</h3>
            <div>{sourceName}</div>
          </div>
        </div>
      </div>
    )
  // }
  // return null;

};

export default MeasurementsView;
