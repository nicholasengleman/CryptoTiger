const initialState = {
    presets: [
        {
            id: 1,
            name: "Blue River",
            rating: "63%",
            columns: [
                {
                    description: "5 Day(-10% to 20%)",
                    time: 3600 * 5 * 24,
                    filter: [-10, 20],
                    columnIndex: 1,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 5,
                    columnName: "5 Day Price"
                },
                {
                    description: "10 Day",
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
            name: "Green Mountain",
            rating: "32%",
            columns: [
                {
                    description: "1 HR(-50% to 50%)",
                    time: 3600 * 1 * 1,
                    filter: [-50, 50],
                    columnIndex: 1,
                    columnType: "price",
                    columnGroup: "hour",
                    columnPeriod: 1,
                    columnName: "1 Hour Price"
                },
                {
                    description: "3 HR",
                    time: 3600 * 3 * 1,
                    filter: [],
                    columnIndex: 2,
                    columnType: "price",
                    columnGroup: "hour",
                    columnPeriod: 3,
                    columnName: "3 Hour Price"
                },
                {
                    description: "3 Day",
                    time: 3600 * 3 * 24,
                    filter: [],
                    columnIndex: 3,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 3,
                    columnName: "3 Day Price"
                },
                {
                    description: "7 Day(0% to 200%)",
                    time: 3600 * 7 * 24,
                    filter: [0, 200],
                    columnIndex: 4,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 7,
                    columnName: "7 Day Price"
                }
            ]
        },
        {
            id: 3,
            name: "Red City",
            rating: "82%",
            columns: [
                {
                    description: "12 HR",
                    time: 3600 * 12 * 1,
                    filter: [],
                    columnIndex: 1,
                    columnType: "price",
                    columnGroup: "hour",
                    columnPeriod: 12,
                    columnName: "12 Hour Price"
                },
                {
                    description: "2 Day",
                    time: 3600 * 2 * 24,
                    filter: [],
                    columnIndex: 2,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 2,
                    columnName: "2 Day Price"
                },
                {
                    description: "7 Day(-100% to 100%)",
                    time: 3600 * 7 * 24,
                    filter: [-100, 100],
                    columnIndex: 3,
                    columnType: "price",
                    columnGroup: "day",
                    columnPeriod: 7,
                    columnName: "7 Day Price"
                },
                {
                    description: "2 Week",
                    time: 3600 * 14 * 24,
                    filter: [],
                    columnIndex: 4,
                    columnType: "price",
                    columnGroup: "week",
                    columnPeriod: 2,
                    columnName: "2 Week Price"
                },
                {
                    description: "4 Week",
                    time: 3600 * 28 * 24,
                    filter: [],
                    columnIndex: 5,
                    columnType: "price",
                    columnGroup: "week",
                    columnPeriod: 4,
                    columnName: "4 Week Price"
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
