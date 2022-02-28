const Card = ({ cardData, setId, formatDate }) => {
  const { location, city, firstUpdated, lastUpdated, count, parameters, sourceName, id, sourceType } = cardData;

  const formatParameters = params => {
    const results = params.join(', ');
    return results;
  };

  return (
    <li className='card'>
      <h2 style={{ fontSize: 26 }}>{location}</h2>
      <div>in <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 5 }}>{city}</span></div>
      <div style={{ marginTop: 15 }}>{sourceType.toUpperCase()}</div>
      <table>
        <tbody>
          <tr>
            <td>Collection Dates</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10 }}>{formatDate(firstUpdated)} - {formatDate(lastUpdated)}</td>
          </tr>
          <tr>
            <td>Measurements</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{count}</td>
          </tr>
          <tr>
            <td>Parameters</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{formatParameters(parameters)}</td>
          </tr>
          <tr>
            <td>Source</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{sourceName}</td>
          </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button onClick={() => setId(id)}>View Details</button>
      </div>
    </li>
  );
};

export default Card;
