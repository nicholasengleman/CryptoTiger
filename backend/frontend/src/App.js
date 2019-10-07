import React, { Component } from "react";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";

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
