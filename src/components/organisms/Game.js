import React, {useRef, useState} from "react";
import {Button, Card, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../../actions/pokemonActions";
import _ from "lodash";


export const Game = () => {
    const [id , setid] = useState(randomInteger(1,700));
    const [isWin, setIsWin] = useState(false)
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");
    const pokemonState = useSelector(state => state.Pokemon);

    React.useEffect(() => {
        dispatch(GetPokemon(id));
    }, [id]);
    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    function submitClick(name){
        if(textInput === name) {setTextInput('') ;setIsWin(true)};
    }
    function anotherPokemon() {
        window.location.reload();
    }

    const ShowData = () => {

        if (!_.isEmpty(pokemonState.data[id])) {
            const pokeData = pokemonState.data[id];
            return (
                <div className="pokemon-wrapper">
                    <div className="item">
                        <img
                            src={
                                pokeData.sprites.other["official-artwork"].front_default
                            }
                            alt={id}
                        />
                        {console.log(pokeData.name)}
                        {!isWin &&
                        <input type="text" size="40" value={textInput} onChange={e => setTextInput(e.target.value)}/>}
                        {!isWin &&
                            <div>
                                {submitClick(pokeData.name)}
                            </div>
                        }

                        {isWin &&
                        <h2> You win! </h2>}

                    </div>
                    <Button onClick={anotherPokemon} variant="primary" size="lg" >
                        Another pokemon
                    </Button>
                </div>
            );
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>;
        }

        if (pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>;
        }

        return <p>error getting pokemon</p>;
    };
    return(
        <Card>
                <div style={{ textAlign: 'center'}}>
                    {ShowData()}
                </div>
        </Card>
)
}

