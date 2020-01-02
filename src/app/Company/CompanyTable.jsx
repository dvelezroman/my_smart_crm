import React from 'react';
import { Query } from 'react-apollo';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';
import { GET_COMPANIES_DATA } from './query';

class CompanyTable extends React.Component {
	render() {
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Compañías</CardTitle>
								</CardHeader>
								<CardBody className='table-full-width table-hover'>
									<Table responsive>
										<thead>
											<tr>
												<th>id</th>
												<th>Referencia</th>
												<th>Nombre</th>
											</tr>
										</thead>
										<tbody>
											<Query query={GET_COMPANIES_DATA}>
												{({ data, loading }) => {
													if (loading) return null;
													return data.companies.companies.map(({ id, ref, name }, index) => (
														<tr key={index} className={index % 2 ? 'table-success' : ''}>
															<th>{id}</th>
															<td>{ref}</td>
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

export default CompanyTable;
