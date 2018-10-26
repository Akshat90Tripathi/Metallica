
export const DeleteTrade = (url,TradeData) => {
    return (dispatch) => {
        return fetch(url, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(TradeData)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(res => {
                dispatch(DeleteTradeSuccess(res));
                return User;
            })
            .catch(error => dispatch(DeleteTradeFailure(error)));
    }
}

//Handle Api response
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error("Connection cant be made ");
    }
    return response;
}

export const DeleteTradeSuccess = User => (
    {
    type: 'Delete_Trade_Success',
    payload: { User },
    
});

export const DeleteTradeFailure = error => ({
    type: 'Delete_Trade_Failure',
    payload: { Error }
});


