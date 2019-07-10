import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";

const initialState = {
    cryptosBasicData: [],
    cryptosNumberData: {},
    loading: false,
    error: null
};

const fetchCryptosBegin = (state, action) => {
    const updatedState = {
        loading: true,
        error: null
    };
    return updatedObject(state, updatedState);
};

const fetchCryptosSuccess = (state, action) => {

        const updatedState = {
            loading: false,
            cryptosBasicData: action.payload.data[0],
            cryptosNumberData: action.payload.data[1]
        };

        return updatedObject(state, updatedState);
    }
;

const fetchCryptosFailure = (state, action) => {
    const updatedState = {
        loading: false,
        error: true,
        cryptos: []
    };
    return updatedObject(state, updatedState);
};

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
};

export default cryptoData;
