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
import { NEW_COMPANY_MUTATION, GET_COMPANIES_DATA } from './query';

class NewCompanyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			formData: {
				ref: '',
				name: ''
			}
		};
		this.onChange = this.onChange.bind(this);
	}

	resetFields = () => {
		this.setState({
			ref: '',
			name: ''
		});
	};

	onChange = (name, value) => {
		const { formData } = this.state;
		formData[name] = value;
		this.setState({ formData });
	};

	validateFields = () => {
		const { ref, name } = this.state;
		if (ref !== '' && name !== '') {
			return true;
		}
		return false;
	};

	render() {
		const { formData } = this.state;
		return (
			<>
				<div className='content'>
					<Row>
						<Col md='12'>
							<Card>
								<CardHeader>
									<CardTitle tag='h4'>Formulario para ingreso de Nueva Compañía</CardTitle>
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
															this.onChange('reference', e.target.value);
														}}
														value={formData.ref}
													/>
													<FormText color='default' tag='span'>
														Ingrese una clave de referencia.
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
														Ingrese el nombre de la Compañía.
													</FormText>
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={NEW_COMPANY_MUTATION}
										variables={{
											ref: formData.ref,
											name: formData.name
										}}
										refetchQueries={() => {
											return [
												{
													query: GET_COMPANIES_DATA
												}
											];
										}}
									>
										{(callBackNewCompanyMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															callBackNewCompanyMutation();
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

export default NewCompanyForm;
