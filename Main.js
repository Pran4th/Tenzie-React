import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function Main() {
    const [dice, setDice] = useState([]);

    useEffect(() => {
        const newDice = allNewDice();
        setDice(newDice);
    }, []);

    function allNewDice() {
        const newArray = [];
        for (let i = 0; i < 10; i++) {
            const isSelected = dice.find(d => d.isSelected && d.index === i);
            newArray.push({
                value: isSelected ? dice[i].value : Math.ceil(Math.random() * 6),
                id: nanoid(),
                index: i,
                isSelected: isSelected || false
            });
        }
        return newArray;
    }

    function handleRoll() {
        const newDice = allNewDice();
        setDice(newDice);
    }

    function select(index) {
        setDice(prevDice => {
            return prevDice.map(die => {
                if (die.index === index) {
                    return {
                        ...die,
                        isSelected: !die.isSelected
                    };
                }
                return die;
            });
        });
    }

    useEffect(() => {
        if (isAllDiceSameValue() && dice.every(die => die.isSelected)) {
            alert("All dice with the same value have been selected");
        }
    }, [dice]);

    function isAllDiceSameValue() {
        if (dice.length === 0) return false;
        const firstValue = dice[0].value;
        return dice.every(die => die.value === firstValue);
    }

    return (
        <div className="Box">
            <h1 className="logo">Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to <br /> freeze it at its current value between rolls.</p>
            <div className="boxes">
                {dice.map((die) => (
                    <label
                        key={die.id}
                        className={`numb ${die.isSelected ? 'selected' : ''}`}
                        onClick={() => select(die.index)}
                        style={{ backgroundColor: die.isSelected ? "#83f28f" : "" }}
                    >
                        {die.value}
                    </label>
                ))}
            </div>
            <button className="submit" onClick={handleRoll}>Roll</button>
        </div>
    );
}
