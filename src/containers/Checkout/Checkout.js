import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import URLSearchParams from 'url-search-params';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import AsyncComponet from '../../hoc/AsyncComponent/AsyncComponent';
import * as actions from '../../store/actions/index';

const ContactDataLazily = AsyncComponet(() => {
    return import('./ContactData/ContactData')
})

class Checkout extends Component {
    // state = {
    //     ingredients: {},
    //     totalPrice: 0
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         param[0] === 'price' ? price = param[1] : ingredients[param[0]] = +param[1];
    //     }
    //     this.setState({ ingredients, totalPrice: price })
    // }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactDataLazily}
                    />
                </Fragment>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
