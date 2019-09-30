import React, { Component } from 'react';
import Table from './Table';
import CustomTacoForm from './CustomTacoForm';
import RandomTacoForm from './RandomTacoForm';
import { Tab, Tabs } from 'react-bootstrap';

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

	renderNoEntries() {
		if (this.state.characters.length) {
			return null;
		}
		return <p>No tacos to show. Create a delicious one above!</p>;
	}

	render() {
		const { characters } = this.state;

		return (
			<div className="container">
				<h2>Make a Taco</h2>
				<Tabs defaultActiveKey="custom" id="uncontrolled-tab-example">
					<Tab eventKey="custom" title="Make a Custom Taco">
						<CustomTacoForm handleSubmit={this.handleSubmit} data={this.data} />
					</Tab>
					<Tab eventKey="random" title="Generate a Random Taco">
						<RandomTacoForm handleSubmit={this.handleSubmit} data={this.data} />
					</Tab>
				</Tabs>
				<Table characterData={characters} removeCharacter={this.removeCharacter} />
				{this.renderNoEntries()}
			</div>
		);
	}
}

export default App;
