import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import {Link, Switch, Route} from 'react-router-dom';
import {Navbar, Nav} from "react-bootstrap";
import {PokemonList} from "./components/organisms/PokemonList";
import Pokemon from "./components/organisms/Pokemon";
import {Game} from "./components/organisms/Game";


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Navbar bg="light" expand="lg sm md xl">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">Pokemons</Nav.Link>
					<Nav.Link as={Link} to="/game">Game</Nav.Link>
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path="/" component={PokemonList}/>
				<Route exact path="/pokemon/:id" component={Pokemon}/>
				<Route exact path="/game" component={Game}/>
			</Switch>
		</BrowserRouter>
	</Provider>			,
	document.getElementById("root")
);
