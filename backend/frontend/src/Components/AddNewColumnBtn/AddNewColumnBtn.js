import React, { Component } from "react";
import styles from "./AddNewColumnBtn.module.scss";
import { toggleDataMenu, emptyHistogramData, processNewColumnData } from "../../store/actions/actionCreators";
import { connect } from "react-redux";
import axios from "axios";

class AddNewColumnBtn extends Component {
    handleClick = () => {
        this.props.emptyHistogramData();
        this.props.onSetSelectedTimeframe("1 Hour Price");

        axios
            .get(`http://localhost:5000/api/crypto-data/getColumnData/3600`)
            .then(response => {
                this.props.processNewColumnData("1 Hour Price", response.data);
            })
            .catch(error => {
                console.log("[Error]", error);
            });

        this.props.onToggleDataMenu();
    };

    render() {
        return (
            <button
                className={styles.btn_add_new}
                // onClick={() => this.handleClick()}
            >
                Add
            </button>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleDataMenu: () => dispatch(toggleDataMenu()),
        // onSetSelectedTimeframe: (timeframe) => dispatch(setSelectedTimeframe(timeframe)),
        emptyHistogramData: () => dispatch(emptyHistogramData()),
        processNewColumnData: (new_timeframe_name, new_column_data) => dispatch(processNewColumnData(new_timeframe_name, new_column_data))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AddNewColumnBtn);
