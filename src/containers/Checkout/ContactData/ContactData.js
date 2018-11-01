import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { CheckValidity, updatedObject } from '../../../Shared/Utils/Utility';

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
                validation: {},
                value: 'fastest',
                valid: true,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
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
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
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
        
        const updatedElementOrder = updatedObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: CheckValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        })
        
        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [inputIdentifier]: updatedElementOrder
        });

        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
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
                    console.log(formElement.config.touched)
                    return <Input 
                                invalid = {!formElement.config.valid}
                                shouldValid = {formElement.config.validation}
                                touched = {formElement.config.touched}
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig = {formElement.config.elementConfig} 
                                value = {formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}  />
                })}
                <Button btnType="Success" disabled = {!this.state.formIsValid} >Order</Button>
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