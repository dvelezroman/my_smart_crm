import gql from 'graphql-tag';

export const NEW_CONFIG_MUTATION = gql`
	mutation mutationNewConfig(
		$mailServer: String
		$mailAccount: String
		$mailPassword: String
		$mailPort: String
		$welcome: Boolean
		$birthday: Boolean
		$renewal: Boolean
	) {
		newConfig(
			config: {
				mailuser: $mailAccount
				mailport: $mailPort
				mailpassword: $mailPassword
				mailserver: $mailServer
				birthday: $birthday
				welcome: $welcome
				renewal: $renewal
			}
		) {
			status
			msg
		}
	}
`;

export const GET_CONFIGS = gql`
	query {
		configs {
			status
			msg
			configs {
				mailuser
				mailport
				mailpassword
				mailserver
				birthday
				welcome
				renewal
			}
		}
	}
`;

export const UPDATE_CONFIG_MUTATION = gql`
	mutation mutationUpdateConfig(
		$id: Int
		$mailserver: String
		$mailaccount: String
		$mailpassword: String
		$mailport: String
		$welcome: Boolean
		$birthday: Boolean
		$renewal: Boolean
	) {
		updateConfig(
			id: $id
			config: {
				mailserver: $mailserver
				mailuser: $mailaccount
				mailpassword: $mailpassword
				mailport: $mailport
				welcome: $welcome
				birthday: $birthday
				renewal: $renewal
			}
		) {
			status
			msg
		}
	}
`;
