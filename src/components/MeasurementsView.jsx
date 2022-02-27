import { useState, useEffect } from 'react';

import Measurement from './Measurement';

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
            <div>
              <div style={{ fontSize: 20 }}> {count} </div>
              <div>Measurements</div>
            </div>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <div>Coordinates</div>
              <div>{`${coordinates.latitude}, ${coordinates.longitude}`}</div>
            </div>
            <div>Project Collection Dates {`${formatDate(firstUpdated)} - ${formatDate(lastUpdated)}`}</div>
          </div>
          <div className='mid-panel'>
            <h3 style={{ marginTop: 0 }}>Latest Measurements</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
               { mostRecent.map((current, i) => (
              <Measurement data={current} key={i} formatDate={formatDate}/>
            )) }
            </div>
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
