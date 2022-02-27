import { useState, useEffect } from 'react';

import Card from './Card';
import MeasurementsView from './MeasurementsView';
import Filter from './Filter';

function App() {
  const [source, setSource] = useState(null);
  const [limit, setLimit] = useState(null);
  const [data, setData] = useState(null);
  const [isViewing, setIsViewing] = useState(212);

  useEffect(() => {
    fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${50}`)
      .then(res => res.json())
      .then(data => {
        setData(data.results);
        // console.log(data.results);
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
    // const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${parseInt(limit) + 20}&entity=${source}`);
    const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${50}`);
    if (res.ok) {
      const data = await res.json();
      setData(data.results);
      // console.log(data.results);
    } else {
      console.log('request failed');
    }
  }

  const renderView = () => {
    if (data && isViewing) {
      // console.log(isViewing)
      const location = data.find(current => current.id === isViewing);
      return (
        <MeasurementsView data={location} formatDate={formatDate} setId={setIsViewing} />
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
