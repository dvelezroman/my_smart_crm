import gql from 'graphql-tag';

export const GET_INSURANCES_DATA = gql`
	query {
		insurances {
			status
			msg
			insurances {
				id
				ref
				from
				to
				term
				comment
				client {
					id
					name
					address
					document
					type
					province
					status
					personId
					person {
						id
						document
						first_name
						last_name
						email
						city
						province
						address
						birthday
					}
				}
				person {
					id
					document
					first_name
					last_name
					email
					city
					province
					address
					birthday
				}
				company {
					id
					ref
					name
				}
				insurance_type {
					id
					name
					code
				}
				user {
					id
					email
					role
					username
				}
			}
		}
	}
`;

export const GET_ALL_QUERY = gql`
	query {
		types {
			types {
				id
				name
				code
			}
		}
		companies {
			companies {
				id
				ref
				name
			}
		}
		clients {
			clients {
				id
				document
				province
				city
				type
				status
				name
				personId
			}
		}
		people {
			people {
				id
				document
				first_name
				last_name
				email
				city
				province
				address
				birthday
			}
		}
	}
`;

export const NEW_INSURANCE_MUTATION = gql`
	mutation mutationNewInsurance(
		$ref: String
		$amount: Float
		$premium: Float
		$comments: String
		$selectedFrom: String
		$selectedTo: String
		$selectedTerm: String
		$selectedClient: Int
		$selectedType: Int
		$selectedPerson: Int
		$selectedCompany: Int
		$selectedUser: Int
		$sendWelcomeMail: Boolean
	) {
		newInsurance(
			sendWelcomeMail: $sendWelcomeMail
			insurance: {
				ref: $ref
				amount: $amount
				premium: $premium
				from: $selectedFrom
				to: $selectedTo
				term: $selectedTerm
				clientId: $selectedClient
				insuranceTypeId: $selectedType
				personId: $selectedPerson
				companyId: $selectedCompany
				userId: $selectedUser
				comment: $comments
			}
		) {
			status
			msg
		}
	}
`;

export const UPDATE_INSURANCE_MUTATION = gql`
	mutation mutationUpdateInsurance(
		$id: Int
		$ref: String
		$amount: Float
		$premium: Float
		$comments: String
		$selectedFrom: String
		$selectedTo: String
		$selectedTerm: String
		$selectedClient: Int
		$selectedType: Int
		$selectedPerson: Int
		$selectedCompany: Int
		$selectedUser: Int
	) {
		newInsurance(
			id: $id
			insurance: {
				ref: $ref
				amount: $amount
				premium: $premium
				from: $selectedFrom
				to: $selectedTo
				term: $selectedTerm
				clientId: $selectedClient
				insuranceTypeId: $selectedType
				personId: $selectedPerson
				companyId: $selectedCompany
				userId: $selectedUser
				comment: $comments
			}
		) {
			status
			msg
		}
	}
`;

export const DELETE_INSURANCE_MUTATION = gql`
	mutation mutationDeleteInsurance($id: Int!) {
		deleteInsurance(id: $id) {
			status
			msg
		}
	}
`;
