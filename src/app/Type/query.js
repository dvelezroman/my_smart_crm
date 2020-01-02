import gql from 'graphql-tag';

export const GET_TYPES_DATA = gql`
	query {
		types {
			status
			msg
			types {
				id
				name
				code
			}
		}
	}
`;

export const NEW_TYPE_MUTATION = gql`
	mutation newTypeMutation($code: String, $name: String) {
		newType(type: { code: $code, name: $name }) {
			status
			msg
		}
	}
`;

export const UPDATE_TYPE_MUTATION = gql`
	mutation UpdateTypeMutation($id: Int, $code: String, $name: String) {
		updateType(id: $id, type: { code: $code, name: $name }) {
			status
			msg
		}
	}
`;

export const DELETE_TYPE_MUTATION = gql`
	mutation DeleteTypeMutation($id: Int) {
		deleteType(id: $id) {
			status
			msg
		}
	}
`;
