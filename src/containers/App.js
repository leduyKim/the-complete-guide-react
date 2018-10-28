import React, { PureComponent, StrictMode } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import WithNewClass from '../hoc/withNewClass';

export const AuthContext = React.createContext({authenticated: false});

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { id: 'sfjksjdaf', name: "Max", age: 28 },
        { id: 'kksajfksa', name: 'Manu', age: 29 },
        { id: 'kjkjlajsdf', name: 'Stephanie', age: 26 }
      ],
      showsPerson: false,
      toogleClick: 0,
      authenticated: false
    }
    console.log('[App.js] Inside contructor()');

  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons });
  }

  tooglePersonHandler = () => {
    const doesPerson = this.state.showsPerson;
    this.setState((state) => { 
      return {
              showsPerson: !doesPerson,
              toogleClick: state.toogleClick + 1 // handler synchorous
            }
          })
  }

  deletePersonHandler = (indexPerson) => {
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({ persons: persons })
  }

  // componentWillMount() {
  //   console.log('[App.js] Inside componentWillMount()');
  // }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Update App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   // return nextState.persons !== this.state.persons || nextState.showsPerson !== this.state.showsPerson;
  //   return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[Update App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, preState) {
    console.log('[Update App.js] Inside getDerivedStateFromProps()', nextProps, preState);
    return preState;
  }                     

  // getSnapshotBeforeUpdate() {
  //   console.log('[Update App.js] Inside getSnapshotBeforeUpdate()');
  // }

  componentDidUpdate() {
    console.log('[Update App.js] Inside componentDidUpdate()');
  }

  loginHandler = () => {
    this.setState(state => {
      return {authenticated: !state.authenticated}
    });
  }

  render() {
    console.log('[App.js] Inside render()');

    let personsBlock = null;

    if (this.state.showsPerson) {
      personsBlock = (
        <div>
          <Persons 
            persons={this.state.persons} 
            click={this.deletePersonHandler} 
            isAuthenticated = {this.state.authenticated}
            changed={this.nameChangeHandler} />
        </div>
      );
    }

    return (
      <StrictMode>
        <Aux>
        <button className={classes.Button} onClick={() => this.setState({ showsPerson: true })} >Show persons</button>
        <Cockpit
          title={this.props.title}
          persons={this.state.persons}
          showPerson={this.state.showsPerson}
          click={this.tooglePersonHandler}
          login = {this.loginHandler}
        ></Cockpit>
        <AuthContext.Provider value = {{authenticated: this.state.authenticated}} >
          {personsBlock}
        </AuthContext.Provider>
      </Aux>
      </StrictMode>
      
    );
  }
}
export default WithNewClass(App, classes.App);
