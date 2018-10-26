// Search  Action
var SearchValue = null;
export const FetchSearchData = (url, data) => {
    SearchValue=data;
    return (dispatch) => {
        dispatch(fetchProductsBegin());
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                data = json.map(trade => {
                    return {
                        Id: trade.Id,
                        Date: new Date(trade.Date).toUTCString(),
                        CommodityId: trade.CommodityId,
                        Commodity: trade.Commodity,
                        Side: trade.Side?"Sell":"Buy",
                        Price: trade.Price,
                        Quantity: trade.Quantity,
                        CounterPartyId: trade.CounterPartyId,
                        CounterParty: trade.CounterParty,
                        LocationId: trade.LocationId,
                        Location: trade.Location,

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
export const fetchProductsBegin = () => ({
    type: 'Fetch_Search_Begin'
});

export const fetchProductsSuccess = SearchData => ({
    type: 'Fetch_Search_Success',
    payload: { SearchData },
    SearchValue : SearchValue
});

export const fetchProductsFailure = error => ({
    type: 'Fetch_Search_Failure',
    payload: { Error }
});