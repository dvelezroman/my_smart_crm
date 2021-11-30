import React from 'react';
import { graphql } from 'react-apollo';
import { Button } from 'reactstrap';

// reactstrap components
import { GET_COMPANIES_DATA } from './query';

import ReactTable from 'app/common/React-Table';

const columns = [
	{
		Header: 'Id',
		accessor: 'id'
	},
	{
		Header: 'Referencia',
		accessor: 'ref'
	},
	{
		Header: 'Nombre',
		accessor: 'name'
	}
	// {
	// 	Header: 'Acciones',
	// 	accessor: 'actions',
	// 	sortable: false,
	// 	filterable: false
	// }
];

class CompanyTable extends React.Component {
	parseData = data =>
		data.map(item => {
			return {
				id: item.id,
				ref: item.ref,
				name: item.name,
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
			data: { loading, companies }
		} = this.props;
		const rows = loading ? [] : this.parseData(companies.companies);
		return <ReactTable title='Listado de Compañías' columns={columns} data={rows} />;
	}
}

export default graphql(GET_COMPANIES_DATA)(CompanyTable);
