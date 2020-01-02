import React from 'react';
import { Query, graphql } from 'react-apollo';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';
import { GET_CLIENTS_DATA } from './query';

class ClientTable extends React.Component {
	state = {
		people: [],
		fetched: false
	};

	parseData = people => {
		const parsedPeople = {};
		people.forEach(person => {
			const { id, last_name, first_name } = person;
			parsedPeople[id] = `${last_name}, ${first_name}`;
		});
		this.setState({ people: parsedPeople, fetched: true });
	};

	componentWillUpdate(nextProps) {
		if (!this.state.fetched && nextProps.data && nextProps.data.people.people.length)
			this.parseData(nextProps.data.people.people);
	}

	render() {
		const { data } = this.props;
		console.log(this.state);
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Clientes</CardTitle>
								</CardHeader>
								<CardBody className='table-full-width table-hover'>
									<Table responsive>
										<thead>
											<tr>
												<th>id</th>
												<th>Documento</th>
												<th>Nombre</th>
												<th>Tipo</th>
												<th>Ciudad</th>
												<th>Provincia</th>
												<th>Estado</th>
												<th>Responsable</th>
											</tr>
										</thead>
										<tbody>
											{data.clients &&
												data.clients.clients.map(
													(
														{ id, document, name, type, city, province, status, personId },
														index
													) => (
														<tr key={index} className={index % 2 ? 'table-success' : ''}>
															<th>{id}</th>
															<td>{document}</td>
															<td>{name}</td>
															<td>{type}</td>
															<td>{city}</td>
															<td>{province}</td>
															<td>{status ? 'Activo' : 'Inactivo'}</td>
															<td>{this.state.people[personId]}</td>
														</tr>
													)
												)}
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default graphql(GET_CLIENTS_DATA)(ClientTable);
