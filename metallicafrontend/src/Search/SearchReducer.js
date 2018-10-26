const initialState={
    Data    :"",
    loading : false,
    error   : null,
    SearchValue:null
}

  const Trade =(state = initialState,action)=>
{
    switch(action.type){
         case  "Fetch_Search_Begin" :
                                     return{
                                        ...state,
                                        error   :null,
                                        loading : true,
                                        Data    : []
                                        
                                         }                                
         case  "Fetch_Search_Success": 
                                     return{
                                         ...state,
                                         error   : null,
                                         loading : false,
                                         Data    : action.payload,
                                         SearchValue:action.SearchValue
                                           }    
         case  "Fetch_Search_Failure": 
                                     return{
                                         ...state,
                                         error   : action.payload.Error,
                                         loading : false,
                                         Data    : []
                                            }
         default :
                   return state;                      

    }
}


export  default Trade;