import React, {Component} from "react";

import styles from "./DataFilter.module.scss";
import Histoslider1 from "../../../Histoslider/Histoslider1";

class DataFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "in-between",
        };
    }


    handleFilterTypeChange = e => {
        this.setState({value: e.value});
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    Filter this data?
                    <span>X</span>
                </div>
                <div className={styles.body}>
                    <Histoslider1/>
                </div>
                <div className={styles.footer}>
                    <button className={styles.addFilter}>Add Filter</button>
                    <button className={styles.addFilter} onClick={this.props.handleAddWithoutFilter}>Add Without
                        Filter
                    </button>
                </div>
            </div>
        );
    }
}

export default DataFilter;
