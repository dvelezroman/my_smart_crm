import gql from 'graphql-tag';

export const GET_PEOPLE_DATA = gql`
	query {
		people {
			status
			msg
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
				contact
			}
		}
	}
`;

export const NEW_PERSON_MUTATION = gql`
	mutation newPersonMutation(
		$document: String
		$first_name: String
		$last_name: String
		$email: String
		$city: String
		$province: String
		$address: String
		$birthday: String
		$contact: String
	) {
		newPerson(
			person: {
				document: $document
				last_name: $last_name
				first_name: $first_name
				email: $email
				city: $city
				province: $province
				address: $address
				birthday: $birthday
				contact: $contact
			}
		) {
			status
			person {
				id
				document
				last_name
				first_name
			}
			msg
		}
	}
`;

export const UPDATE_PERSON_MUTATION = gql`
	mutation updatePersonMutation(
		$id: Int
		$document: String
		$first_name: String
		$last_name: String
		$email: String
		$city: String
		$province: String
		$address: String
		$birthday: String
		$contact: String
	) {
		updatePerson(
			id: $id
			person: {
				document: $document
				last_name: $last_name
				first_name: $first_name
				email: $email
				city: $city
				province: $province
				address: $address
				birthday: $birthday
				contact: $contact
			}
		) {
			status
			person {
				id
				document
				last_name
				first_name
				email
				city
				province
				address
				birthday
				contact
			}
			msg
		}
	}
`;
