import Card from './Card';

const Results = ({ data, formatDate, setViewing, title }) => (
  <>
    <div style={{ fontSize: 32, marginTop: 15 }}>{title}</div>
    <ul className='results'>
      { data.map((location, i) => <Card cardData={location} key={i} setId={setViewing} formatDate={formatDate}/>) }
    </ul>
  </>
);

export default Results;
