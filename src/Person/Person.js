import React, { Component } from 'react'
import './Person.css';


export default class Person extends Component {
    

    render() {
        const {name, age, click, changed} = this.props;
        return (
            <div className="Person" onClick = {click}>
                <p>I'm {name} and I am {age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange = {changed} placeholder = {name} />
            </div>
        )
    }
}
