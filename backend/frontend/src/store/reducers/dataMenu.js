import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../utilities/utilities";

const initialState = {
  columns: [],
  dataMenu: {
    open: false,
    column_id: ""
  }
};

const loadInitialColumnData = (state, action) => {
  let columns_processed = [];
  let id;

  action.payload.data.forEach(function(item) {
    if (!id) {
      id = item.crypto_id;
    }
    if (id == item.crypto_id) {
      let data = {
        data_id: [item.data_id],
        data_name: [item.data_name],
        data_period_type: [item.data_period_type],
        data_period: [item.data_period],
        data_type: [item.data_type]
      };
      columns_processed.push(data);
    }
  });

  const updatedState = {
    columns: columns_processed
  };
  return updatedObject(state, updatedState);
};

const toggleDataMenu = (state, action) => {
  let menu_state = "";
  if (state.dataMenu.column_id === action.column_id) {
    menu_state = !state.dataMenu.open;
  } else {
    menu_state = true;
  }
  const updatedState = {
    dataMenu: {
      open: menu_state,
      column_id: action.column_id
    }
  };
  return updatedObject(state, updatedState);
};

const closeDataMenu = (state, action) => {
  const updatedState = {
    dataMenu: {
      open: false,
      column_id: 0
    }
  };

  return updatedObject(state, updatedState);
};

const changeColumnData = (state, action) => {
  const columns = [...state.columns];
  let dataMenu = { ...state.dataMenu };

  columns.forEach(function(column) {
    if (column.data_id === state.dataMenu.column_id) {
      column.data_id = action.data_id;
      dataMenu.column_id = action.data_id;
    }
  });

  const updatedState = {
    columns,
    dataMenu
  };

  return updatedObject(state, updatedState);
};

const dataMenu = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DATA_MENU:
      return toggleDataMenu(state, action);
    case actionTypes.CLOSE_DATA_MENU:
      return closeDataMenu(state, action);
    case actionTypes.CHANGE_COLUMN_DATA:
      return changeColumnData(state, action);
    case actionTypes.LOAD_INITIAL_COLUMN_DATA:
      return loadInitialColumnData(state, action);
    default:
      return state;
  }
};

export default dataMenu;
