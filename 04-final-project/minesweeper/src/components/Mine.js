import React from 'react'
import '../App.css'

function Mine(props){

    return(
        <button className="minediv" onClick={props.HandleClick}>
            {props.clicked?"":"⭕"}
        </button>
    )
}
export default Mine;