import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log('order.js stateless')
    let ingredients = [];
    for(let key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
                    style = {{
                                textTransform: 'capitalize',
                                border: '1px solid #ccc',
                                margin: '0 8px',
                                padding: '5px',
                                display: 'inline-block'
                            }}
                    key={ig.name} >{ig.name}({ig.amount})</span>
    })
    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;