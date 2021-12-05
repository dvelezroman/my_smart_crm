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
			SERVERURL: 'https://my.smartcrm.ec:8443/api',
			PORT: 8443,
			JWT_SECRET: 'caffeinasw',
			DB_USER: 'dvelez',
			DB_PASSWORD: 'dvelez2021',
		};
	}
})();

module.exports = envs;
