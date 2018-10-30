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
            .then(res=>handleErrors(res))
            .then(res => res.json())
            .then(User => {
                dispatch(RegisterUserSuccess(User));
                if(User.result==="Username Already Exists")
                toast.error(User.result)
                else
                toast.success(User.result)
                return User;
            
            })
            .catch(error => {dispatch(RegisterUserFailure(error));console.log(error)});
    }
}

//Handle Api response
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response);
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


