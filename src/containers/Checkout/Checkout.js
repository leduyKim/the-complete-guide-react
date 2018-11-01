import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for(let param of query.entries()) {
            param[0] === 'price' ? price = param[1] : ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients, totalPrice: price})
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render= { (props) => (<ContactData ingredients = {this.state.ingredients} {...props} price={this.state.totalPrice} />)} />
            </div>
        )
    }
}
