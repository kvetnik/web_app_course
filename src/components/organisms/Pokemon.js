import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../../actions/pokemonActions";
import _ from "lodash";
import Table from "react-bootstrap/Table";

const Pokemon = props => {
	const pokemonName = props.match.params.id;
	const dispatch = useDispatch();
	const pokemonState = useSelector(state => state.Pokemon);
	React.useEffect(() => {
		dispatch(GetPokemon(pokemonName));
	}, []);


	const ShowData = () => {
		if (!_.isEmpty(pokemonState.data[pokemonName])) {
			const pokeData = pokemonState.data[pokemonName];

			return (
				<div className="pokemon-wrapper">
					<h1 style={{ textAlign: 'center'}}>{pokeData.name}</h1>
					<div className="item" style={{ textAlign: 'center'}}>
						<img
							src={
								pokeData.sprites.other["official-artwork"].front_default
							}
							alt={pokemonName}
						/>
						<div style={{ textAlign: 'center'}}>
						<img src={pokeData.sprites.front_default} alt="" />
						<img src={pokeData.sprites.back_default} alt="" />
						<img src={pokeData.sprites.front_shiny} alt="" />
						<img src={pokeData.sprites.back_shiny} alt="" />
						</div>
						<h3>{pokeData.types[0].type.name}</h3>
					</div>
					<Table striped bordered hover variant="dark" className="item" >
						<tbody>
						{pokeData.stats.map(stat => {
							return (
								<tr>
									<th>{stat.stat.name}</th>
									<th> {stat.base_stat}</th>
								</tr>
							);
						})}

						</tbody>
					</Table>
					<div className="item">
						{pokeData.abilities.map(ability => {
							return (
								<p key={ability.ability.name}>
									{ability.ability.name} {ability.name}
								</p>
							);
						})}
					</div>
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
	return (
		<div className="poke">
			{ShowData()}
		</div>
	);
};

export default Pokemon;
