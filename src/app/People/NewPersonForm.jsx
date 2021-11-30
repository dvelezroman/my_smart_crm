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
import ReactDatetime from 'react-datetime';
import { NEW_PERSON_MUTATION, GET_PEOPLE_DATA } from './query';
import { getProvinces, getCities } from 'constants/location';

class NewPersonForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			formData: {
				document: '',
				last_name: '',
				first_name: '',
				email: '',
				city: '',
				province: '',
				address: '',
				birthday: '',
				contact: ''
			}
		};
		this.onChange = this.onChange.bind(this);
	}

	resetFields = () => {
		const formData = {
			document: '',
			last_name: '',
			first_name: '',
			email: '',
			city: '',
			province: '',
			address: '',
			birthday: '',
			contact: ''
		};
		this.setState({
			formData,
			showModal: true
		});
	};

	onChange = (name, value) => {
		const { formData } = this.state;
		formData[name] = value;
		if (name === 'province') formData.city = '';
		this.setState({ formData });
	};

	validateFields = () => {
		const {
			document,
			last_name,
			first_name,
			email,
			city,
			province,
			address,
			birthday,
			contact
		} = this.state;
		if (
			document !== '' &&
			first_name !== '' &&
			last_name !== '' &&
			email !== '' &&
			province !== '' &&
			city !== '' &&
			address !== '' &&
			birthday !== '' &&
			contact !== ''
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
		const { formData } = this.state;
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Formulario para ingreso de Nueva Persona</CardTitle>
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
											<Label sm='2'>Nombres</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														value={formData.first_name}
														onChange={e => {
															this.onChange('first_name', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese nombres de la persona
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Apellidos</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														value={formData.last_name}
														onChange={e => {
															this.onChange('last_name', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese apellidos de la persona
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Correo electrónico</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='email'
														value={formData.email}
														onChange={e => {
															this.onChange('email', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese correo electrónico
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Dirección</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														value={formData.address}
														onChange={e => {
															this.onChange('address', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese dirección
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Número de contacto</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='number'
														value={formData.contact}
														onChange={e => {
															this.onChange('contact', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese un número de contacto (teléfono fijo / celular)
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Fecha de Nacimiento</Label>
											<Col md='4'>
												<FormGroup>
													<ReactDatetime
														inputProps={{
															className: 'form-control',
															placeholder: 'Seleccione fecha'
														}}
														timeFormat={false}
														onChange={value => {
															const date = value.format('YYYY-MM-DD');
															this.onChange('birthday', date);
														}}
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
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={NEW_PERSON_MUTATION}
										variables={{
											document: formData.document,
											first_name: formData.first_name,
											last_name: formData.last_name,
											email: formData.email,
											address: formData.address,
											contact: formData.contact,
											birthday: formData.birthday,
											province: formData.province.value,
											city: formData.city.value
										}}
										refetchQueries={() => {
											return [
												{
													query: GET_PEOPLE_DATA
												}
											];
										}}
									>
										{(callBackNewPersonMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															callBackNewPersonMutation();
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
								<p>Se registró nueva Persona</p>
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

export default NewPersonForm;
