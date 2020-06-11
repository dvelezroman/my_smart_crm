import React from 'react';
import { Mutation, graphql } from 'react-apollo';

import { LOGIN_USER_MUTATION, GET_USERS_QUERY } from './queries';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col,
	Row,
} from 'reactstrap';
import LocalStorage from 'business/storage/LocalStorage';
import UserDAO from 'business/dao/UserDAO';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			rememberMe: false,
			openModal: false,
			error: null,
			initialConfig: true,
		};
	}
	setInitialConfig() {
		// Shows the initial Config Screen
		// when finished must get back to Login Screen
		console.log('Initial Config is needed');
		//this.props.history.push('/initialSettings');
	}

	shouldComponentUpdate(nextProps, nextState) {
		// TODO: verify if the admin user is set, and the mail config
		// execute an stepper before going to Dashboard
		if (nextProps.data && nextProps.data.users && nextProps.data.users.users) {
			if (!nextProps.data.users.users.length) {
				this.setInitialConfig();
				// this.props.history.push('/initialConfig');
			}
		}
		return true;
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
	};

	onCompleted = ({ login }) => {
		if (login.status) {
			// FIX: delete when needed
			console.log(login.token);
			LocalStorage.saveToken(login.token);
			UserDAO.setUser(login.user);
			this.props.history.push('/admin/dashboard');
		} else {
			this.onError(login.msg);
		}
	};

	onError = error => {
		this.setState({ openModal: true, error });
	};

	handleClose = () => {
		this.setState({ openModal: false });
	};

	componentDidMount() {
		document.body.classList.toggle('login-page');
		const token = LocalStorage.getToken();
		const validateToken = LocalStorage.validateToken(token);
		if (validateToken) {
			UserDAO.setUser(validateToken);
		} else {
			LocalStorage.deleteToken();
		}
	}

	componentWillUnmount() {
		document.body.classList.toggle('login-page');
	}
	render() {
		const { username, password, openModal, error } = this.state;
		return (
			<div className='login-page'>
				<Container>
					<Row>
						<Col className='ml-auto mr-auto' lg='4' md='6'>
							<Mutation
								mutation={LOGIN_USER_MUTATION}
								variables={{ username, password }}
								onCompleted={data => {
									this.onCompleted(data);
								}}
								onError={error => {
									this.onError(error);
								}}
							>
								{mutation => (
									<Form action='' className='form' method=''>
										<Card className='card-login'>
											<CardHeader>
												<CardHeader>
													<h3 className='header text-center'>Login</h3>
												</CardHeader>
											</CardHeader>
											<CardBody>
												<InputGroup>
													<InputGroupAddon addonType='prepend'>
														<InputGroupText>
															<i className='nc-icon nc-single-02' />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														value={username}
														autoFocus
														autoComplete='username'
														onChange={e => {
															this.onChange('username', e.target.value);
														}}
														placeholder='Usuario'
														type='text'
													/>
												</InputGroup>
												<InputGroup>
													<InputGroupAddon addonType='prepend'>
														<InputGroupText>
															<i className='nc-icon nc-key-25' />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														value={password}
														placeholder='Contraseña'
														type='password'
														autoComplete='off'
														onChange={e => {
															this.onChange('password', e.target.value);
														}}
													/>
												</InputGroup>
												<br />
											</CardBody>
											<CardFooter>
												<Button
													block
													className='btn-round mb-3'
													color='warning'
													// href='#pablo'
													onClick={e => {
														e.preventDefault();
														mutation();
													}}
												>
													Ingresar
												</Button>
											</CardFooter>
										</Card>
									</Form>
								)}
							</Mutation>
						</Col>
					</Row>
				</Container>
				<div
					className='full-page-background'
					style={{
						backgroundImage: `url(${require('assets/img/bg/fabio-mangione.jpg')})`,
					}}
				/>
			</div>
		);
	}
}

export default graphql(GET_USERS_QUERY)(Login);
