import React, { Component } from 'react';
import './stylesheet/IngredientInputCard.scss';

class IngredientInputCard extends Component {
    constructor() {
        super();
        this.state = {
            amount: 0,
            unit: '',
            iName: '',
            id: null,
            spoon_id: null
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input name='amount' placeholder='qty'
                    onChange={this.handleInputChange}
                    type='number' min='0'
                    value={this.state.amount}
                />
                <input name='unit' placeholder='unit'
                    onChange={this.handleInputChange}
                    value={this.state.unit}
                />
                <input name='iName' placeholder='ingredient name'
                    onChange={this.handleInputChange}
                    value={this.state.iName}
                />
                <button onClick={() => {

                    this.props.addToIngredients({
                        name: this.state.iName,
                        amount: this.state.amount,
                        unit: this.state.unit,
                        id: null,
                        spoon_id: null
                    });
                    this.setState({
                        amount: 0,
                        unit: '',
                        iName: '',
                        id: null,
                        spoon_id: null
                    })

                }}>Add</button>
            </div>
        )
    }
}
export default IngredientInputCard;