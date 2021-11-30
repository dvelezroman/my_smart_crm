import React from 'react';
import { graphql, Query, Mutation } from 'react-apollo';
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
import { GET_CONFIGS, UPDATE_CONFIG_MUTATION } from './query';

class MailConfigForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			formData: {
				mailserver: '',
				mailuser: '',
				mailpassword: '',
				mailport: '',
				welcome: false,
				birthday: false,
				renewal: false
			},
			fetched: false
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange = (name, value) => {
		const { formData } = this.state;
		if (name === 'mailport') formData[name] = toString(value);
		formData[name] = value;
		this.setState({ formData });
	};

	validateFields = () => {
		const { mailserver, mailuser, mailpassword, mailport } = this.state;
		if (mailserver !== '' && mailuser !== '' && mailpassword !== '' && mailport !== '') {
			return true;
		}
		return false;
	};

	static getDerivedStateFromProps(props, state) {
		if (!state.fetched && props.data && props.data.configs) {
			const formData = props.data.configs.configs[0];
			return {
				formData,
				fetched: true
			};
		}
		return null;
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
									<CardTitle tag='h4'>Configuración para el envío de correos</CardTitle>
								</CardHeader>
								<CardBody>
									<Form action='/' className='form-horizontal' method='get'>
										<Row>
											<Label sm='2'>Nombre del Servidor de Correos</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='text'
														onChange={e => {
															this.onChange('mailserver', e.target.value);
														}}
														value={formData.mailserver}
													/>
													<FormText color='default' tag='span'>
														Ingrese la dirección del servidor de correos a utilizar.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Dirección de la cuenta de correo a utilizar</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='email'
														value={formData.mailuser}
														onChange={e => {
															this.onChange('mailuser', e.target.value);
														}}
													/>
													<FormText color='default' tag='span'>
														Ingrese el correo electrónico de la cuenta a utilizar.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Password</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='password'
														value={formData.mailpassword}
														onChange={e => {
															this.onChange('mailpassword', e.target.value);
														}}
														autoComplete='off'
													/>
													<FormText color='default' tag='span'>
														Ingrese la contraseña de la cuenta de correo que va a utilizar.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Número de Puerto</Label>
											<Col sm='10'>
												<FormGroup>
													<Input
														type='number'
														value={formData.mailport}
														onChange={e => {
															this.onChange('mailport', e.target.value);
														}}
														autoComplete='off'
													/>
													<FormText color='default' tag='span'>
														Ingrese el número de puerto.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Label sm='2'>Activar envíos para:</Label>
											<Col className='checkbox-radios' sm='10'>
												<FormGroup check>
													<Label check>
														<Input
															type='checkbox'
															checked={formData.welcome}
															onClick={e => {
																this.onChange('welcome', e.target.checked);
															}}
														/>
														<span className='form-check-sign' />
														Bienvenida
													</Label>
												</FormGroup>
												<FormGroup check>
													<Label check>
														<Input
															type='checkbox'
															checked={formData.birthday}
															onClick={e => {
																this.onChange('birthday', e.target.checked);
															}}
														/>
														<span className='form-check-sign' />
														Cumpleaños
													</Label>
												</FormGroup>
												<FormGroup check>
													<Label check>
														<Input
															type='checkbox'
															onClick={e => {
																this.onChange('renewal', e.target.checked);
															}}
															checked={formData.renewal}
														/>
														<span className='form-check-sign' />
														Renovación
													</Label>
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={UPDATE_CONFIG_MUTATION}
										variables={{ id: 1, ...this.state.formData }}
										refetchQueries={() => {
											return [
												{
													query: GET_CONFIGS
												}
											];
										}}
									>
										{(callBackConfigMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															this.setState({ fetched: false });
															callBackConfigMutation();
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

export default graphql(GET_CONFIGS, UPDATE_CONFIG_MUTATION)(MailConfigForm);
