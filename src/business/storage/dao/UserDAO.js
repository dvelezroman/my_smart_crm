class UserDAORaw {
	constructor() {
		this.user = null;
		this.token = null;
	}

	setUser = user => {
		this.user = user;
	};

	getUser = () => this.user;
}

const UserDAO = new UserDAORaw();

export default UserDAO;
