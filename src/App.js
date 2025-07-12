import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import CardContainer from "./CardContainer";

function createDefaultCards() {
  const categories = ["spade", "heart", "diamond", "club"];
  const suite = categories.reduce((curr, category) => {
    const acc = [];

    // face cards
    acc.push({
      category: category,
      type: "face",
      value: "king",
    });

    acc.push({
      category: category,
      type: "face",
      value: "queen",
    });

    acc.push({
      category: category,
      type: "face",
      value: "jack",
    });

    acc.push({
      category: category,
      type: "ace",
      value: "ace",
    });

    // number card
    for (let i = 2; i <= 10; i++) {
      acc.push({
        category: category,
        type: "number",
        value: i + "",
      });
    }
    return [...acc, ...curr];
  }, []);

  return suite;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [players, setPlayers] = useState([]);
  const [unassignedCards, setunassignedCards] = useState([]);
  const DEFAULT_DEAL_SIZE = 5;

  useEffect(() => {
    setCards(createDefaultCards());
    setPlayers([
      {
        id: "player1",
        cards: [],
      },
      {
        id: "player2",
        cards: [],
      },
    ]);
    setunassignedCards(createDefaultCards());
  }, []);

  const handleShuffle = () => {
    let newCards = [...unassignedCards];
    for (let i = 0; i < newCards.length; i++) {
      let j = Math.round(Math.random() * newCards.length) % newCards.length;
      const temp = newCards[i];
      newCards[i] = newCards[j];
      newCards[j] = temp;
    }
    setunassignedCards(newCards);
  };

  const handleDealHand = () => {
    const leftCards = unassignedCards.length;

    if (DEFAULT_DEAL_SIZE * players.length > leftCards) {
      alert("Not Enough Cards to shuffle");
      return; 
    }

    const updatedUnassignedCards = [...unassignedCards];

    const updatedPlayersDec = players.map((player) => {
      const newCards = [...player.cards];
      for (let i = 0; i < DEFAULT_DEAL_SIZE; i++) {
        newCards.push(updatedUnassignedCards.pop());
      }
      console.log(player.id, newCards);
      player.cards = newCards;
      return player;
    });

    setunassignedCards(updatedUnassignedCards);

    setPlayers(updatedPlayersDec);
  };

  return (
    <div className="App">
      <h1>All Cards</h1>
      <CardContainer cards={unassignedCards} />
      <div className="btn-group">
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleDealHand}>Deal Hand</button>
      </div>
      <div className="players-container">
        {players.map((player) => {
          return (
            <div key={player.id}>
              <p>{player.id} :</p>
              <CardContainer cards={player.cards} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
