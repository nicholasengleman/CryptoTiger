import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";

export function fetchCryptoData() {
    return dispatch => {
        dispatch(actionTypes.FETCH_CRYPTOS_BEGIN);
        return fetch("/products")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(actionTypes.FETCH_CRYPTOS_SUCCESS(json.cryptos));
                return json.cryptos;
            })
            .catch(error => dispatch(actionTypes.FETCH_CRYPTOS_FAILURE(error)));
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}



const initialState = {
    items: [],
    loading: false,
    error: null
}

const fetchCryptosBegin = (state, action) => {
    const updatedState = {
        loading: true,
        error: null
    };
    return updatedObject(state, updatedState);
}

const fetchCryptosSuccess = (state, action) => {
    const updatedState = {
        loading: false,
        items: action.payload.cryptos
    }
    return updatedObject(state, updatedState);
}

const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false,
        error: action.payload.error,
        items: []
    }
    return updatedObject(state, updatedState);
}

const cryptoData = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CRYPTOS_BEGIN:
            return fetchCryptosBegin(state, action);
        case actionTypes.FETCH_CRYPTOS_SUCCESS:
            return fetchCryptosSuccess(state, action);
        case actionTypes.FETCH_CRYPTOS_FAILURE:
            return fetchCryptosFailure(state, action);
        default:
            return state;
    }
}

export default cryptoData;