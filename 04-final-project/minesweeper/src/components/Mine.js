import React from 'react'
import '../App.css'

function Mine({ col, row, clicked, touched, count, HandleClick, bomb }) {
    return (
      <button
        className="minebutton"
        style={{
          gridColumn: col + 1,
          gridRow: row + 1,
        }}
        onClick={HandleClick}
      >
        {!clicked ? '' : bomb ? '💥' : count}
      </button>
    );
  }
  
  export default Mine;