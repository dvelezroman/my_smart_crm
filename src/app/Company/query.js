import gql from 'graphql-tag';

export const GET_COMPANIES_DATA = gql`
	query {
		companies {
			status
			msg
			companies {
				id
				ref
				name
			}
		}
	}
`;

export const NEW_COMPANY_MUTATION = gql`
	mutation newCompanyMutation($ref: String, $name: String) {
		newCompany(company: { ref: $ref, name: $name }) {
			status
			company {
				id
				ref
				name
			}
			msg
		}
	}
`;

export const UPDATE_COMPANY_MUTATION = gql`
	mutation updateCompanyMutation($id: Int, $ref: String, $name: String) {
		updateCompany(id: $id, company: { ref: $ref, name: $name }) {
			status
			company {
				ref
				name
			}
			msg
		}
	}
`;
