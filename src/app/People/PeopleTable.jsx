import React from 'react';
import { Query } from 'react-apollo';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';
import { GET_PEOPLE_DATA } from './query';

class PeopleTable extends React.Component {
	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Personas</CardTitle>
								</CardHeader>
								<CardBody className='table-full-width table-hover'>
									<Table responsive>
										<thead>
											<tr>
												<th>id</th>
												<th>Documento</th>
												<th>Nombres</th>
												<th>Apellidos</th>
												<th className='text-center'>e-mail</th>
												<th>Provincia</th>
												<th>Ciudad</th>
												<th>Dirección</th>
												<th>Contacto</th>
												<th>Fecha de Nacimiento</th>
												{/* <th className='text-right'>Salary</th> */}
											</tr>
										</thead>
										<tbody>
											<Query query={GET_PEOPLE_DATA}>
												{({ data, loading }) => {
													if (loading) return null;
													return data.people.people.map(
														(
															{
																id,
																document,
																first_name,
																last_name,
																email,
																province,
																city,
																address,
																contact,
																birthday
															},
															index
														) => (
															<tr key={index} className={index % 2 ? 'table-success' : ''}>
																<th>{id}</th>
																<td>{document}</td>
																<td>{first_name}</td>
																<td>{last_name}</td>
																<td>{email}</td>
																<td>{province}</td>
																<td>{city}</td>
																<td>{address}</td>
																<td>{contact}</td>
																<td>{birthday}</td>
																{/* <td className='text-right'>$36,738</td> */}
															</tr>
														)
													);
												}}
											</Query>
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

export default PeopleTable;
