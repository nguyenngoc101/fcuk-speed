export const userService = {
    login,
    logout,
    register
};

function login(name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    return fetch('http://localhost:8080/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(JSON.stringify(response));
                return Promise.reject(response);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    
}

function register(user) {
    
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}