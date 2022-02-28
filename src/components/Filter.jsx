const Filter = ({ handleClick, setData, setLimit, setSource, source, limit }) => (
    <>
     <h1 style={{ marginLeft: 10 }}>Air Quality By Location</h1>
      <form style={{ marginLeft: 10 }} onSubmit={e => handleClick(e)}>
        <label htmlFor='limit' style={{ marginRight: 10 }}>Limit Results:</label>
        <select onChange={({ target }) => setLimit(target.value)} id='limit' style={{ marginRight: 10 }} value={limit}>
          <option value=''> Limit </option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='50'>50</option>
        </select>
        <label htmlFor='entity' style={{ marginRight: 10 }}> Source Type</label>
        <select onChange={({ target }) => setSource(target.value)} id='entity' style={{ marginRight: 10 }} value={source}>
          <option value=''> Type </option>
          <option value='government'>government</option>
          <option value='community'>community</option>
          <option value='research'>research</option>
        </select>
        <button>Go</button>
      </form>
    </>
  );

export default Filter;
