import { useState, useEffect } from 'react';

import Card from './Card';
import MeasurementsView from './MeasurementsView';

function App() {
  const [source, setSource] = useState(null);
  const [limit, setLimit] = useState(null);
  const [data, setData] = useState(null);
  const [isViewing, setIsViewing] = useState(null)
;
  useEffect(() => {
    fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${50}`)
      .then(res => res.json())
      .then(data => {
        setData(data.results);
        console.log(data.results);
        })
      .catch(err =>  console.log('request failed'))
  }, []);

  const handleClick = async e => {
    e.preventDefault();
    // const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${parseInt(limit) + 20}&entity=${source}`);
    const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${50}`);
    if (res.ok) {
      const data = await res.json();
      setData(data.results);
      console.log(data.results);
    } else {
      console.log('request failed');
    }
  }

  if (isViewing) {
    console.log(isViewing)
     const location = data.find(current => current.id === isViewing);
    return (
      <MeasurementsView data={location} />
    );
  }
  return (
    <div className='container'>
      <h1 style={{ marginLeft: 10 }}>Air Quality By Location</h1>
      <form style={{ marginLeft: 10 }} onSubmit={e => handleClick(e)}>
        <label htmlFor='limit' style={{ marginRight: 10 }}>Limit Results:</label>
        <select onChange={({ target }) => setLimit(target.value)} id='limit' style={{ marginRight: 10 }}>
          <option value=''> Limit </option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </select>
        <label htmlFor='entity' style={{ marginRight: 10 }}> Data Source</label>
        <select onChange={({ target }) => setSource(target.value)} id='entity' style={{ marginRight: 10 }}>
          <option value=''> Data Source </option>
          <option value='government'>government</option>
          <option value='community'>community</option>
          <option value='research'>research</option>
        </select>
        <button>Go</button>
      </form>
      { data
        ? (
          <ul className='results'>
            { data.map((location, i) => <Card cardData={location} key={i} setId={setIsViewing}/>) }
          </ul>
          )
        : null }
    </div>
  );
}

export default App;
