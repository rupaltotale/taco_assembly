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
	const displayItems = (items) => {
		if (items.length === 1) return items[0].label;
		let string = '';
		for (let i = 0; i < items.length - 1; i++) string += items[i].label + ', ';
		string += 'and ' + items[items.length - 1].label;
		return string;
	};
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.name === '' ? 'Taco #' + (index + 1) : row.name}</td>
				<td>{row.shell.label}</td>
				<td>{row.base.label}</td>
				<td>{displayItems(row.mixins)}</td>
				<td>{row.seasoning.label}</td>
				<td>{displayItems(row.condiments)}</td>
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
