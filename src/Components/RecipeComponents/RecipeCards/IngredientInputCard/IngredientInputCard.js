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
            <div className='IngredientInputCard-wrapper'>
                <input name='amount' placeholder='qty'
                    onChange={this.handleInputChange}
                    type='number' min='0'
                    value={this.state.amount}
                    className='amount'
                />
                <input name='unit' placeholder='unit'
                    onChange={this.handleInputChange}
                    value={this.state.unit}
                    className='unit'
                />
                <input name='iName' placeholder='ingredient name'
                    onChange={this.handleInputChange}
                    value={this.state.iName}
                    className='iName'
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

                }}
                disabled={!this.state.amount || !this.state.unit || !this.state.iName}
                >Add</button>
            </div>
        )
    }
}
export default IngredientInputCard;