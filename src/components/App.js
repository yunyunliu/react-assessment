import { useState, useEffect } from 'react';

import Card from './Card';
import MeasurementsView from './MeasurementsView';
import Filter from './Filter';

function App() {
  const [source, setSource] = useState(null);
  const [limit, setLimit] = useState(null);
  const [data, setData] = useState(null);
  const [isViewing, setIsViewing] = useState(null);

  useEffect(() => {
    fetch(`https://docs.openaq.org/v2/locations?country=US&limit=${50}`)
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

  const getTime = dateTime => {
    const time = dateTime.split('T')[1];
    return time.slice(0, time.length - 4);
  }

 const handleClick = async e => {
    e.preventDefault();
    // const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${parseInt(limit) + 20}&entity=${source}`);
    const res = await fetch(`https://docs.openaq.org/v2/locations?country=US&limit=${50}`);
    if (res.ok) {
      const data = await res.json();
      setData(data.results);
    } else {
      console.log('request failed');
    }
  }

  const renderView = () => {
    if (data && isViewing) {
      const location = data.find(current => current.id === isViewing);
      return (
        <MeasurementsView data={location} formatDate={formatDate} setId={setIsViewing} getTime={getTime}/>
      );
    }
    if (data) {
      return(
        <>
          <Filter handleClick={handleClick} setLimit={setLimit} setSource={setSource} />
          <ul className='results'>
            { data.map((location, i) => <Card cardData={location} key={i} setId={setIsViewing} formatDate={formatDate}/>) }
          </ul>
        </>
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
