import React, { Component } from 'react';
const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Name</th>
				<th>Shell</th>
				<th>Base</th>
				<th>Mixin(s)</th>
				<th>Seasoning(s)</th>
				<th>Condiment(s)</th>
				<th>Remove</th>
			</tr>
		</thead>
	);
};

const TableBody = (props) => {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.name}</td>
				<td>{row.shell}</td>
				<td>{row.base.label}</td>
				<td>{row.mixins[0].label}</td>
				<td>{row.seasoning.label}</td>
				<td>{row.condiments[0].label}</td>
				<td>
					<button onClick={() => props.removeCharacter(index)}>Delete</button>
				</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
};

class Table extends Component {
	render() {
		const { characterData, removeCharacter } = this.props;
		return (
			<div>
				<h2>My Tacos</h2>
				<table>
					<TableHeader />
					<TableBody characterData={characterData} removeCharacter={removeCharacter} />
				</table>
			</div>
		);
	}
}

export default Table;
