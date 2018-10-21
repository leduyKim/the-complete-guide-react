import React, { Component } from 'react';
import './App.css';
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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

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
      )
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!!!</p>
        <button 
          style = {style} 
          onClick = {this.tooglePersonHandler} 
          >Toogle Person</button>
        { persons }
      </div>
    );
  }
}

export default App;
