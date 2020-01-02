import gql from 'graphql-tag';

export const GET_USERS_QUERY = gql`
	query {
		users {
			msg
			status
			users {
				id
				username
				email
			}
		}
	}
`;

export const LOGIN_USER_MUTATION = gql`
	mutation LoginMutation($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			status
			token
			msg
			user {
				id
				last_name
				first_name
				email
				role
				username
			}
		}
	}
`;

export const SIGNUP_USER_MUTATION = gql`
	mutation SignUpUserMutation(
		$document: String!
		$username: String!
		$role: String!
		$email: String!
		$first_name: String!
		$last_name: String!
		$password: String!
	) {
		signup(
			document: $document
			username: $username
			role: $role
			email: $email
			first_name: $first_name
			last_name: $last_name
			password: $password
		) {
			status
			msg
		}
	}
`;
