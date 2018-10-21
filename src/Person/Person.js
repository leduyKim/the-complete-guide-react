import React, { Component } from 'react'
import classes from  './Person.css';


class Person extends Component {
    

    render() {
        const {name, age, click, changed} = this.props;
        return (
            <div className={classes.Person}>
                <p>I'm {name} and I am {age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange = {changed} placeholder = {name} />
                <button onClick = {click}>Delete Element</button>
            </div>
        )
    }
}

export default Person;
