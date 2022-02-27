import Card from './Card';

const Results = ({ resultData }) => {
  return (
    <ul className='results'>
      { resultData.map((data, i) => <Card cardData={data} key={i}/>) }
    </ul>
  )
};

export default Results;
