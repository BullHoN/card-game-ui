function Card({ card }) {
  return (
    <div className="card">
      <span> {card.category} </span>
      <hr />
      <span>{card.value}</span>
    </div>
  );
}

export default Card;
