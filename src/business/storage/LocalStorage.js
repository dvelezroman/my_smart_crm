import jwt from 'jsonwebtoken';

class LocalStorage {
	static saveToken = token => {
		localStorage.setItem('user-seguros', token);
	};

	static getToken = () => {
		return localStorage.getItem('user-seguros');
	};

	static deleteToken = () => {
		return localStorage.removeItem('user-seguros');
	};

	static validateToken = token => {
		try {
			const decoded = jwt.verify(token, 'mateocorp2022');
			return decoded;
		} catch {
			return false;
		}
	};
}

export default LocalStorage;
