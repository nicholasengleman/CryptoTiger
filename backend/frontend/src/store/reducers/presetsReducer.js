import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utilities/utilities";

const initialState = {
    presets: [
        {
            id: 1,
            name: "CryptoTiger",
            rating: "70%",
            columns: [
                {
                    description: "5 HR",
                    time: 3600 * 5 * 24,
                    filter: [],
                    columnIndex: 1,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 5,
                    columnName: "5 Day Price"
                },
                {
                    description: "10 HR",
                    time: 3600 * 10 * 24,
                    filter: [],
                    columnIndex: 2,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 10,
                    columnName: "10 Day Price"
                }
            ]
        },
        {
            id: 2,
            name: "Crypto",
            rating: "70%",
            columns: [
                {
                    description: "1 HR",
                    time: 3600 * 5 * 24,
                    filter: [],
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 5,
                    columnName: "5 Day Price"
                }
            ]
        },
        {
            id: 3,
            name: "CryptoTiger",
            rating: "20%",
            columns: [
                {
                    description: "1 HR",
                    time: 3600 * 5 * 24,
                    filter: []
                }
            ]
        }
    ]
};

const presetReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default presetReducer;
