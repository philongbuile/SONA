const CaseList = ({ cards }) => {
    return (
      <div className="case-list">
        {cards.map(card => (
          <div className="case-preview" key={card.id} >
            <h2>{card.title}</h2>
            <p >{card.testResult}</p>
            <p >{card.diagnosis}</p>
            <p >{card.treatment}</p>
          </div>
        ))}
      </div>
    );
}
   
export default CaseList;