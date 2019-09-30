import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
	constructor(props) {
		super(props);

		this.data = {
			shells: [],
			baseLayers: [],
			mixins: [],
			condiments: [],
			seasonings: []
		};
	}
	state = {
		characters: []
	};

	populateData = (item) => {
		const url = 'https://ct-tacoapi.azurewebsites.net/' + item;
		fetch(url).then((result) => result.json()).then((result) => {
			var i = 0;
			for (i = 0; i < result.length; i++) {
				this.data[item].push({
					value: result[i].slug,
					label: result[i].name
				});
			}
			console.log(this.data);
		});
	};
	componentDidMount() {
		const ingredients = [ 'shells', 'baseLayers', 'mixins', 'condiments', 'seasonings' ];
		ingredients.forEach((item) => this.populateData(item));
	}
	removeCharacter = (index) => {
		const { characters } = this.state;

		this.setState({
			characters: characters.filter((character, i) => {
				return i !== index;
			})
		});
	};

	handleSubmit = (character) => {
		this.setState({ characters: [ ...this.state.characters, character ] });
	};

	render() {
		const { characters } = this.state;

		return (
			<div className="container">
				<h2>Make a Taco</h2>
				<Form handleSubmit={this.handleSubmit} data={this.data} />
				<Table characterData={characters} removeCharacter={this.removeCharacter} />
			</div>
		);
	}
}

export default App;