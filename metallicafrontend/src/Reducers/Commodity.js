const initialState={
    Data    :{
        Commodities :""
    },
    loading : false,
    error   : null,
}

  const Commodity =(state = initialState,action)=>
{
    switch(action.type){ 

         case  "Fetch_Commodity_Success": 
                                     return{
                                         error   : null,
                                         loading : false,
                                         Data    : action.payload
                                           }    
         case  "Fetch_Commodity_Failure": 
                                     return{
                                         error   : action.payload.Error,
                                         loading : false,
                                         Data    : []
                                            }
         default :
                   return state;                      

    }
}


export  default Commodity;