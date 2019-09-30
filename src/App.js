import React, { Component } from 'react';
import Table from './Table';
import CustomTacoForm from './CustomTacoForm';
import RandomTacoForm from './RandomTacoForm';
import { Tab, Tabs, Navbar, Alert } from 'react-bootstrap';

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
		tacos: []
	};

	populateData = (item) => {
		const url = 'https://ct-tacoapi.azurewebsites.net/' + item;
		fetch(url).then((result) => result.json()).then((result) => {
			for (var i = 0; i < result.length; i++) {
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

	removeTaco = (index) => {
		const { tacos } = this.state;

		this.setState({
			tacos: tacos.filter((taco, i) => {
				return i !== index;
			})
		});
	};

	handleSubmit = (taco) => {
		this.setState({ tacos: [ ...this.state.tacos, taco ] });
	};

	// If there are no tacos created or all created tacos have been deleted, inform the user about this
	renderNoEntries() {
		if (this.state.tacos.length) {
			return null;
		}
		return <Alert variant={'secondary'}>No tacos to show. Create a delicious one above!</Alert>;
	}

	render() {
		const { tacos } = this.state;

		return (
			<div>
				{/* Navbar */}
				<Navbar bg="dark" variant="dark" sticky="top">
					<Navbar.Brand href="#home">
						<img alt="" src="/logo.png" width="50" height="50" className="d-inline-block" />
						{' TACO ASSEMBLY!'}
					</Navbar.Brand>
				</Navbar>
				<div className="container">
					{/* Taco creation tabs */}
					<h2>Make a Taco</h2>
					<Tabs defaultActiveKey="custom" id="uncontrolled-tab-example">
						<Tab eventKey="custom" title="Make a Custom Taco">
							<CustomTacoForm handleSubmit={this.handleSubmit} data={this.data} />
						</Tab>
						<Tab eventKey="random" title="Generate a Random Taco">
							<RandomTacoForm handleSubmit={this.handleSubmit} data={this.data} />
						</Tab>
					</Tabs>
					<hr />
					{/* Created Tacos Table */}
					<Table tacoData={tacos} removeTaco={this.removeTaco} />
					{this.renderNoEntries()}
				</div>
			</div>
		);
	}
}

export default App;
