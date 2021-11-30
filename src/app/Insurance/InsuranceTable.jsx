import React from 'react';
import { graphql } from 'react-apollo';
import { Button } from 'reactstrap';

import { GET_INSURANCES_DATA } from './query';
import ReactTable from 'app/common/React-Table';

const columns = [
	{
		Header: 'id',
		accessor: 'id'
	},
	{
		Header: 'Referencia',
		accessor: 'ref'
	},
	{
		Header: 'Desde',
		accessor: 'from'
	},
	{
		Header: 'Hasta',
		accessor: 'to'
	},
	{
		Header: 'Periodo',
		accessor: 'term'
	},
	{
		Header: 'Cliente',
		accessor: 'client'
	},
	{
		Header: 'Persona',
		accessor: 'person'
	},
	{
		Header: 'Compañía',
		accessor: 'company'
	},
	{
		Header: 'Tipo',
		accessor: 'insurance_type'
	},
	{ Header: 'Comentario', accessor: 'comments' }
	// {
	// 	Header: 'Acciones',
	// 	accessor: 'actions',
	// 	sortable: false,
	// 	filterable: false
	// }
];

class InsuranceTable extends React.Component {
	parseData = data =>
		data.map(item => {
			return {
				id: item.id,
				ref: item.ref,
				from: item.from,
				to: item.to,
				term: item.term,
				client: item.client ? item.client.name : 'N/A',
				person: item.person.first_name + ', ' + item.person.last_name,
				company: item.company.name,
				insurance_type: item.insurance_type.name,
				comments: item.comment,
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

	render() {
		const {
			data: { loading, insurances }
		} = this.props;
		const rows = loading ? [] : this.parseData(insurances.insurances);
		return <ReactTable title='Listado de Seguros' columns={columns} data={rows} />;
	}
}

export default graphql(GET_INSURANCES_DATA)(InsuranceTable);
