import Mine from "./Mine"
import React from 'react'
import '../App.css'

export default function Minefield() {

    const [size, setSize] = React.useState(10)
    const [mines, setMines] = React.useState([])
    const randomId = React.useId()

    function GenerateMines() {
        const newMines = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newMines.push({ id: randomId+i+j,row: i, col: j, clicked: false, bomb: false })
            }
        }

        for (let i = newMines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newMines[i], newMines[j]] = [newMines[j], newMines[i]];
        }

        for (let i = 0; i < 20; i++) {
            newMines[i].bomb = true;
        }

        setMines(newMines)
    }

    function HandleClick(mineId){
        setMines(oldValue =>
            oldValue.map(mine => 
                mine.id === mineId? {...mine, clicked: !mine.clicked}: mine
                )
        )
    }

    return (
        <div className="minediv">
            <button onClick={GenerateMines}>Generate Game</button>
            <div className="minefield">
            {mines.map((mine, index) => (
                <Mine key={index} HandleClick={() => HandleClick(mine.id)} {...mine}/>
            ))}
            </div>
        </div>
    )
}