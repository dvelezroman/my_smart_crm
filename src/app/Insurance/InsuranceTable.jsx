import React from 'react';
import { Query, graphql } from 'react-apollo';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';
import { GET_INSURANCES_DATA } from './query';

class InsuranceTable extends React.Component {
	render() {
		const { data } = this.props;
		console.log({ data });
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Listado de Seguros Contratados</CardTitle>
								</CardHeader>
								<CardBody className='table-full-width table-hover'>
									<Table responsive>
										<thead>
											<tr>
												<th>id</th>
												<th>Referencia</th>
												<th>Desde</th>
												<th>Hasta</th>
												<th>Periodo</th>
												<th>Cliente</th>
												<th>Responsable</th>
												<th>Compañía</th>
												<th>Tipo</th>
												<th>Comentarios</th>
											</tr>
										</thead>
										<tbody>
											{data.insurances &&
												data.insurances.insurances.map(
													(
														{
															id,
															ref,
															from,
															to,
															term,
															comment,
															client,
															person,
															company,
															insurance_type
														},
														index
													) => (
														<tr key={index} className={index % 2 ? 'table-success' : ''}>
															<th>{id}</th>
															<td>{ref}</td>
															<td>{from}</td>
															<td>{to}</td>
															<td>{term}</td>
															<td>{client ? client.name : 'N/A'}</td>
															<td>{`${person.last_name}, ${person.first_name}`}</td>
															<td>{company.name}</td>
															<td>{insurance_type.name}</td>
															<td>{comment}</td>
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

export default graphql(GET_INSURANCES_DATA)(InsuranceTable);
