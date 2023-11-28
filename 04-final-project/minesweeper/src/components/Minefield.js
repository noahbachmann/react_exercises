import Mine from "./Mine"
import React from 'react'
import '../App.css'

export default function Minefield() {

    const [size, setSize] = React.useState(10);
    const [difficulty, setDifficulty] = React.useState(1);
    const [mines, setMines] = React.useState([]);
    const [win, setWin] = React.useState("start");

    React.useEffect(() => {
        if(!mines.find(mine => !mine.clicked && !mine.bomb) && mines.length !== 0){
            setWin("win");
        }
    }, [mines])

    function GenerateMines() {
        var newMines = []
        setWin("start");
        //generate the mine objects
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let newId = '1' + i + j;
                newMines.push({
                    id: newId,
                    row: i,
                    col: j,
                    clicked: false,
                    touched: false,
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

        for (let i = 0; i < size * difficulty + 1; i++) {
            newMines[i].bomb = true;
        }

        const minesWithCounts = newMines.map((mine) => ({
            ...mine,
            count: FindBombsAround(mine.id, newMines),
        }));

        setMines(minesWithCounts);
    }


    //handle onClick of mine
    
    function HandleClick(mineId) {
        setMines((prevMines) => {
            var clickedMine = prevMines.find(mine => mine.id === mineId);
            var updatedMines = prevMines.map((min) =>
                min.id === mineId ? { ...min, clicked: true, touched:true } : min
            );
            if(clickedMine.bomb){
                setWin("lose");
                return updatedMines;
            }
        //if mine has no bombs around, start loop to clear bombs around
            if (clickedMine.count === 0) {                
                updatedMines = ClickAround(mineId, updatedMines)
            }
            console.log(clickedMine.id);
            return updatedMines;
        });
    }


    function ClickAround(mineId, previMines) {

        var mine = mines.find((mine) => mine.id === mineId);
        var i = mine.row;
        var j = mine.col;

        var id1 = mines.find((mine) => mine.row === i - 1 && mine.col === j - 1)?.id;
        var id2 = mines.find((mine) => mine.row === i - 1 && mine.col === j)?.id;
        var id3 = mines.find((mine) => mine.row === i - 1 && mine.col === j + 1)?.id;
        var id4 = mines.find((mine) => mine.row === i && mine.col === j - 1)?.id;
        var id5 = mines.find((mine) => mine.row === i + 1 && mine.col === j - 1)?.id;
        var id6 = mines.find((mine) => mine.row === i && mine.col === j + 1)?.id;
        var id7 = mines.find((mine) => mine.row === i + 1 && mine.col === j + 1)?.id;
        var id8 = mines.find((mine) => mine.row === i + 1 && mine.col === j)?.id;
        

        var idArray = [id2, id4, id6, id8];

        var updateMines = previMines.map((min) => {
            if (min.id === id1 || min.id === id2 || min.id === id3 || min.id === id4 || min.id === id5 || min.id === id6 || min.id === id7 || min.id === id8) {
                return {
                    ...min,
                    clicked: true
                }
            }else if(min.id === mine.id)
            {
                return {
                    ...min,
                    touched: true
                }
            } else {
                return min;
            }
        })

        //recursive loop to click all 0s around on 0 click
        // -> create function that doesnt loop back to old Mine to click on?

        idArray.forEach((item) => {
            var clickMine = updateMines.find((mine) => mine.id === item);

            if (clickMine?.id && clickMine.count === 0 && !clickMine.touched) {
                updateMines = ClickAround(clickMine.id, updateMines);
            } 
        })

        return updateMines;
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
            <p></p>
            <button onClick={GenerateMines}>Generate Game</button>
            <div className="minefield">
                {mines.map((mine) => (
                    <Mine key={mine.id} HandleClick={() => HandleClick(mine.id)} {...mine} />
                ))}
            </div>
            {win === "win" ? <p>You win!</p>: win === "lose" ? <p>You lose!</p> : null}
        </div>
    )
}