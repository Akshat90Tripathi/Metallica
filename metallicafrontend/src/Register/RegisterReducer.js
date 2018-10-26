const initialState={
    Data    :"",
    error   :false
}

  const RegisterReducer =(state = initialState,action)=>
{
    switch(action.type){                                
         case  "Register_User_Success": 
                                     return{
                                         ...state,
                                         Data    : action.payload,
                                         error   : false
                                           }    
         case  "Register_User_Failure": 
                                     return{
                                         ...state,
                                         error   : true,
                                         Data    : ""
                                            }
         default :
                   return state;                      

    }
}


export  default RegisterReducer;