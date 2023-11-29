import React from 'react'
import '../App.css'

function Mine({ col, row, clicked, touched, rightclicked, count, HandleClick, HandleRightClick, bomb }) {
    return (
      <button
        className="minebutton"
        style={{
          gridColumn: col + 1,
          gridRow: row + 1,
          display: 'grid',
          placeItems: 'center',
        }}
        onClick={HandleClick}
        onContextMenu={HandleRightClick}
      >
        {!clicked ? rightclicked? '❌' : '' : bomb ? '💥' : count}
      </button>
    );
  }
  
  export default Mine;