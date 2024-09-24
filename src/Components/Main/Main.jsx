import { useEffect, useState } from "react";
import Die from "../Die/Die";
import "./Main.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"

export default function Main() {
  const [dice, setDice] = useState(getAllNewDice());
  const [tenzies,setTenzies]= useState(false);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }
  function getAllNewDice() {
    const NewDice = [];
    for (let i = 0; i < 10; i++) {
      NewDice.push(generateDie());
    }
    return NewDice;
  }
  function holdeDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const DiceElaments = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        holdeDice(die.id);
      }}
    />
  ));
  function roll() {
    if(!tenzies){
        setDice((oldDice) =>
            oldDice.map((die) => {
              return die.isHeld ? die : generateDie();
            })
          );
    }else{
        setTenzies(false)
        setDice(getAllNewDice())
    }
  }
  useEffect(()=>{
     const allHeld = dice.every(die=> die.isHeld );
     const fristValue = dice[0].value;
     const allSameValue = dice.every(die=>(die.value===fristValue) );
     if(allHeld && allSameValue){
        setTenzies(true);
      
        
     };
   


  },[dice])

  return (
    <>
  
      <main className="main">
         { tenzies&&<Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{DiceElaments}</div>
        <button
          onClick={() => {
            roll();
          }}
          className="roll-btn"
        >
           {tenzies? "New Game" :"Roll"}
        </button>
      </main>
    </>
  );
}
