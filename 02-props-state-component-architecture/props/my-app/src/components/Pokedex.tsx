import React from 'react';
import Pokecard from './Pokecard';
import '../App.css';
import Data from '../Data';

const pokearray = Data.map(data => <Pokecard key={data.id} {...data}/>);

function Pokedex(){
    return(
        <div className='pokedex'>
            {pokearray}
        </div>
    )
}

export default Pokedex;