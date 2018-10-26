const initialState={
    Data    :{
        Locations :""
    },
    loading : false,
    error   : null,
}

  const Location =(state = initialState,action)=>
{
    switch(action.type){
                              
         case  "Fetch_Location_Success": 
                                     return{
                                         error   : null,
                                         loading : false,
                                         Data    : action.payload
                                           }    
         case  "Fetch_Location_Failure": 
                                     return{
                                         error   : action.payload.Error,
                                         loading : false,
                                         Data    : []
                                            }
         default :
                   return state;                      

    }
}

export  default Location;