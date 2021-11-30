import React from 'react';
import { graphql } from 'react-apollo';

// reactstrap components
import { Button } from 'reactstrap';

import ReactTable from 'app/common/React-Table';
import { GET_CLIENTS_DATA } from './query';

const columns = [
	{
		Header: 'Id',
		accessor: 'id'
	},
	{
		Header: 'Documento',
		accessor: 'document'
	},
	{
		Header: 'Nombre',
		accessor: 'name'
	},
	{
		Header: 'Tipo',
		accessor: 'type'
	},
	{
		Header: 'Ciudad',
		accessor: 'city'
	},
	{
		Header: 'Provincia',
		accessor: 'province'
	},
	{
		Header: 'Estado',
		accessor: 'status'
	},
	{
		Header: 'Persona',
		accessor: 'person'
	}
	// {
	// 	Header: 'Acciones',
	// 	accessor: 'actions',
	// 	sortable: false,
	// 	filterable: false
	// }
];

class ClientTable extends React.Component {
	state = {
		people: [],
		fetched: false
	};

	parseData = data =>
		data.map(item => {
			return {
				id: item.id,
				document: item.document,
				name: item.name,
				type: item.type,
				city: item.city,
				province: item.province,
				status: item.status ? 'Activo' : 'Inactivo',
				person: this.state.people[item.personId],
				actions: (
					// we've added some custom button actions
					<div className='actions-right'>
						{/* use this button to add a like kind of action */}
						<Button
							onClick={() => {
								;
							}}
							color='info'
							size='sm'
							className='btn-icon btn-link like'
						>
							<i className='fa fa-heart' />
						</Button>{' '}
						{/* use this button to add a edit kind of action */}
						<Button
							onClick={() => {
								;
							}}
							color='warning'
							size='sm'
							className='btn-icon btn-link edit'
						>
							<i className='fa fa-edit' />
						</Button>{' '}
						{/* use this button to remove the data row */}
						<Button
							onClick={() => {
								;
							}}
							color='danger'
							size='sm'
							className='btn-icon btn-link remove'
						>
							<i className='fa fa-times' />
						</Button>{' '}
					</div>
				)
			};
		});

	parsePerson = people => {
		const parsedPeople = {};
		people.forEach(person => {
			const { id, last_name, first_name } = person;
			parsedPeople[id] = `${last_name}, ${first_name}`;
		});
		this.setState({ people: parsedPeople, fetched: true });
	};

	componentWillUpdate(nextProps) {
		if (!this.state.fetched && nextProps.data && nextProps.data.people.people.length)
			this.parsePerson(nextProps.data.people.people);
	}

	render() {
		const {
			data: { loading, clients }
		} = this.props;
		const rows = loading ? [] : this.parseData(clients.clients);
		return <ReactTable title='Listado de Clientes' columns={columns} data={rows} />;
	}
}

export default graphql(GET_CLIENTS_DATA)(ClientTable);
