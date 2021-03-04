import axios from "axios";

export const GetPokemon = pokemon => async dispatch => {
	try {
		dispatch({
			type: "POKEMON_MULTIPLE_LOADING"
		});

		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${pokemon}`
		);

		dispatch({
			type: "POKEMON_MULTIPLE_SUCCESS",
			payload: res.data,
			pokemonName: pokemon
		});
	} catch (e) {
		dispatch({
			type: "POKEMON_MULTIPLE_FAIL"
		});
	}
};

export const GetAllPokemon = startId => async dispatch => {
	try {
		dispatch({
			type: "POKEMON_LIST_LOADING"
		});
		
		let poke = [];
		const getData = async () => {
			for (let i = startId; i <= startId + 14; i++) {
				let result = await axios(` https://pokeapi.co/api/v2/pokemon/${i}`);
				poke.push(result.data);
			}
		};

		await getData();

		dispatch({
			type: "POKEMON_ALL_SUCCESS",
			payload: poke
		});
	} catch (error) {
		dispatch({
			type: "POKEMON_MULTIPLE_FAIL"
		});
	}
};
