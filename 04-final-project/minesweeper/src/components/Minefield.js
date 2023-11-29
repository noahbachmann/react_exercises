import Mine from "./Mine"
import React from 'react'
import '../App.css'

export default function Minefield() {

    //const [size, setSize] = React.useState(10);
    const [difficulty, setDifficulty] = React.useState(1);
    const [mines, setMines] = React.useState([]);

    React.useEffect(() => {
        if (!mines.find(mine => !mine.clicked && !mine.bomb) && mines.length !== 0) {
            WinAlert("win");
        } else if (mines.find(mine => mine.clicked && mine.bomb)) {
            WinAlert("lose");
        }
    }, [mines])


    function GenerateMines() {
        var newMines = []
        //generate the mine objects
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let newId = '1' + i + j;
                newMines.push({
                    id: newId,
                    row: i,
                    col: j,
                    clicked: false,
                    rightclicked: false,
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

        for (let i = 0; i < difficulty * 5 + 8; i++) {
            newMines[i].bomb = true;
        }

        const minesWithCounts = newMines.map((mine) => ({
            ...mine,
            count: FindBombsAround(mine.id, newMines),
        }));

        setMines(minesWithCounts);
    }


    //change difficulty
    function HandleDifficulty(event) {
        const selectedValue = event.target.value

        setDifficulty(parseInt(selectedValue));
        console.log(selectedValue);
    }


    //handle rightclick
    function HandleRightClick(e, mineId) {
        e.preventDefault();

        setMines(prevMines => {
            return prevMines.map(mine => {
                if (mine.id === mineId) {
                    return {
                        ...mine,
                        rightclicked: true
                    }
                } else return mine;
            })
        })
    }

    //handle onClick of mine    
    function HandleClick(mineId) {
        setMines((prevMines) => {
            var clickedMine = prevMines.find(mine => mine.id === mineId);
            var updatedMines = prevMines.map((min) =>
                min.id === mineId ? { ...min, clicked: true, rightclicked: false, touched: true } : min
            );
            if (clickedMine.bomb) {
                return updatedMines;
            }
            //if mine has no bombs around, start loop to clear bombs around
            if (clickedMine.count === 0) {
                updatedMines = ClickAround(mineId, updatedMines)
            }
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
                    clicked: true,
                    rightclicked: false
                }
            } else if (min.id === mine.id) {
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

        var clickedMine = mines.find((mine) => mine.id === mineId)
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

    function WinAlert(status) {
        if (status === "lose") {
            const result = window.confirm('You blew up...');
            if (result) {
                window.location.reload();
            }
        } else if (status === "win") {
            const result = window.confirm('You win!');
            if (result) {
                window.location.reload();
            }
        }
    }

    return (
        <div className="minediv">
            <div className="buttondiv">
                <button onClick={GenerateMines}>Generate Game</button>
                <select className="difficultyselect" onChange={HandleDifficulty} placeholder="choose difficulty">
                    <option value="1">easy</option>
                    <option value="2">medium</option>
                    <option value="3">hard</option>
                </select>
            </div>
            <div className="minefield">
                {mines.map((mine) => (
                    <Mine key={mine.id} HandleClick={() => HandleClick(mine.id)} HandleRightClick={(e) => HandleRightClick(e, mine.id)}{...mine} />
                ))}
            </div>
        </div>
    )
}