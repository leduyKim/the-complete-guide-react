import * as actionType from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = name => {
    return { 
        type: actionType.ADD_INGREDIENT, 
        ingredientName: name 
    }
}
export const removeIngredient = name => {
    return { 
        type: actionType.REMOVE_INGREDIENT, 
        ingredientName: name 
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailled = () => {
    return {
        type: actionType.FETCH_INGREDIENT_FAILLED
    }
}

export const initIngredients = () => {
    return dispatch => {
        return axios.get('https://react-my-burger-76725.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientFailled())
            })
    }
}