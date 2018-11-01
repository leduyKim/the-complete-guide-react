import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-order';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
        this.purchaseHandler = this.purchaseHandler.bind(this)
    }


    componentDidMount() {
        axios.get('https://react-my-burger-76725.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: error})
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0) 
            return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler() {
        this.setState({purchasing: true})
    }

    purchaseCloseHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <p style = {{textAlign: 'center'}}>Ingredients can't response</p> : <Spinner />;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} ></Burger>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disableInfo}
                        ordered = {this.purchaseHandler}
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice} ></BuildControls>
                </Aux>
            );
            orderSummary = <OrderSummary 
                            price = {this.state.totalPrice}
                            ingredients = {this.state.ingredients}
                            purchaseCancelled = {this.purchaseCloseHandler}
                            purchaseContinued = {this.purchaseContinueHandler}
                            ></OrderSummary>
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCloseHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios);