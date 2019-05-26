import * as actionTypes from "./actionTypes";

// action creators
export const dataMenuToggle = column_id => {
  return {
    type: actionTypes.DATA_MENU_TOGGLE,
    column_id: column_id
  };
};

export const changeColumnDataID = data_id => {
  return {
    type: actionTypes.CHANGE_COLUMN_DATA,
    data_id: data_id
  };
};
