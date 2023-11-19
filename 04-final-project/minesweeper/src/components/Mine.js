import React from 'react'
import '../App.css'

function Mine(props) {

    return (
            <button className="minebutton" 
            style={{
                gridColumn: props.col + 1,
                gridRow: props.row + 1
            }}
             onClick={props.HandleClick}>
                {!props.clicked ? "" : props.bomb? "💥":"⭕"}
            </button>
    )
}
export default Mine;