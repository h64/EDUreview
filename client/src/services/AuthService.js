import decode from 'jwt-decode';
class AuthService {
    // Initializing important variables
    constructor() {
        this.domain = '/api/auth'; // API server domain
        this.fetch = this.fetch.bind(this); // React binding stuff
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    // Success status lies between 200 to 300
                    return response;
                }
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            })
            .then(res => {
                this.setToken(res.token); // Setting the token in localStorage
                return Promise.resolve(res);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                // Checking if token is expired. N
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('jwt_token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('jwt_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('jwt_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
}

export default AuthService;
