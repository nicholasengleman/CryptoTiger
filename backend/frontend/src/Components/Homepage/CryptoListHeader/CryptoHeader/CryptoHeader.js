import React, {Component} from "react";
import styles from "./CryptoHeader.module.scss";
import sort_icon from "../../../../img/data_menu.png";
import {connect} from "react-redux";
import { processDataFromStoreForHistogram, toggleDataMenu} from "../../../../store/actions/actionCreators";

class CryptoHeader extends Component {

    onToggleDataMenu = columnName => {
        this.props.processDataFromStoreForHistogram(columnName);
        this.props.toggleDataMenu(columnName);
    };


    render() {
        return (
            <div
                onClick={() => this.onToggleDataMenu(this.props.column_name)}
                className={styles.column}
            >
                {this.props.column_name}
                <img className={styles.sort_icon} src={sort_icon} alt=""/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDataMenu: (current_column_name) => dispatch(toggleDataMenu(current_column_name)),
        processDataFromStoreForHistogram: (current_column_name) => dispatch(processDataFromStoreForHistogram(current_column_name))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CryptoHeader);
