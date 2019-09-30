import React, { Component } from 'react';
import Select from 'react-select';
class CustomTacoForm extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			name: '',
			shell: null,
			base: null,
			mixins: null,
			seasoning: null,
			condiments: null
		};

		this.state = this.initialState;
	}

	submitForm = () => {
		const { shell, base, mixins, seasoning, condiments } = this.state;
		if (shell && base && mixins && seasoning && condiments) {
			this.props.handleSubmit(this.state);
			this.setState(this.initialState);
		} else alert('Please select at least one option for each field');
	};

	handleChange = (event) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		const { name, shell, base, mixins, seasoning, condiments } = this.state;
		return (
			<form>
				{/* Name */}
				<label>Name</label>
				<input type="text" name="name" value={name} onChange={this.handleChange} />
				{/* Shell */}
				<label>Shell*</label>
				<Select
					value={shell}
					onChange={(shell) => {
						this.setState({ shell });
					}}
					options={this.props.data.shells}
				/>
				{/* Base */}
				<label>Base Layer*</label>
				<Select
					value={base}
					onChange={(base) => {
						this.setState({ base });
					}}
					options={this.props.data.baseLayers}
				/>
				{/* Mixin(s) */}
				<label>Mixins (1 - 2)*</label>
				<Select
					isMulti
					value={mixins}
					onChange={(mixins) => {
						if (!mixins || mixins.length < 3) this.setState({ mixins });
					}}
					options={this.props.data.mixins}
				/>
				{/* Seasoning(s) */}
				<label>Seasoning*</label>
				<Select
					value={seasoning}
					onChange={(seasoning) => {
						this.setState({ seasoning });
					}}
					options={this.props.data.seasonings}
				/>
				{/* Condiment(s) */}
				<label>Condiments (1 - 3)*</label>
				<Select
					isMulti
					value={condiments}
					onChange={(condiments) => {
						if (!condiments || condiments.length < 4) this.setState({ condiments });
					}}
					options={this.props.data.condiments}
				/>
				<br />
				{/* Submit Button */}
				<input type="button" value="Add Custom Taco" onClick={this.submitForm} />
			</form>
		);
	}
}

export default CustomTacoForm;
