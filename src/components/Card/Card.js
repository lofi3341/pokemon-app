import React from 'react';
import './Card.css';

const Card = ({ pokemon }) => {
    return (
    <div className='card'>
        <div className='card-img'>
            <img src={pokemon.sprites.front_default} alt='pokemon' />
        </div>
        <h3 className='pokemonName'>{pokemon.name}</h3>
        <div className='types'>
            <div>タイプ</div>
            {pokemon.types.map((type, i) => {
                return (
                    <div key={i} className='type'>
                        {type.type.name}
                    </div>
                );
            })}
        </div>
        <div className='info'>
            <div className='data data-weight'>
                <p className='title'>重さ：{pokemon.weight}</p>
            </div>
            <div className='data data-height'>
                <p className='title'>高さ：{pokemon.height}</p>
            </div>
            <div className='data data-ability'>
                <p className='title'>特性：{pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    </div>

    );
};

export default Card;