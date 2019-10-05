import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";
import _ from "lodash";

const initialDtate = {
    selectedColumnId: 0,
    selectedPeriod: {
        dataType: "price",
        dataGroup: "hour",
        dataPeriod: "1",
        dataName: "1 hour price"
    }
};
//////////////////////
/// Processes Data for Histogram when a Column Header is clicked
/////////////////////
const setSelectedDataType = (state, action) => {
    const updatedState = {
        selectedPeriod: {
            ...state.selectedPeriod,
            dataType: action.payload.dataType
        }
    };
    return updatedObject(state, updatedState);
};

const setSelectedDataGroup = (state, action) => {
    const updatedState = {
        selectedPeriod: {
            ...state.selectedPeriod,
            dataGroup: action.payload.dataGroup
        }
    };
    return updatedObject(state, updatedState);
};

const setSelectedDataPeriod = (state, action) => {
   const updatedState = {
        selectedPeriod: {
            ...state.selectedPeriod,
            dataPeriod: action.payload.dataPeriod
        }
    };
    return updatedObject(state, updatedState);
};

const setSelectedDataName = (state, action) => {
    const updatedState = {
        selectedPeriod: {
            ...state.selectedPeriod,
            dataName: action.payload.dataName
        }
    };
    return updatedObject(state, updatedState);
};

const setSelectedColumnId = (state, action) => {
    const updatedState = {
        selectedColumnId: action.payload.columnId
    };
    return updatedObject(state, updatedState);
};

const removeSelectedColumnId = (state, action) => {
    const updatedState = {
        selectedColumnId: 0
    };
    return updatedObject(state, updatedState);
};

const selectedDataReducer = (state = initialDtate, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_DATA_TYPE:
            return setSelectedDataType(state, action);
        case actionTypes.SET_SELECTED_DATA_GROUP:
            return setSelectedDataGroup(state, action);
        case actionTypes.SET_SELECTED_DATA_PERIOD:
            return setSelectedDataPeriod(state, action);
        case actionTypes.SET_SELECTED_DATA_NAME:
            return setSelectedDataName(state, action);

        case actionTypes.SET_SELECTED_COLUMN_ID:
            return setSelectedColumnId(state, action);
        case actionTypes.REMOVE_SELECTED_COLUMN_ID:
            return removeSelectedColumnId(state, action);
        default:
            return state;
    }
};

export default selectedDataReducer;
