import React from 'react';
import { graphql, Mutation } from 'react-apollo';
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Label,
	FormGroup,
	Form,
	Input,
	FormText,
	Row,
	Col,
	Modal
} from 'reactstrap';
import Select from 'react-select';
import Switch from 'react-bootstrap-switch';
import { NEW_CLIENT_MUTATION, GET_CLIENTS_DATA } from './query';
import { getProvinces, getCities } from 'constants/location';

class NewClientForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			people: [],
			fetched: false,
			formData: {
				document: '',
				name: '',
				type: '',
				city: '',
				province: '',
				status: true,
				personId: 0
			}
		};
		this.onChange = this.onChange.bind(this);
	}

	resetFields = () => {
		const formData = {
			document: '',
			name: '',
			type: '',
			city: '',
			province: '',
			status: true,
			personId: 0
		};
		this.setState({
			formData,
			showModal: true
		});
	};

	parseData = people => {
		const parsedPeople = people.map(person => {
			const { id, last_name, first_name } = person;
			return { value: id, label: `${last_name}, ${first_name}` };
		});
		this.setState({ people: parsedPeople, fetched: true });
	};

	onChange = (name, value) => {
		const { formData } = this.state;
		formData[name] = value;
		if (name === 'province') formData.city = '';
		this.setState({ formData });
	};

	validateFields = () => {
		const { document, name, type, city, province, status, personId } = this.state;
		if (
			document !== '' &&
			name !== '' &&
			type !== '' &&
			city !== '' &&
			province !== '' &&
			personId !== 0
		) {
			return true;
		}
		return false;
	};

	componentWillUpdate(nextProps) {
		if (!this.state.fetched && nextProps.data && nextProps.data.people.people.length)
			this.parseData(nextProps.data.people.people);
	}

	render() {
		const { formData, people } = this.state;
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Formulario para ingreso de Nuevo Cliente</CardTitle>
								</CardHeader>
								<CardBody>
									<Form action='/' className='form-horizontal' method='get'>
										<Row>
											<Label sm='2'>Documento</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														onChange={e => {
															this.onChange('document', e.target.value);
														}}
														value={formData.document}
													/>
													<FormText color='default' tag='span'>
														Ingrese un documento de identificación.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Nombre</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														value={formData.name}
														onChange={e => {
															this.onChange('name', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese el nombre del Cliente.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Tipo de Cliente</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.type}
														onChange={option => this.onChange('type', option)}
														options={[
															{ value: 'Natural', label: 'Persona Natural' },
															{ value: 'Juridica', label: 'Persona Jurídica' }
														]}
														placeholder='Seleccione'
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Provincia</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.province}
														onChange={option => this.onChange('province', option)}
														options={getProvinces()}
														placeholder='Seleccione'
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Ciudad</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.city}
														onChange={option => this.onChange('city', option)}
														options={formData.province !== '' ? getCities(formData.province) : []}
														placeholder={
															formData.province === ''
																? 'Seleccione Provincia Primero'
																: 'Seleccione'
														}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Responsable</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.personId}
														onChange={option => this.onChange('personId', option)}
														options={people}
														placeholder={'Seleccione'}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Estado</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Switch
														onColor='default'
														offColor='default'
														defaultValue={true}
														onChange={(_, value) => {
															this.onChange('status', value);
														}}
													/>
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={NEW_CLIENT_MUTATION}
										variables={{
											type: formData.type.value,
											document: formData.document,
											status: formData.status,
											city: formData.city.value,
											province: formData.province.value,
											name: formData.name,
											personId: formData.personId.value
										}}
										refetchQueries={() => {
											return [
												{
													query: GET_CLIENTS_DATA
												}
											];
										}}
									>
										{(callBackNewClientMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															callBackNewClientMutation();
															this.resetFields();
														}
													}}
													className='btn-round'
													color='info'
													type='submit'
												>
													{loading ? 'Guardando' : 'Guardar'}
												</Button>
											);
										}}
									</Mutation>
								</CardFooter>
							</Card>
						</Col>
					</Row>
					<Row>
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
								<p>Se registró nuevo Cliente</p>
							</div>
							<div className='modal-footer'>
								<div className='center'>
									<Button
										color='link'
										data-dismiss='modal'
										type='button'
										onClick={() => {
											this.setState({ showModal: false });
										}}
									>
										Cerrar
									</Button>
								</div>
							</div>
						</Modal>
						{/* end small modal */}
					</Row>
				</div>
			</>
		);
	}
}

export default graphql(GET_CLIENTS_DATA)(NewClientForm);
