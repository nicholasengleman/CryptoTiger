import React from "react";
import styles from "./MainSectionContainer.module.scss";

const MainSectionContainer = props => {
  return <div className={styles.sectionContainer}>{props.children}</div>;
};

export default MainSectionContainer;
