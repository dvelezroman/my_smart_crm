const node_env = process.env.NODE_ENV || 'development';

const envs = (() => {
	if (node_env === 'development') {
		return {
			ENVIRONMENT: 'development',
			SERVERURL: 'http://localhost:3001/api',
			PORT: 3001
		};
	} else {
		return {
			ENVIRONMENT: 'production',
			SERVERURL: 'http://66.70.188.64:3001/api',
			PORT: 3001
		};
	}
})();

module.exports = envs;
