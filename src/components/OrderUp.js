import React from 'react';

const OrderUp = props => {
    return (
        <div className='order'>
            Name: {props.name} <br />
            Size: {props.size} <br />
            Pepperoni: {props.pepperoni} <br />
            Sausage: {props.sausage} <br />
            Pineapple: {props.pineapple} <br />
            Cheese: {props.cheese} <br />
            Special Instructions: {props.special_instructions} <br />
        </div>
    )
}

export default OrderUp;