import axios from "axios";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const SIGNUP = "SIGNUP";


//target action
export function submitLogin(data) {
    return function (dispatch) {
        console.log('Inside Action');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTH_LOGIN,
                        payload: true
                    });

                }
            })
            .catch((err) => {
                if (err) {
                    if (err.response.status === 401) {
                        console.log('inside res status 401', err.response.status);
                        dispatch({
                            type: AUTH_LOGIN,
                            payload: false
                        });                        
                    }
                }

            });
    }
}




export function signup(data) {
    return function (dispatch) {
        console.log('Inside Signup');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/signup', data)
            .then(response => {

                if (response.status === 200) {
                    var result = {
                        isNewUserCreated: true
                    }

                    dispatch({
                        type: SIGNUP,
                        payload: result
                    });
                }
            })
            .catch((err) => {
                console.log('Error Occured!');
                var result = {
                    errorRedirect: true
                }

                dispatch({
                    type: SIGNUP,
                    payload: result
                });
            });

    }
}