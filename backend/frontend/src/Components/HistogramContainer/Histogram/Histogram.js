import React, { Component } from "react";
import Slider from "./Slider/Slider";
import Bar from "./Bar/Bar";

import "./histogram-styles.css";

const defaultProps = {
    barMargin: 0.75,
    data: [
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: -3
        },
        {
            value: 1
        },
        {
            value: 2
        },
        {
            value: -10
        },
        {
            value: 11
        },
        {
            value: -5
        },
        {
            value: 7
        }
    ],
    getBoundries: function(e) {}
};

class Histogram extends Component {
    constructor(props) {
        super(props);

        this.histogram = React.createRef();
        this.ref = {};

        this.state = {
            normalizedData: [],

            barWidth: 0.5,
            computedBarWidth: 0,

            barMinLocation: 0,
            barMaxLocation: 0,

            sliderContainerWidth: 0,
            sliderContainerLeftPosition: 0,
            sliderContainerRightPosition: 0,

            inputFocus: false,
            leftInputValue: 0,
            rightInputValue: 0,
            attachAnimationClasses: true
        };

        this.dataSetMinValue = 0;
        this.dataSetMaxValue = 0;
        this.buttonWidth = 25.125;
        this.leftButtonAdjustment = 50;
        this.rightButtonAdjustment = -this.buttonWidth;
        this.barLocations = [];
    }

    componentWillMount() {
        this.dataSetMinValue = this.findMinValue(this.props.data);
        this.dataSetMaxValue = this.findMaxValue(this.props.data);
    }

    componentDidMount() {
        this.normalizeData(this.props.data);
        this.calculateBarWidth(this.props.data);

        for (let e = 0; e < this.props.data.length; e++) {
            this.ref = {
                ...this.ref,
                [`ref_${e}`]: React.createRef()
            };
        }

        let that = this;
        window.addEventListener("resize", function() {
            that.findBarLocations();
            that.calculateBarWidth();
        });
    }

    componentDidUpdate(prevProps) {
        if (this.ref.ref_0.current && this.barLocations.length === 0) {
            this.findBarLocations();
        }

        if (prevProps.data !== this.props.data) {
            for (let e = 0; e < this.props.data.length; e++) {
                this.ref = {
                    ...this.ref,
                    [`ref_${e}`]: React.createRef()
                };
            }

            this.barLocations.length = 0;
            this.findBarLocations();

            if (this.ref.ref_0.current) {
                this.setState({ computedBarWidth: this.ref.ref_0.current.offsetWidth });
            }

            this.dataSetMinValue = this.findMinValue(this.props.data);
            this.dataSetMaxValue = this.findMaxValue(this.props.data);
            this.calculateBarWidth(this.props.data);
            this.normalizeData(this.props.data);

            if (this.props.buttonPresets) {
                this.setState({
                    leftInputValue: this.props.buttonPresets.parameters.selectionMin,
                    rightInputValue: this.props.buttonPresets.parameters.selectionMax
                });
                this.findLeftBarFromInput(Number(this.props.buttonPresets.parameters.selectionMin));
                this.findRightBarFromInput(Number(this.props.buttonPresets.parameters.selectionMax));
            } else {
                if (this.state.sliderContainerWidth !== 0) {
                    this.setState({
                        barMinLocation: 0,
                        barMaxLocation: this.state.sliderContainerWidth - this.buttonWidth
                    });
                }
            }
        }
    }

    findBarLocations = () => {
        for (let ref in this.ref) {
            if (this.ref[ref].current) {
                this.barLocations.push(this.ref[ref].current.offsetLeft);
            }
        }
        this.forceUpdate();
    };

    getBoundries = () => {
        let selection = {
            selectionMin: parseFloat(this.state.leftInputValue),
            selectionMax: parseFloat(this.state.rightInputValue)
        };
        this.props.getBoundries(selection);
    };

    normalizeData = data => {
        let normalizedData = [],
            normalizedValue;

        //sort the data
        let sortedData = data.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            } else if (a.value > b.value) {
                return 1;
            } else {
                return 0;
            }
        });

        //normalize the data
        if (this.dataSetMinValue < 0 && this.dataSetMaxValue > 0) {
            normalizedValue =
                (this.histogram.current.offsetHeight - 2) /
                (Math.abs(this.dataSetMaxValue) + Math.abs(this.dataSetMinValue));
        } else if (this.dataSetMinValue > 0) {
            normalizedValue = (this.histogram.current.offsetHeight - 2) / Math.abs(this.dataSetMaxValue);
        } else if (this.dataSetMaxValue < 0) {
            normalizedValue = (this.histogram.current.offsetHeight - 2) / Math.abs(this.dataSetMinValue);
        }

        sortedData.forEach(data => {
            normalizedData.push({
                ...data,
                normalizedValue: normalizedValue * data.value
            });
        });

        this.setState({
            normalizedData,
            leftInputValue: normalizedData[0].value,
            rightInputValue: normalizedData[normalizedData.length - 1].value
        });
    };

    //////////////////////////////////////
    // Utility Functions
    ///////////////////////////////////
    calculateBarWidth = () => {
        let histogramWidth = this.histogram.current.offsetWidth - 2;

        let barWidth = histogramWidth / this.props.data.length - this.props.barMargin * 2;
        this.setState({ barWidth });
    };

    findMaxValue = data => {
        let max = -9999999999999999999999999999999999999;
        data.forEach(data => {
            if (data.value > max) {
                max = data.value;
            }
        });
        return max;
    };

    findMinValue = data => {
        let min = 99999999999999999999999999999999999999;
        data.forEach(data => {
            if (data.value < min) {
                min = data.value;
            }
        });
        return min;
    };

    getSliderBarDimensions = (sliderContainerWidth, sliderContainerRightPosition, sliderContainerLeftPosition) => {
        this.setState({
            sliderContainerWidth,
            sliderContainerRightPosition,
            sliderContainerLeftPosition,
            barMinLocation: 0,
            barMaxLocation: sliderContainerWidth - this.buttonWidth
        });
    };

    /////////////////////////////////////////////
    //  Functions for handling state change via input boxes
    ///////////////////////////////////////////////
    handleInputFocus = e => {
        let name;
        if (e.target) {
            name = e.target.name;
        } else {
            name = "";
        }
        this.setState(prevState => ({
            inputFocus: !prevState.inputFocus,
            input_with_focus: name
        }));
    };

    handleLeftInput = e => {
        this.setState({ leftInputValue: e.target.value }, () => this.getBoundries());
        this.findLeftBarFromInput(e.target.value);
    };

    findLeftBarFromInput = input => {
        let index = this.state.normalizedData.findIndex(el => {
            return el.value >= input;
        });

        if (index !== -1) {
            this.setState({ barMinLocation: this.barLocations[index] });
        }
    };

    handleRightInput = e => {
        this.setState({ rightInputValue: e.target.value }, () => this.getBoundries());
        console.log("fired");
        this.findRightBarFromInput(e.target.value);
    };

    findRightBarFromInput = input => {
        let index = 0;
        for (let i = this.state.normalizedData.length - 1; i > 0; i--) {
            if (this.state.normalizedData[i].value <= input) {
                index = i;
                break;
            }
        }

        if (index !== 0) {
            this.setState({ barMaxLocation: this.barLocations[index] });
        }
    };

    /////////////////////////////////////////////
    // sets position_min and position_max from mouse movement
    //////////////////////////////////////////////
    findInputValueFromButtonLocation = (mouse_location, bar_id) => {
        let index = 0;

        if (bar_id === "Min") {
            index = this.barLocations.findIndex(el => {
                return mouse_location - this.buttonWidth <= el;
            });

            if (index === -1) {
                index = 0;
            }
        } else {
            for (let i = this.barLocations.length; i > 0; i--) {
                if (mouse_location - this.buttonWidth >= this.barLocations[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (this.state.normalizedData[index]) {
            return this.state.normalizedData[index].value;
        } else {
            return this.state.normalizedData[this.state.normalizedData.length - 1].value;
        }
    };

    handleButtonMovement = ({ clientX }, btn_id) => {
        if (this.state.normalizedData.length > 0) {
            if (
                this.state.sliderContainerLeftPosition + this.buttonWidth / 2 < clientX &&
                clientX < this.state.sliderContainerRightPosition - this.buttonWidth / 2
            ) {
                if (btn_id === "Min") {
                    this.setState(
                        {
                            barMinLocation: clientX - this.state.sliderContainerLeftPosition - this.buttonWidth / 2,
                            leftInputValue: this.findInputValueFromButtonLocation(
                                clientX - this.state.sliderContainerLeftPosition,
                                btn_id
                            )
                        },
                        () => this.getBoundries()
                    );
                } else {
                    this.setState(
                        {
                            barMaxLocation: clientX - this.state.sliderContainerLeftPosition - this.buttonWidth / 2,
                            rightInputValue: this.findInputValueFromButtonLocation(
                                clientX - this.state.sliderContainerLeftPosition,
                                btn_id
                            )
                        },
                        () => this.getBoundries()
                    );
                }
            } else if (clientX < this.state.sliderContainerLeftPosition + this.buttonWidth / 2) {
                this.setState({ [`bar${btn_id}Location`]: 0 });
            } else if (this.state.sliderContainerRightPosition - this.buttonWidth < clientX) {
                this.setState({
                    [`bar${btn_id}Location`]: this.state.sliderContainerWidth - this.buttonWidth
                });
            }
        }
    };

    barContainerVerticalAdjust = () => {
        if (this.state.normalizedData.length > 0) {
            let adjustment = 0;

            if (this.dataSetMinValue < 0 && this.dataSetMaxValue > 0) {
                adjustment = Math.abs(this.state.normalizedData[0].normalizedValue);
            }

            if (this.dataSetMaxValue < 0) {
                adjustment = Math.abs(this.state.normalizedData[0].normalizedValue);
            }

            let diff = this.histogram.current.offsetHeight - 2 - adjustment;
            return `${diff}px`;
        }
    };

    render() {
        let scaleStep = (parseInt(this.dataSetMaxValue) - parseInt(this.dataSetMinValue)) / 4;
        let scaleSteps = [parseInt(this.dataSetMinValue)];
        for (let i = 1; i <= 4; i++) {
            scaleSteps.push(parseInt(scaleSteps[i - 1] + scaleStep));
        }
        return (
            <div className="histogramComponent">
                <div className="scaleContainer">
                    {scaleSteps.map(step => {
                        return (
                            <div key={Math.random()} className="scale-step">
                                {step}%
                            </div>
                        );
                    })}
                </div>

                <div className="mainSection">
                    <div ref={this.histogram} className="histogram">
                        <div className="bar-container" style={{ marginTop: this.barContainerVerticalAdjust() }}>
                            {this.state.normalizedData.map((bar, index) => {
                                let barMarginTop, barMarginBottom, color, barHeight, directionalClass;
                                if (bar.normalizedValue > 0) {
                                    barMarginTop = 0;
                                    barMarginBottom = Math.abs(bar.normalizedValue);
                                } else {
                                    barMarginTop = Math.abs(bar.normalizedValue);
                                    barMarginBottom = 0;
                                }

                                if (
                                    this.state.barMinLocation <=
                                        this.barLocations[index] + this.buttonWidth - this.buttonWidth / 2 &&
                                    this.barLocations[index] + this.buttonWidth - this.buttonWidth / 2 <=
                                        this.state.barMaxLocation - this.state.barWidth
                                ) {
                                    if (bar.normalizedValue > 0) {
                                        color = "green";
                                    } else {
                                        color = "red";
                                    }
                                } else {
                                    color = "lightgrey";
                                }

                                if (Math.abs(bar.normalizedValue) < 1) {
                                    barHeight = 1;
                                } else {
                                    barHeight = Math.abs(bar.normalizedValue);
                                }

                                // if (this.state.attachAnimationClasses) {
                                //     if (color === "green") {
                                //         directionalClass = "positiveBar";
                                //     } else {
                                //         directionalClass = "negativeBar";
                                //     }
                                // }

                                return (
                                    <Bar
                                        key={index}
                                        height={barHeight}
                                        marginBottom={barMarginBottom}
                                        marginTop={barMarginTop}
                                        backgroundColor={color}
                                        width={this.state.barWidth}
                                        ref={this.ref[`ref_${index}`]}
                                        tooltip={bar.tooltip}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <Slider
                        getSliderBarDimensions={this.getSliderBarDimensions}
                        sliderContainerWidth={this.state.sliderContainerWidth}
                        sliderContainerLeftPosition={this.state.sliderContainerLeftPosition}
                        sliderContainerRightPosition={this.state.sliderContainerRightPosition}
                        handleButtonMovement={this.handleButtonMovement}
                        buttonLeft={this.state.barMinLocation}
                        buttonRight={this.state.barMaxLocation}
                    />
                    <div className="input-section">
                        <div
                            className={`input-container ${
                                this.state.input_with_focus === "left_boundry" ? "selected" : ""
                            }`}
                        >
                            <input
                                name="left_boundry"
                                min="-999"
                                max="999"
                                onChange={e => this.handleLeftInput(e)}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputFocus}
                                value={
                                    !this.state.inputFocus && !isNaN(this.state.leftInputValue)
                                        ? parseInt(this.state.leftInputValue)
                                        : undefined
                                }
                                type="number"
                            />
                            %
                        </div>
                        to
                        <div
                            className={`input-container ${
                                this.state.input_with_focus === "right_boundry" ? "selected" : ""
                            }`}
                        >
                            <input
                                name="right_boundry"
                                min="-999"
                                max="999"
                                onChange={e => this.handleRightInput(e)}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputFocus}
                                value={
                                    !this.state.inputFocus && !isNaN(this.state.rightInputValue)
                                        ? parseInt(this.state.rightInputValue)
                                        : undefined
                                }
                                type="number"
                            />
                            %
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Histogram.defaultProps = defaultProps;

export default Histogram;