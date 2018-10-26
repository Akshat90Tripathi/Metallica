// LiveMarket Fetch Action

export const FetchCounterPartyData = (url) => {
  let data=[];
    return (dispatch) => {
      return fetch(url)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          data = json.map(commodity => {
            return {
                value: commodity.Id,
                label: commodity.Description
            };
        });
          dispatch(fetchProductsSuccess(data));
          return json.products;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    }
  }
  
  //Handle Api response
  const handleErrors = (response) => {
    if (!response.ok) {
      throw Error("Connection cant be made ");
    }
    return response;
  }
 
  export const fetchProductsSuccess = Counterparties => ({
    type: 'Fetch_CounterParty_Success',
    payload: { Counterparties }
  });
  
  export const fetchProductsFailure = error => ({
    type: 'Fetch_CounterParty_Failure',
    payload: { Error }
  });
  
  
  