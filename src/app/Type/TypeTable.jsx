import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { Button, Modal } from 'reactstrap';
// reactstrap components
import { GET_TYPES_DATA, DELETE_TYPE_MUTATION } from './query';
import ReactTable from 'app/common/React-Table';

const columns = [
	{
		Header: 'Id',
		accessor: 'id'
	},
	{
		Header: 'Código',
		accessor: 'code'
	},
	{
		Header: 'Nombre',
		accessor: 'name'
	},
	{
		Header: 'Acciones',
		accessor: 'actions',
		sortable: false,
		filterable: false
	}
];

class TypeTable extends React.Component {
	state = {
		showModal: false,
		typeId: 0
	};
	parseData = data =>
		data.map(item => ({
			id: item.id,
			code: item.code,
			name: item.name,
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
							// remove mutation
							this.onPressDelete(item.id);
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

	onPressDelete = id => {
		console.log({ id });
		this.setState({ showModal: true, typeId: id });
	};

	render() {
		const {
			data: { loading, types }
		} = this.props;
		const rows = loading ? [] : this.parseData(types.types);
		return (
			<>
				<ReactTable title='Tipos de Seguro' columns={columns} data={rows} />
				{/* small modal */}
				<Modal
					className='modal-sm'
					modalclassname='modal-primary'
					isOpen={this.state.showModal}
					// toggle={this.toggleModal}
				>
					<div className='modal-header justify-content-center'>
						<div className='modal-profile ml-auto mr-auto'>
							<i className='nc-icon nc-bulb-63' />
						</div>
					</div>
					<div className='modal-body'>
						<p>Se va a Eliminar un registro...!</p>
					</div>
					<div className='modal-footer'>
						<div className='left-side'>
							<Button
								color='link'
								type='button'
								onClick={() => {
									this.setState({ showModal: false });
								}}
							>
								Cancelar
							</Button>
						</div>
						<div className='divider' />
						<div className='right-side'>
							<Mutation
								mutation={DELETE_TYPE_MUTATION}
								variables={{
									id: this.state.typeId
								}}
								refetchQueries={() => {
									return [
										{
											query: GET_TYPES_DATA
										}
									];
								}}
							>
								{(deleteType, { loading }) => (
									<Button
										color='link'
										data-dismiss='modal'
										type='button'
										onClick={() => {
											deleteType();
											this.setState({ showModal: false });
										}}
									>
										Eliminar
									</Button>
								)}
							</Mutation>
						</div>
					</div>
				</Modal>
				{/* end small modal */}
			</>
		);
	}
}

export default graphql(GET_TYPES_DATA)(TypeTable);
