const initialState={
    Data    : "",
    loginFailed : false,
    loading : false,
  

}

  const LoginReducer =(state = initialState,action)=>
{
    switch(action.type){                                
        
         case  "Verify_User_Begin": 
                                     return{
                                         //...state,
                                         Data    : "",
                                         loginFailed  : false,
                                         loading : true,
                                       
                                           }    
         case  "Verify_User_Success": 
                                     return{
                                         //...state,
                                         Data    : action.payload,
                                         loginFailed   : false,
                                         loading : false,
                                       
                                           } 
         case  "Verify_User_Failure": 
                                     return{
                                         ...state,
                                         loginFailed  : true,
                                         Data    : "",
                                         loading : false,
                                       
                                            }
                                 
         default :
                   return state;                      

    }
}


export  default LoginReducer;