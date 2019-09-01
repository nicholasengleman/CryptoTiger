import * as actionTypes from "../actions/actionTypes";
import {updatedObject} from "../../utilities/utilities";


const initialState = {
    dataMenu: {
        open: false,
        column_id: "",
        timeframes: {
            hours: 18,
            days: 30,
            weeks: 52
        }
    }
};

const getPresets = (state, action) => {

}


const dataMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DATA_MENU:
            return toggleDataMenu(state, action);
        default:
            return state;
    }
};

export default presetReducer;
