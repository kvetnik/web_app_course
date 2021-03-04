import {CardDeck, Container,Button} from "react-bootstrap";
import {PokemonCard} from "../molecules/PokemonCard";
import {LoadIcon} from "../atoms/LoadIcon";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { GetAllPokemon } from "../../actions/pokemonActions";

let pokeStartId = 1;

export function PokemonList() {
	const [startId, setStartId] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const pokemonList = useSelector(state => state.PokemonList);
	const [count, setCount] = useState(pokemonList.count);
	const dispatch = useDispatch();
	useEffect(() => dispatch(GetAllPokemon(startId)), [startId]);
	const nextPage = () => {
		if (pokeStartId <= 751) {
			setCount(pokemonList.count)
			pokeStartId += count;
			setStartId(pokeStartId);
			setIsLoading(false);
		} else {
			setStartId(1);
			setIsLoading(false);
		}
	};
	return (
			<Container className="container-fluid p-0 text-center">
				<CardDeck className='d-flex justify-content-center mb-5 mt-5'>
					{pokemonList.data.map((pokemon, index) => (
						<h5 key={pokemon.id}>
							<PokemonCard pokemon={pokemon} index={index + 1} />
						</h5>
					))}
				</CardDeck>
				<div style={ {textAlign: 'center'}}>
					<Button onClick={nextPage} variant="primary" size="lg" >
						Load More
					</Button>
				</div>

			</Container>
	);
}
