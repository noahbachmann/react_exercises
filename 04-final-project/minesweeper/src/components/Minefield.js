import Mine from "./Mine"
import React from 'react'
import '../App.css'

export default function Minefield() {

    const [size, setSize] = React.useState(10)
    const [difficulty, setDifficulty] = React.useState(1)
    const [mines, setMines] = React.useState([])

    function GenerateMines() {
        var newMines = []

        //generate the mine objects
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let newId = '1' + i + j;
                newMines.push({
                    id: newId,
                    row: i,
                    col: j,
                    clicked: false,
                    bomb: false,
                    count: 0
                })
            }
        }

        //shuffle mine objects and make x amount bombs
        for (let i = newMines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newMines[i], newMines[j]] = [newMines[j], newMines[i]];
        }

        for (let i = 0; i < size*difficulty+1; i++) {
            newMines[i].bomb = true;
        }

        const minesWithCounts = newMines.map((mine) => ({
            ...mine,
            count: FindBombsAround(mine.id, newMines),
        }));

        setMines(minesWithCounts);
    }


    function HandleClick(mineId) {
        setMines((prevMines) => {
            var clickedMine = prevMines.find(mine => mine.id === mineId);
            var i = clickedMine.row;
            var j = clickedMine.col;
            const updatedMines = prevMines.map((min) =>
                min.id === mineId ? { ...min, clicked: true } : min
            );
            if(clickedMine.clicked === 0){
            }
            return updatedMines;

            // // Call FindBombsAround after handling mining process
            // const minesWithCounts = updatedMines.map((mine) => ({
            //     ...mine,
            //     count: FindBombsAround(mine.id, updatedMines),
            // }));

            // return minesWithCounts;
        });
    }



    function FindBombsAround(mineId, mines) {
        //function to give each mine the number of bombs around them if they are not a bomb
        var clickedMine = mines.find((mine) => mine.id === mineId)
        if (!clickedMine) {
            console.error(`Mine with id ${mineId} not found`);
            // You might want to throw an error or return a default value based on your logic
        }
        var count = 0;
        var i = clickedMine.row;
        var j = clickedMine.col;
        if (!clickedMine.bomb) {
            let currentMine;            
            currentMine = mines.find((mine) => mine.row === i - 1 && mine.col === j - 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i - 1 && mine.col === j)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i - 1 && mine.col === j + 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i && mine.col === j - 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i + 1 && mine.col === j - 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i && mine.col === j + 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i + 1 && mine.col === j)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }
            currentMine = mines.find((mine) => mine.row === i + 1 && mine.col === j + 1)
            if (currentMine != null && currentMine.bomb) {
                count++;
            }

        } else if (clickedMine.bomb) {
            count = 9;
        }
        return count;

    }
    //handle the onClick function for the mines


    // function HandleMining(mineId) {

    //     //get the mine you clicked
    //     const mine = mines.find((mine) => mine.id === mineId);

    //     var currentMine;
    //     var i = mine.row;
    //     var j = mine.col;


    // }

    //cycle through the mines
    // do {
    //     i += 1
    //     j = mine.col
    //     currentMine = mines.find((mine) => mine.row === i && mine.col === j)
    //     while (!currentMine.bomb) {
    //         //changing nonbombs to clicked in state until bomb 
    //         setMines(oldValue =>
    //             oldValue.map(min =>
    //                 min.id === mineId ? { ...min, clicked: true } : min
    //             )
    //         )
    //         j += 1
    //         currentMine = mines.find((mine) => mine.row === i && mine.col === j)
    //     }
    // } while (!currentMine.bomb)


    return (
        <div className="minediv">
            <button onClick={GenerateMines}>Generate Game</button>
            <div className="minefield">
                {mines.map((mine) => (
                    <Mine key={mine.id} HandleClick={() => HandleClick(mine.id)} {...mine} />
                ))}
            </div>
        </div>
    )
}