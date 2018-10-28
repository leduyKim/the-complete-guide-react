import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props) {
    super(props)
    console.log('[Persons.js] Inside contructor()');
    this.lastPersonRef = React.createRef();

  }
  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount()');
    console.log(this.lastPersonRef.current)
    this.lastPersonRef.current.focus();
  }
  componentWillReceiveProps(nextProps) {
    console.log('[Update Persons.js] Inside componentWillReceiveProps()', nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Update Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return  nextProps.persons !== this.props.persons ||
  //           nextProps.click !== this.props.click ||
  //           nextProps.changed !== this.props.changed;
  //   // return true;
  // }
  
  componentWillUpdate(nextProps, nextState) {
    console.log('[Update Persons.js] Inside componentWillUpdate()', nextProps, nextState);
  }
  componentDidUpdate() {
    console.log('[Update Persons.js] Inside componentDidUpdate()');
  }

  render() {
    console.log('[Persons.js] Inside render()');

    const { persons, click, changed } = this.props
    return persons.map(({ id, name, age }, index) => {
      return <Person key={id}
        click={() => click(index)}
        name={name}
        ref = {this.lastPersonRef}
        position = {index}
        authenticated = {this.props.isAuthenticated}
        age={age}
        changed={(event) => changed(event, id)} />
    })
  }
}


export default Persons;