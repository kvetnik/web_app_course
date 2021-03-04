import React from "react";


export function PokemonImage(props) {

    return(
        <img alt={props.name} src={props.src} width={props.width}/>
    )
}

