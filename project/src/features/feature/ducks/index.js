import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import produce from "immer";
import * as BasketDuck from "./basket.duck";
import * as ExampleDuck from './example.duck';


export function logger(store) {
    return next => action => {
        console.log('will dispatch', action);
        const returnValue = next(action);
        console.log('state after dispatch', store.getState());
        return returnValue;
    };
}

const middleware = [logger];

const middlewareEnhancer = applyMiddleware(...middleware);
const composedEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
)(middlewareEnhancer);


const rootReducer = combineReducers({
    [BasketDuck.namespace]: BasketDuck.reducer,
})

export const store = createStore(rootReducer);
