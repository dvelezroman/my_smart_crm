import React from 'react';
import { graphql } from 'react-apollo';
import { Button } from 'reactstrap';

// reactstrap components
import { GET_PEOPLE_DATA } from './query';
import ReactTable from 'app/common/React-Table';

const columns = [
	{
		Header: 'id',
		accessor: 'id'
	},
	{
		Header: 'Documento',
		accessor: 'document'
	},
	{
		Header: 'Nombres',
		accessor: 'first_name'
	},
	{
		Header: 'Apellidos',
		accessor: 'last_name'
	},
	{
		Header: 'correo electrónico',
		accessor: 'email'
	},
	{
		Header: 'Provincia',
		accessor: 'province'
	},
	{
		Header: 'Ciudad',
		accessor: 'city'
	},
	{
		Header: 'Dirección',
		accessor: 'address'
	},
	{
		Header: 'Contacto',
		accessor: 'contact'
	},
	{
		Header: 'Cumpleaños',
		accessor: 'birthday'
	},
	{
		Header: 'Acciones',
		accessor: 'actions',
		sortable: false,
		filterable: false
	}
];

class PeopleTable extends React.Component {
	parseData = data =>
		data.map(item => ({
			id: (
				<div className='fields-id' style={{ fontSize: 10 }}>
					{item.id}
				</div>
			),
			document: item.document,
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			province: item.province,
			city: item.city,
			address: item.address,
			contact: item.contact,
			birthday: item.birthday,
			actions: (
				// we've added some custom button actions
				<div className='actions-right'>
					{/* use this button to add a like kind of action */}
					{/* <Button
						onClick={() => {
							console.log('Verga');
						}}
						color='info'
						size='sm'
						className='btn-icon btn-link like'
					>
						<i className='fa fa-heart' />
					</Button>{' '} */}
					{/* use this button to add a edit kind of action */}
					{/* <Button
						onClick={() => {
							console.log('Verga');
						}}
						color='warning'
						size='sm'
						className='btn-icon btn-link edit'
					>
						<i className='fa fa-edit' />
					</Button>{' '} */}
					{/* use this button to remove the data row */}
					<Button
						onClick={() => {
							console.log('Verga');
						}}
						color='danger'
						size='sm'
						className='btn-icon btn-link remove'
					>
						<i className='fa fa-times' />
					</Button>{' '}
				</div>
			)
		}));

	render() {
		const {
			data: { loading, people }
		} = this.props;
		const rows = loading ? [] : this.parseData(people.people);
		return <ReactTable title='Personas' columns={columns} data={rows} />;
	}
}

export default graphql(GET_PEOPLE_DATA)(PeopleTable);
