import { useState } from 'react';

function App() {
  const [source, setSource] = useState(null);
  const [limit, setLimit] = useState(null);

  const handleClick = async e => {
    e.preventDefault();
    const res = await fetch(`https://docs.openaq.org/v1/locations?country=US&limit=${parseInt(limit) + 20}&entity=${source}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data.results)
    } else {
      console.log('request failed')
    }
  }

  return (
    <div className="App">
      <h1>Air Quality By Location</h1>
      <form onSubmit={e => handleClick(e)}>
        <label htmlFor='limit'>Limit Results:</label>
        <select onChange={({ target }) => setLimit(target.value)} id='limit'>
          <option value=''> Limit </option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </select>
        <label htmlFor='entity'> Select Source Type</label>
        <select onChange={({ target }) => setSource(target.value)} id='entity'>
          <option value=''> Source Type </option>
          <option value='government'>government</option>
          <option value='community'>community</option>
          <option value='research'>research</option>
        </select>
        <button>Go</button>
      </form>


    </div>
  );
}

export default App;
