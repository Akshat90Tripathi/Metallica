import { toast } from 'react-toastify'
export const VerifyUser = (url,credentials) => {
    return (dispatch) => {
        dispatch(VerifyUserBegin())
        return fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(User => {
                setTimeout(()=>{dispatch(VerifyUserSuccess(User))},2000)
                toast.success("Login Successful!")   
                return User;
            })                
            .catch(error =>{ dispatch(VerifyUserFailure(error)) ;toast.error("Login Failed!")});
    }
}

//Handle Api response
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error("Connection cant be made ");
    }
    return response;
}
const VerifyUserBegin = User => {
 return{
    type: 'Verify_User_Begin',
}
};

const VerifyUserSuccess = User => {
      sessionStorage.setItem("Allow",'true')
      sessionStorage.setItem("UserName",User[0].UserName);
      sessionStorage.setItem("UserId",User[0].Id);
    return  {
    type: 'Verify_User_Success',
    payload : { User },
    }

};

 const VerifyUserFailure = error => (
     {
    type: 'Verify_User_Failure',
    error: { Error }
});


