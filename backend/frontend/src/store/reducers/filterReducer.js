import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";
import _ from "lodash";

const initialState = {
    filterParameters: []
};

const addFilter = (state, action) => {
    let newFilterParameters = _.cloneDeep(state.filterParameters);

    newFilterParameters.push({
        columnId: action.payload.columnId,
        parameters: action.payload.parameters
    });

    const updatedState = {
        filterParameters: newFilterParameters.length ? newFilterParameters : []
    };

    return updatedObject(state, updatedState);
};

const editFilter = (state, action) => {
    let newFilterParameters = _.cloneDeep(state.filterParameters);

    let indexOfFilter = newFilterParameters.findIndex(filter => {
        return filter.columnId === action.payload.columnId;
    });

    newFilterParameters[indexOfFilter] = {
        ...newFilterParameters[indexOfFilter],
        parameters: action.payload.parameters
    };

    const updatedState = {
        filterParameters: newFilterParameters
    };

    return updatedObject(state, updatedState);
};

const removeFilter = (state, action) => {
    let newFilterParameters = _.cloneDeep(state.filterParameters);

    let indexOfFilter = newFilterParameters.findIndex(filter => {
        return filter.columnId === action.payload.columnId;
    });

    if (indexOfFilter !== -1) {
        newFilterParameters.splice(indexOfFilter, 1);
    }

    const updatedState = {
        filterParameters: newFilterParameters
    };

    return updatedObject(state, updatedState);
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FILTER:
            return addFilter(state, action);
        case actionTypes.EDIT_FILTER:
            return editFilter(state, action);
        case actionTypes.REMOVE_FILTER:
            return removeFilter(state, action);
        default:
            return state;
    }
};

export default filterReducer;
