const Results = ({ resultData }) => {
  const card1 = resultData[0];
  const card2 = resultData[1];
  const card3 = resultData[2];

  const formatDate = dateString => {
    const formatted = dateString.split('T')[0];
    const replaced = formatted.replaceAll('-', '/');
    return replaced;
  };

  const formatParameters = params => {
    const results = params.join(', ');
    return results;
  };

  const getTotalMeasurements = counts => {
    let total = 0;
    for (let i = 0; i < counts.length; i++) {
      const measurement= counts[i];
      total += measurement.count;
    }
    return total;
  }
  return (
    <div className='flex results'>
      <article className='column-third card'>
        <h2 style={{ fontSize: 26, margin: 20 }}>{card1.location}</h2>
        <div style={{ margin: 20 }}>in <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 5 }}>{card1.city}</span></div>
        <div>
          <table style={{ margin: 20 }}>
            <tbody>
              <tr>
                <td>Collection Dates</td>
                <td style={{ paddingLeft: 15 }}>{formatDate(card1.firstUpdated)} - {formatDate(card1.lastUpdated)}</td>
              </tr>
              <tr>
                <td>Measurements</td>
                <td style={{ paddingLeft: 15 }}>{card1.count}</td>
              </tr>
              <tr>
                <td>Parameters</td>
                <td style={{ paddingLeft: 15 }}>{formatParameters(card1.parameters)}</td>
              </tr>
              <tr>
                <td>Source</td>
                <td style={{ paddingLeft: 15 }}>{card1.sourceName}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 20 }}>
            <button className='btn-details'>View Details</button>
          </div>
        </div>
      </article>
      <article className='column-third card'>
        <h2 style={{ fontSize: 26 }}>{card2.location}</h2>
        in <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 5 }}>{card2.city}</span>
      </article>
      <article className='column-third card'>
        <h2 style={{ fontSize: 26 }}>{card3.location}</h2>
        in <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 5 }}>{card3.city}</span>
      </article>
    </div>
  )
};

export default Results;
