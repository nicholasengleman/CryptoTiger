import React, { Component } from "react";
import styles from "./CryptoHeader.module.scss";
import sort_icon from "./../../../../img/data_menu.png";

class CryptoHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        onClick={() => this.props.handleDataMenuToggle(this.props.id)}
        className={styles.column}
      >
        {this.props.name}
        <img className={styles.sort_icon} src={sort_icon} alt="" />
      </div>
    );
  }
}

export default CryptoHeader;
