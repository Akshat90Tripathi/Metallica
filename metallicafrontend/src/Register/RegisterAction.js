import { toast } from "react-toastify";

export const registerUser = (url,UserDetails) => {
    return (dispatch) => {
        return fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(UserDetails)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(User => {
                dispatch(RegisterUserSuccess(User));
                toast.success("Registered Successfully")
                return User;
            
            })
            .catch(error => {dispatch(RegisterUserFailure(error));toast.error("Username Already Exists")});
    }
}

//Handle Api response
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error("Connection cant be made ");
    }
    return response;
}

export const RegisterUserSuccess = User => ({
    type: 'Register_User_Success',
    payload: { User }
});

export const RegisterUserFailure = error => ({
    type: 'Register_User_Failure',
    payload: { Error }
});


