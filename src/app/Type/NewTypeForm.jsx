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
import { NEW_TYPE_MUTATION, GET_TYPES_DATA } from './query';

class NewTypeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			formData: {
				code: '',
				name: ''
			}
		};
		this.onChange = this.onChange.bind(this);
	}

	resetFields = () => {
		this.setState({
			code: '',
			name: ''
		});
	};

	onChange = (name, value) => {
		const { formData } = this.state;
		formData[name] = value;
		this.setState({ formData });
	};

	validateFields = () => {
		const { code, name } = this.state;
		if (code !== '' && name !== '') {
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
															this.onChange('code', e.target.value);
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
											<Label sm='2'>Nombre de Tipo de Seguro</Label>
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
														Ingrese un nombre de tipo de seguro
													</FormText>
												</FormGroup>
											</Col>
										</Row>
									</Form>
								</CardBody>
								<CardFooter>
									<Mutation
										mutation={NEW_TYPE_MUTATION}
										variables={{
											code: formData.code,
											name: formData.name
										}}
										refetchQueries={() => {
											return [
												{
													query: GET_TYPES_DATA
												}
											];
										}}
									>
										{(callBackNewTypeMutation, { loading }) => {
											return (
												<Button
													onClick={() => {
														if (this.validateFields()) {
															callBackNewTypeMutation();
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

export default NewTypeForm;
