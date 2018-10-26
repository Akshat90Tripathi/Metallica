
export const PostTrade = (url,Trade) => {
    return (dispatch) => {
        return fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Trade)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(Trade => {
                dispatch(PostTradeSuccess(Trade));
                return Trade;
            })
            .catch(error => dispatch(PostTradeFailure(error)));
    }
}

export const UpdateTrade = (url,Trade) => {
    return (dispatch) => {
        return fetch(url, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(Trade)
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(Trade => {
                dispatch(PostTradeSuccess(Trade));
                return Trade;
            })
            .catch(error => dispatch(PostTradeFailure(error)));
    }
}

export const DeleteTrade = (url) => {
    return (dispatch) => {
        return fetch(url, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        })
            .then(handleErrors)
            .then(res => res.json())
            .then(Trade => {
                dispatch(PostTradeSuccess(Trade));
                return Trade;
            })
            .catch(error => dispatch(PostTradeFailure(error)));
    }
}


//Handle Api response
const handleErrors = (response) => {
    if (!response.ok) {
        throw Error("Connection cant be made ");
    }
    return response;
}

export const PostTradeSuccess = Trade => ({
    type: 'Post_Trade_Success',
    payload: { Trade },
    
});

export const PostTradeFailure = error => ({
    type: 'Post_Trade_Failure',
    payload: { Error }
});


