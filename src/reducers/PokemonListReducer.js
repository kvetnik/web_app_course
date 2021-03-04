const InitialState = {
	loading: true,
	data: [],
	errorMsg: "",
	count: 0,
};

const PokemonListReducer = (state = InitialState, action) => {
	switch (action.type) {
		case "POKEMON_LIST_LOADING":
			return {
				...state,
				loading: true,
				errorMsg: ""
			};
		case "POKEMON_LIST_FAIL":
			return {
				...state,
				loading: false,
				errorMsg: "unable to get pokemon"
			};
		case "POKEMON_LIST_SUCCESS":
			return {
				...state,
				loading: false,
				data: action.payload.results,
				errorMsg: "",
				count: action.payload.count
			};

		case "POKEMON_ALL_SUCCESS":
			return {
				...state,
				data: action.payload,
				loading: false,
				errorMsg: "",
				count: state.count + action.payload.length

			};

		default:
			return state;
	}
};

export default PokemonListReducer;
