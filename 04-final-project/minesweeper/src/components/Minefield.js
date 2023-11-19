import Mine from "./Mine"
import React from 'react'
import '../App.css'

export default function Minefield() {

    const [size, setSize] = React.useState(5)
    const [mines, setMines] = React.useState([])
    const randomId = React.useId()

    function GenerateMines() {
        const newMines = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newMines.push({ id: randomId+i+j,row: i, col: j, clicked: false, bomb: false })
            }
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
        <div>
            <button onClick={GenerateMines}>Generate Game</button>
            {mines.map((mine, index) => (
                <Mine key={index} HandleClick={() => HandleClick(mine.id)} {...mine}/>
            ))}
        </div>
    )
}