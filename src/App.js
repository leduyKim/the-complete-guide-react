import React, { Component } from 'react';
import classes from  './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'sfjksjdaf', name: "Max", age: 28 },
      { id: 'kksajfksa', name: 'Manu', age: 29 },
      { id: 'kjkjlajsdf', name: 'Stephanie', age: 26}
    ],
    showsPerson: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons});
  }

  tooglePersonHandler = () => {
    const doesPerson = this.state.showsPerson;
    this.setState({ showsPerson: !doesPerson })
    
  }

  deletePersonHandler = (indexPerson) => {
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({persons: persons})
  }

  render() {

    let persons = null;
    let btnClasses = '';

    if(this.state.showsPerson) {
      persons = (
        <div>
          {this.state.persons.map(({id, name, age}, index) => {
            return <Person 
                    key = { id }
                    click = {() => this.deletePersonHandler(index)}
                    name = { name }
                    age = { age }
                    changed = { (event) => this.nameChangeHandler(event, id) }/>
          })}
        </div>
      );
      btnClasses = classes.showPerson;
    }

    let assignedClasses = [];
    if(this.state.persons.length <=2) {
      assignedClasses.push(classes.red);
    }

    if(this.state.persons.length <=1) {
      assignedClasses.push(classes.bold)
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className = {assignedClasses.join(' ')} >This is really working!!!</p>
          <button 
            className = {btnClasses} 
            onClick = {this.tooglePersonHandler} 
            >Toogle Person</button>
          { persons }
        </div>
    );
  }
}
export default App;
