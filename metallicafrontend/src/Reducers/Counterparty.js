const initialState={
    Data    :{
        Counterparties :""
    },
    loading : false,
    error   : null,
}

  const Counterparty =(state = initialState,action)=>
{
    switch(action.type){

         case  "Fetch_CounterParty_Success": 
                                     return{
                                         error   : null,
                                         loading : false,
                                         Data    : action.payload
                                           }    
         case  "Fetch_CounterParty_Failure": 
                                     return{
                                         error   : action.payload.Error,
                                         loading : false,
                                         Data    : []
                                            }
         default :
                   return state;                      

    }
}

export default Counterparty;