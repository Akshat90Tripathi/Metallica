// LiveMarket Fetch Action

export const FetchLiveMarketData = (url) => {
  return (dispatch) => {
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json));
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


export const fetchProductsSuccess = Livemarkets => ({
  type: 'Fetch_LiveMarket_Success',
  payload: { Livemarkets }
});

export const fetchProductsFailure = error => ({
  type: 'Fetch_LiveMarket_Failure',
  payload: { Error }
});


