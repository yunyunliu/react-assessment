const Card = ({ cardData, setId, formatDate }) => {
  const { name, firstUpdated, lastUpdated, measurements, parameters, sources, id, entity, sensorType } = cardData;

  const formatParameters = params => {
    const displayNames = params.map(param => param.displayName);
    const paramList = displayNames.join(', ');
    return paramList;
  };

  const sourceInfo = sources[0];


  return (
    <li className='card'>
      {/* {console.log(cardData)} */}
      <h2 style={{ fontSize: 26 }}>{name}</h2>
      <div><span className="label">{entity}</span><span className="label">{sensorType}</span></div>
      <table>
        <tbody>
          <tr>
            <td>Collection Dates</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10 }}>{formatDate(firstUpdated)} - {formatDate(lastUpdated)}</td>
          </tr>
          <tr>
            <td>Measurements</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{measurements}</td>
          </tr>
          <tr>
            <td>Parameters</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{formatParameters(parameters)}</td>
          </tr>
          <tr>
            <td>Source</td>
            <td style={{ paddingLeft: 15, paddingBottom: 10  }}>{<a href={sourceInfo.url}>{sourceInfo.name}</a>}</td>
          </tr>
        </tbody>
      </table>
      <div className='button-container'>
        <button className='btn-details' onClick={() => setId(id)}>View Details</button>
      </div>
    </li>
  );
};

export default Card;
