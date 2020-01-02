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
	Col
} from 'reactstrap';
import Select from 'react-select';
import Switch from 'react-bootstrap-switch';
import ReactDatetime from 'react-datetime';
import { GET_ALL_QUERY, NEW_INSURANCE_MUTATION, GET_INSURANCES_DATA } from './query';
import UserDAO from 'business/dao/UserDAO';

class NewInsuranceForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fetched: false,
			showModal: false,
			people: [],
			types: [],
			companies: [],
			clients: [],
			formData: {
				ref: '',
				amount: '',
				premium: '',
				comments: '',
				selectedFrom: '',
				selectedTo: '',
				selectedTerm: '',
				selectedClient: 0,
				selectedType: 0,
				selectedPerson: 0,
				selectedCompany: 0,
				selectedUser: { id: 1 },
				sendWelcomeMail: false
			}
		};
		this.onChange = this.onChange.bind(this);
	}

	resetFields = () => {
		const formData = {
			ref: '',
			amount: '',
			premium: '',
			comments: '',
			selectedFrom: '',
			selectedTo: '',
			selectedTerm: '',
			selectedClient: 0,
			selectedType: 0,
			selectedPerson: 0,
			selectedCompany: 0,
			selectedUser: 0,
			sendWelcomeMail: false,
			selectedUser: { id: 1 }
		};
		this.setState({
			formData
		});
	};

	parseData = ({ types, clients, people, companies }) => {
		const parsedPeople = people.map(person => {
			const { id, last_name, first_name } = person;
			return { value: id, label: `${last_name}, ${first_name}` };
		});
		const parsedTypes = types.map(type => {
			const { id, name } = type;
			return { value: id, label: name };
		});
		const parsedClients = clients.map(client => {
			const { id, name } = client;
			return { value: id, label: name };
		});
		const parsedCompanies = companies.map(company => {
			const { id, name } = company;
			return { value: id, label: name };
		});
		this.setState({
			people: parsedPeople,
			types: parsedTypes,
			clients: parsedClients,
			companies: parsedCompanies,
			fetched: true
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
			ref,
			amount,
			premium,
			comments,
			selectedFrom,
			selectedTo,
			selectedTerm,
			selectedClient,
			selectedType,
			selectedPerson,
			selectedCompany,
			selectedUser
		} = this.state;
		if (
			ref !== '' &&
			amount !== '' &&
			premium !== '' &&
			comments !== '' &&
			selectedFrom !== '' &&
			selectedTo !== '' &&
			selectedTerm !== '' &&
			selectedClient !== 0 &&
			selectedType !== 0 &&
			selectedPerson !== 0 &&
			selectedCompany !== 0 &&
			selectedUser !== 0
		) {
			return true;
		}
		return false;
	};

	componentWillUpdate(nextProps) {
		if (!this.state.fetched && nextProps.data) {
			const { types, clients, people, companies } = nextProps.data;
			this.parseData({
				types: types.types,
				clients: clients.clients,
				people: people.people,
				companies: companies.companies
			});
		}
	}

	render() {
		const { formData, people, companies, clients, types } = this.state;
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Formulario para ingreso de Nuevo Seguro Contratado</CardTitle>
								</CardHeader>
								<CardBody>
									<Form action='/' className='form-horizontal' method='get'>
										<Row>
											<Label sm='2'>Referencia</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														onChange={e => {
															this.onChange('ref', e.target.value);
														}}
														value={formData.ref}
													/>
													<FormText color='default' tag='span'>
														Ingrese un código de referencia.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Monto</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='number'
														value={formData.amount}
														onChange={e => {
															this.onChange('amount', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese el monto a asegurar.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Prima</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='number'
														value={formData.premium}
														onChange={e => {
															this.onChange('premium', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese el monto de la prima.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Desde</Label>
											<Col md='4'>
												<FormGroup>
													<ReactDatetime
														inputProps={{
															className: 'form-control',
															placeholder: 'Seleccione fecha'
														}}
														timeFormat={false}
														value={formData.selectedFrom}
														onChange={value => {
															const date = value.format('YYYY-MM-DD');
															this.onChange('selectedFrom', date);
														}}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Hasta</Label>
											<Col md='4'>
												<FormGroup>
													<ReactDatetime
														inputProps={{
															className: 'form-control',
															placeholder: 'Seleccione fecha'
														}}
														timeFormat={false}
														value={formData.selectedTo}
														onChange={value => {
															const date = value.format('YYYY-MM-DD');
															this.onChange('selectedTo', date);
														}}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Seleccione Periodo</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.type}
														onChange={option => this.onChange('selectedTerm', option)}
														options={[
															{ value: 'Semestral', label: 'Semestral' },
															{ value: 'Anual', label: 'Anual' }
														]}
														placeholder='Seleccione'
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Tipo de Seguro</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.personId}
														onChange={option => this.onChange('selectedType', option)}
														options={types}
														placeholder={'Seleccione'}
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
														value={formData.selectedPerson}
														onChange={option => this.onChange('selectedPerson', option)}
														options={people}
														placeholder={'Seleccione'}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Cliente</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.selectedClient}
														onChange={option => this.onChange('selectedClient', option)}
														options={clients}
														placeholder={'Seleccione'}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Compañía</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Select
														className='react-select primary'
														classNamePrefix='react-select'
														name='singleSelect'
														value={formData.selectedCompany}
														onChange={option => this.onChange('selectedCompany', option)}
														options={companies}
														placeholder={'Seleccione'}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Enviar correo de bienvenida</Label>
											<Col lg='5' md='6' sm='3'>
												<FormGroup>
													<Switch
														onColor='default'
														offColor='default'
														defaultValue={formData.sendWelcomeMail}
														onChange={(_, value) => {
															this.onChange('sendWelcomeMail', value);
														}}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Observaciones</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='textarea'
														onChange={e => {
															this.onChange('comments', e.target.value);
														}}
														value={formData.comments}
													/>
													<FormText color='default' tag='span'>
														Ingrese comentarios de ser necesario
													</FormText>
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={NEW_INSURANCE_MUTATION}
										variables={{
											ref: formData.ref,
											amount: parseFloat(formData.amount),
											premium: parseFloat(formData.premium),
											comments: formData.comments,
											selectedFrom: formData.selectedFrom,
											selectedTo: formData.selectedTo,
											selectedTerm: formData.selectedTerm.value,
											selectedClient: formData.selectedClient.value,
											selectedType: formData.selectedType.value,
											selectedPerson: formData.selectedPerson.value,
											selectedCompany: formData.selectedCompany.value,
											sendWelcomeMail: formData.sendWelcomeMail,
											selectedUser: formData.selectedUser.id
										}}
										refetchQueries={() => {
											return [
												{
													query: GET_INSURANCES_DATA
												}
											];
										}}
									>
										{(callBackNewInsuranceMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															callBackNewInsuranceMutation();
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
				</div>
			</>
		);
	}
}

export default graphql(GET_ALL_QUERY)(NewInsuranceForm);
