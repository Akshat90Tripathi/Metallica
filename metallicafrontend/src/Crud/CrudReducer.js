const initialState={
    Data    :"",
    error   :true
}

  const PostTradeReducer =(state = initialState,action)=>
{
    switch(action.type){                                
         case  "Post_Trade_Success": 
                                     return{
                                         //...state,
                                         Data    : action.payload,
                                         error   : false
                                           }    
         case  "Post_Trade_Failure": 
                                     return{
                                         ...state,
                                         error   : true,
                                         Data    : "",
                                            }
         default :
                   return state;                      

    }
}


export  default PostTradeReducer;