import React, { Component} from "react";
import { connect } from "react-redux";
import Histoslider from "histoslider";

class Histoslider1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [1, 5]
        }
    }

    updateHistogramValues = (values) => {
        this.setState({ values });
    };

    render() {
        return (
            <Histoslider
                data={this.props.histogramData}
                width={700}
                padding={20}
                selection={this.state.values}
                onChange={array => this.updateHistogramValues(array)}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        histogramData: state.cryptoData.histogram_data
    };
};

export default connect(mapStateToProps)(Histoslider1);

