import gql from 'graphql-tag';

export const GET_CLIENTS_DATA = gql`
	query {
		clients {
			status
			msg
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
			status
			msg
			people {
				id
				document
				last_name
				first_name
			}
		}
	}
`;

export const NEW_CLIENT_MUTATION = gql`
	mutation newClientMutation(
		$type: String
		$document: String
		$status: Boolean
		$city: String
		$province: String
		$name: String
		$personId: Int
	) {
		newClient(
			client: {
				type: $type
				document: $document
				status: $status
				province: $province
				city: $city
				name: $name
				personId: $personId
			}
		) {
			status
			client {
				document
				type
				status
			}
			msg
		}
	}
`;

export const UPDATE_CLIENT_MUTATION = gql`
	mutation updateClientMutation(
		$id: Int
		$document: String
		$type: String
		$status: Boolean
		$city: String
		$province: String
		$name: String
		$personId: Int
	) {
		updateClient(
			id: $id
			client: {
				document: $document
				type: $type
				status: $status
				province: $province
				city: $city
				name: $name
				personId: $personId
			}
		) {
			status
			client {
				document
				type
				status
			}
			msg
		}
	}
`;
