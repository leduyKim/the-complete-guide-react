import React, { Component } from 'react'
import './Person.css';


export default class Person extends Component {
    

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        }

        const {name, age, click, changed} = this.props;
        return (
            <div className="Person">
                <p>I'm {name} and I am {age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange = {changed} placeholder = {name} />
                <button onClick = {click} style={style} >Delete Element</button>
            </div>
        )
    }
}
