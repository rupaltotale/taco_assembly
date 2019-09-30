import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';
class RandomTacoForm extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			name: '',
			numMixins: { label: 1, value: 1 },
			numCondiments: { label: 1, value: 1 }
		};

		this.state = this.initialState;
	}

	submitForm = () => {
		const { numCondiments, numMixins } = this.state;
		const myTaco = {
			name: '',
			shell: _.sample(this.props.data.shells),
			base: _.sample(this.props.data.baseLayers),
			mixins: _.sampleSize(this.props.data.mixins, numMixins.label),
			seasoning: _.sample(this.props.data.seasonings),
			condiments: _.sampleSize(this.props.data.condiments, numCondiments.label)
		};
		this.props.handleSubmit(myTaco);
		this.setState(this.initialState);
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		const { name, numMixins, numCondiments } = this.state;
		return (
			<form>
				{/* Name */}
				<label>Name</label>
				<input type="text" name="name" value={name} onChange={this.handleChange} />
				{/* Mixin(s) */}
				<label>Number of Mixins</label>
				<Select
					value={numMixins}
					onChange={(numMixins) => {
						this.setState({ numMixins });
					}}
					options={[ { label: 1, value: 1 }, { label: 2, value: 2 } ]}
				/>
				{/* Condiment(s) */}
				<label>Number of Condiments</label>
				<Select
					value={numCondiments}
					onChange={(numCondiments) => {
						this.setState({ numCondiments });
					}}
					options={[ { label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 } ]}
				/>
				<br />
				{/* Submit Button */}
				<input type="button" value="Generate and Add Random Taco" onClick={this.submitForm} />
			</form>
		);
	}
}

export default RandomTacoForm;
