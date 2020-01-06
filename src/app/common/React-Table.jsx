import React from 'react';
// react component for creating dynamic tables
import RT from 'react-table';

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';

class ReactTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, columns, data } = this.props;
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>{title}</CardTitle>
								</CardHeader>
								<CardBody>
									<RT
										data={data}
										filterable
										columns={columns}
										defaultPageSize={10}
										showPaginationTop
										showPaginationBottom={false}
										/*
                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                    */
										className='-striped -highlight primary-pagination'
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default ReactTable;
