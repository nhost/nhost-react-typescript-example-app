import jwt from 'jsonwebtoken';

class _auth {

	constructor() {
		this.setSession = this.setSession.bind(this);
		this.signOut = this.signOut.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
	}

	setSession(data) {

		const {
			jwt_token,
			refetch_token,
			user_id,
		} = data;

		var claims = jwt.decode(jwt_token);

		localStorage.clear();
		localStorage.setItem('jwt_token', jwt_token);
		localStorage.setItem('refetch_token', refetch_token);
		localStorage.setItem('user_id', user_id);
		localStorage.setItem('exp', (parseInt(claims.exp, 10) * 1000));
	}

	signOut() {
		localStorage.removeItem('jwt_token');
		localStorage.removeItem('refetch_token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('exp');
	}

	isAuthenticated() {
		return new Date().getTime() < localStorage.getItem('exp');
	}
}

const auth = new _auth();

export default auth;
