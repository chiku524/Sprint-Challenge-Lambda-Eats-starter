import React from 'react';

const OrderUp = props => {

    console.log(props)
    return (
        <div className='order'>
            Name: {props.name} <br />
            Size: {props.size} <br />
            Gluten Free: {`${props.glutenFree}`} <br />
            Pepperoni: {`${props.pepperoni}`} &nbsp; <br />
            Sausage: {`${props.sausage}`} &nbsp; <br />
            Pineapple: {`${props.pineapple}`} &nbsp; <br />
            Cheese: {`${props.cheese}`} <br />
            Sauce: {`${props.sauce}`} <br />
            Special Instructions: {props.special_instructions} <br />
        </div>
    )
}

export default OrderUp;