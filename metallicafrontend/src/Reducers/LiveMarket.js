const initialState={
    Data    :  [],
    loading : false,
    error   : null,
}

  const LiveMarket =(state = initialState,action)=>
{
    switch(action.type){                        
         case  "Fetch_LiveMarket_Success": 
                                     return{
                                         error   : null,
                                         loading : true,
                                         Data    : action.payload
                                           }    
         case  "Fetch_LiveMarket_Failure": 
                                     return{
                                         error   : action.payload.Error,
                                         loading : false,
                                         Data    : []
                                            }
         default :
                   return state;                      

    }
}

export  default LiveMarket;