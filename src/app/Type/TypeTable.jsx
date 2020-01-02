import React from 'react';
import { Query } from 'react-apollo';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';
import { GET_TYPES_DATA } from './query';

class TypeTable extends React.Component {
	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Tipos de Seguro</CardTitle>
								</CardHeader>
								<CardBody className='table-full-width table-hover'>
									<Table responsive>
										<thead>
											<tr>
												<th>id</th>
												<th>Código</th>
												<th>Nombre</th>
											</tr>
										</thead>
										<tbody>
											<Query query={GET_TYPES_DATA}>
												{({ data, loading }) => {
													if (loading) return null;
													return data.types.types.map(({ id, code, name }, index) => (
														<tr key={index} className={index % 2 ? 'table-success' : ''}>
															<th>{id}</th>
															<td>{code}</td>
															<td>{name}</td>
														</tr>
													));
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

export default TypeTable;
