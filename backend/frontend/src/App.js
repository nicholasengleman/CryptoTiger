import React, { Component } from "react";
import Homepage from "./Components/Homepage/Homepage";
import Header from "./Components/Header/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Homepage />
      </div>
    );
  }
}

export default App;
