import { useState, useEffect } from 'react';

import Results from './Results';
import MeasurementsView from './MeasurementsView';
import Filter from './Filter';

function App() {
  const [source, setSource] = useState(null);
  const [limit, setLimit] = useState(null);
  const [data, setData] = useState(null);
  const [isViewing, setIsViewing] = useState(null);
  const [title, setTitle] = useState('Most Recent');

  useEffect(() => {
    fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${50}`)
      .then(res => res.json())
      .then(data => {
        setData(data.results);
        })
      .catch(err =>  console.log('request failed'))
  }, []);

  const formatDate = dateString => {
  const formatted = dateString.split('T')[0];
  const replaced = formatted.replaceAll('-', '/');
  return replaced;
};

 const handleClick = async e => {
    e.preventDefault();
    const endpoint = 'https://docs.openaq.org/v1/locations?country=US';
    let url;
    if (!limit && !source) return;
    if (limit && source) {
      url = endpoint + `&limit=${parseInt(limit)}&entity=${source}`;
    }
    if (limit) {
      url = endpoint + `&limit=${parseInt(limit)}`;
    } else {
      url = endpoint + `&entity=${source}`;
    }
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setData(data.results);
      setTitle('Results');
    } else {
      console.log('request failed');
    }
  }

  const renderView = () => {
    if (data && isViewing) {
      const location = data.find(current => current.id === isViewing);
      return (
        <MeasurementsView data={location} formatDate={formatDate} setId={setIsViewing} />
      );
    }
    if (data) {
      return (
        <>
          <Filter handleClick={handleClick} setLimit={setLimit} setSource={setSource} limit={limit} source={source} />
          <Results title={title} data={data} formatDate={formatDate} setViewing={setIsViewing}/>
        </>
      )
    } else {
      return (
        <h1>loading</h1>
      )
    }
  }

  return (
    <div className='container'>
      { renderView() }
    </div>
  );
}

export default App;
