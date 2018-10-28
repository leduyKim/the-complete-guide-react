import React, { Component } from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

class Cockpit extends Component {

    render() {
        let assignedClasses = [];
        let btnClasses = classes.Button;

        if (this.props.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }

        if (this.props.persons.length <= 1) {
            assignedClasses.push(classes.bold)
        }

        if (this.props.showPerson) {
            btnClasses = [classes.Button ,classes.showPerson].join(" ");
        }
        return (
            <Aux>
                <h1> {this.props.title} </h1>
                <p className={assignedClasses.join(' ')} >This is really working!!!</p>
                <button
                    className={btnClasses}
                    onClick={this.props.click}
                >Toogle Person</button>
                <button className = {classes.Button} onClick = {this.props.login}>Log in</button>
            </Aux>
        )
    }
}


export default Cockpit;