const Card = ({ cardData }) => {
  const { location, city, firstUpdated, lastUpdated, count, parameters, sourceName } = cardData;

  const formatDate = dateString => {
    const formatted = dateString.split('T')[0];
    const replaced = formatted.replaceAll('-', '/');
    return replaced;
  };

  const formatParameters = params => {
    const results = params.join(', ');
    return results;
  };
  return (
       <li className='card'>
        <h2 style={{ fontSize: 26 }}>{location}</h2>
        <div>in <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 5 }}>{city}</span></div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Collection Dates</td>
                <td style={{ paddingLeft: 15 }}>{formatDate(firstUpdated)} - {formatDate(lastUpdated)}</td>
              </tr>
              <tr>
                <td>Measurements</td>
                <td style={{ paddingLeft: 15 }}>{count}</td>
              </tr>
              <tr>
                <td>Parameters</td>
                <td style={{ paddingLeft: 15 }}>{formatParameters(parameters)}</td>
              </tr>
              <tr>
                <td>Source</td>
                <td style={{ paddingLeft: 15 }}>{sourceName}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className='btn-details'>View Details</button>
          </div>
        </div>
    </li>
  );
};

export default Card;
