import React, { Component } from "react";
import styles from "./CryptoHeader.module.scss";
import sort_icon from "./../../../../img/data_menu.png";
import { connect } from "react-redux";
import { dataMenuToggle } from "./../../../../store/actions/actionCreators";

class CryptoHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        onClick={() => this.props.onDataMenuToggle(this.props.id)}
        className={styles.column}
      >
        {this.props.name}
        <img className={styles.sort_icon} src={sort_icon} alt="" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDataMenuToggle: column_id => dispatch(dataMenuToggle(column_id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CryptoHeader);
