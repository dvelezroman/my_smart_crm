const node_env = process.env.NODE_ENV || 'development';

const envs = (() => {
	if (node_env === 'development') {
		return {
			ENVIRONMENT: 'development',
			SERVERURL: 'http://localhost:3001/api',
			PORT: 3001,
			JWT_SECRET: 'caffeinasw',
		};
	} else {
		return {
			ENVIRONMENT: 'production',
			SERVERURL: 'http://204.93.197.180:3001/api',
			PORT: 3001,
			JWT_SECRET: 'caffeinasw',
			DB_USER: 'mysmartcrm',
			DB_PASSWORD: '@mysmartcrm2020@',
		};
	}
})();

module.exports = envs;
