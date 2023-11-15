import React from 'react';



function Pokecard(props: { name: string, type: string, image: string}){
    return(
        <div className='pokecard'>
            <h1 className='pokecard-title'>{props.name}</h1>
            <img src={props.image} width="80px"alt="forsen"/>
            <p className='pokecard-type'>Type: {props.type}</p>
        </div>
    )
}

export default Pokecard;