import React, {Component} from "react";
import Select from 'react-select'

import styles from "./DataFilter.module.scss";

class DataFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "in-between",
        };
    }



    numberView = (filtertype) => {
        switch (filtertype) {
            case'in-between':
                return (
                    <div className={styles.numberInputContainer}>
                        <input className={styles.numberInput} type="number" id="lower_bound_number" max="999999" onChange={this.props.handleFilterNumberChange} value={this.state.lower_bound_number}/>
                        <span className={styles.connectingWords} >and</span>
                        <input className={styles.numberInput} type="number" id="higher_bound_number" max="999999" onChange={this.props.handleFilterNumberChange}  value={this.state.higher_bound_number}/>
                    </div>
                );
            case'greater-than':
                return (
                    <div className={styles.numberInputContainer}>
                        <input className={styles.numberInput} type="number" id="lower_bound_number" onChange={this.props.handleFilterNumberChange}  value={this.state.lower_bound_number}/>
                    </div>
                );
            case'less-than':
                return (
                    <div className={styles.numberInputContainer}>
                        <input className={styles.numberInput} type="number" id="higher_bound_number" onChange={this.props.handleFilterNumberChange}  value={this.state.higher_bound_number}/>
                    </div>
                );
            default:
                return (<span>nothing matches</span>);
        }
    }

    render() {

        const options = [
            {value: 'in-between', label: 'in between'},
            {value: 'greater-than', label: 'greater than'},
            {value: 'less-than', label: 'less than'}
        ];

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? 'white' : 'black'
            }),
            control: (provided) => ({
                ...provided,
                // none of react-select's styles are passed to <Control />
                width: 150,
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                borderBottom: '1px solid #b1b1b1',
                outline: 'none',
                borderRadius: 'none'
            }),
            indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none'
            }),
            menu: (provided) => ({
                ...provided,
                width: 150,
                borderRadius: 'none',
                top: '30px',
                padding: 0,
                backgroundColor: "lightGrey"
            }),
            placeholder: (provided) => ({
                ...provided,
                color: 'white'
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';
                const color = 'white';

                return {...provided, opacity, transition, color};
            }
        };

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    Add filter to this data?
                    <span>X</span>
                </div>
                <div className={styles.body}>
                    <p className={styles.description}>Include data where price is:</p>
                    <div className={styles.filterContainer}>
                        <Select options={options} styles={customStyles}
                                onChange={this.props.handleFilterTypeChange}
                                defaultValue={{ label: "in between", value: "in-between" }}/>
                        {this.numberView(this.state.value)}
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.addFilter}>Add Filter</button>
                    <button className={styles.addFilter} onClick={this.props.handleAddWithoutFilter}>Add Without Filter</button>
                </div>
            </div>
        );
    }
}

export default DataFilter;
