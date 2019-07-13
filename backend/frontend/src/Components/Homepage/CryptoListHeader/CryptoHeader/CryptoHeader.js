import React, { Component } from "react";
import styles from "./CryptoHeader.module.scss";
import sort_icon from "../../../../img/data_menu.png";
import { connect } from "react-redux";
import { toggleDataMenu } from "../../../../store/actions/actionCreators";

class CryptoHeader extends Component {
  render() {
    return (
      <div
        onClick={() => this.props.onToggleDataMenu(this.props.column_name)}
        className={styles.column}
      >
        {this.props.column_name}
        <img className={styles.sort_icon} src={sort_icon} alt="" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleDataMenu: (column_name) => dispatch(toggleDataMenu(column_name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CryptoHeader);
