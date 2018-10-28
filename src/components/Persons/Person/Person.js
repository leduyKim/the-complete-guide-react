import React, { Component } from 'react'
import classes from './Person.css';
import WithNewClass from '../../../hoc/withNewClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App'

class Person extends Component {
    constructor(props) {
        super(props)
        console.log('[Person.js] Inside contructor()');
        this.inputElement = React.createRef();
        

    }
    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        console.log(this.inputElement);
        if(this.props.position === 0) {
            console.log(this.inputElement)
            this.inputElement.current.focus();
        }
        
        
    }

    focus() {
        this.inputElement.current.focus();
    }
    render() {
        console.log('[Person.js] Inside render()');
        const { name, age, click, changed } = this.props;
        return (
            <Aux>
                <AuthContext.Consumer>
                {auth => auth.authenticated ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>
                <p>I'm {name} and I am {age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" ref = {this.inputElement} onChange={changed} defaultValue={name} />
                <button className={classes.showPerson} onClick={click}>Delete Element</button>
            </Aux>
        )
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func
}

export default WithNewClass(Person, classes.Person ) ;
