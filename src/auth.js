import jwt from 'jsonwebtoken';
import nhost from './nhost';

class _auth {

  constructor() {
    this.initSession = this.initSession.bind(this);
    this.setSession = this.setSession.bind(this);
    this.signOut = this.signOut.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.startRefetchTokenInterval = this.startRefetchTokenInterval.bind(this);
    this.refetchToken = this.refetchToken.bind(this);
    this.stopRefetchTokenInterval = this.stopRefetchTokenInterval.bind(this);

    if (this.isAuthenticated()) {
      this.startRefetchTokenInterval();
    }
  }

  initSession(data) {
    this.setSession(data);
    this.startRefetchTokenInterval();
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

  startRefetchTokenInterval() {
    this.interval = setInterval(this.refetchToken, 60000);
  }

  async refetchToken() {

    if (this.isAuthenticated()) {
      const user_id = localStorage.getItem('user_id');
      const refetch_token = localStorage.getItem('refetch_token');
      try {
        const data = await nhost.refetch_token(user_id, refetch_token);
        this.setSession(data);
      } catch (e) {
        console.log('error fetching new token using refetch token');
        console.error({e});
      }
    } else {
      this.stopRefetchTokenInterval();
    }
  }

  stopRefetchTokenInterval() {
    clearInterval(this.interval);
  }

  signOut() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refetch_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('exp');

    this.stopRefetchTokenInterval();
  }

  isAuthenticated() {
    return new Date().getTime() < localStorage.getItem('exp');
  }
}

const auth = new _auth();

export default auth;
