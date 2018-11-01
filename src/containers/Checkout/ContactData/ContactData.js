import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-order';

class ContactData extends Component {
    state = {
        orderForm: {
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            },
        },
        loading: false
    }

    CheckValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let formData = {};
        for(let formElementIndentify in this.state.orderForm) {
            formData[formElementIndentify] = this.state.orderForm[formElementIndentify].value;
        }
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            ordersData: formData
        }

        axios.post('orders.json', orders)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }))
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElementOrder = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElementOrder.value = event.target.value;
        updatedElementOrder.valid = this.CheckValidity(updatedElementOrder.value, updatedElementOrder.validation);
        console.log(updatedElementOrder);
        updatedOrderForm[inputIdentifier] = updatedElementOrder;

        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render() {
        let formArray = [];
        for(let key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formArray.map(formElement => {
                    return <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig = {formElement.config.elementConfig} 
                                defaultValue = {formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}  />
                })}
                <Button btnType="Success" >Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};

export default ContactData;