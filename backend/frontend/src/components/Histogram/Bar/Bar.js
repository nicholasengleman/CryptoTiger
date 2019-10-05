import React from "react";
import "./Bar.scss";

class Bar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.props.setBarLocation(
            this.props.index,
            this.ref.current.offsetLeft
        );

        window.addEventListener("resize", () => {
            this.props.setBarLocation(
                this.props.index,
                this.ref.current.offsetLeft
            );
        });
    }

    render() {
        return (
            <div
                style={{
                    height: this.props.height || 0,
                    marginBottom: this.props.marginBottom || 0,
                    marginTop: this.props.marginTop || 0,
                    backgroundColor: this.props.backgroundColor,
                    width: this.props.width
                }}
                className={`bar ${[this.props.directionalClass]}`}
                ref={this.ref}
            >
                <div className="tooltip">
                    <p>{this.props.tooltip && this.props.tooltip.name}</p>
                    <p>{this.props.tooltip && this.props.tooltip.value}%</p>
                    <div className="tooltipArrow"></div>
                </div>
            </div>
        );
    }
}

export default Bar;
