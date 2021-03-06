
// Commodity Fetch Action

export const FetchCommodityData = (url) => {
    let data=[]
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

export const fetchProductsSuccess = Commodities => ({
    type: 'Fetch_Commodity_Success',
    payload: { Commodities }
});

export const fetchProductsFailure = error => ({
    type: 'Fetch_Commodity_Failure',
    payload: { Error }
});