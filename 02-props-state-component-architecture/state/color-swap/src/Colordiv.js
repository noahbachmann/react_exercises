import React from 'react';
import './App.css';

function Colordiv(){
    
    const [color, setColor] = React.useState("#ffffff")
    const colorArray = ["#FF0000", " #FFA500", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF","#800080","#FFC0CB"]

    function SwapColor(){
        setColor(oldValue => {
            var newcolor;
            do{
                newcolor = colorArray[Math.floor(Math.random() * colorArray.length)]
            }
            while (newcolor === oldValue)
            return newcolor;
        })
    }

    return(
        <div className='color-div' style={{ backgroundColor: color }} onClick={SwapColor}>
    </div>)
}

export default Colordiv;