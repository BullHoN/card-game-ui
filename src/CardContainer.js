import Card from "./card";

function CardContainer({ cards }) {
  return (
    <div className="card-container">
      {cards.map((card) => {
        return (
          <Card card={card} key={card.category + card.type + card.value}></Card>
        );
      })}
    </div>
  );
}

export default CardContainer;
