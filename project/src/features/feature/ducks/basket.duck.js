import {produce} from "immer";

// duck namespace
export const namespace = "settings";

// action types
export const ADD_ITEM = `${namespace}/ADD_ITEM`;
export const UPDATE_ITEM = `${namespace}/UPDATE_ITEM`;
export const REMOVE_ITEM = `${namespace}/REMOVE_ITEM`;
export const SET_FIELD = `${namespace}/SET_FIELD`;

// action creators
export function addItem(id, value) {
    return {
        type: ADD_ITEM,
        id,
        value
    }
}

export function updateItem(id, value) {
    return {
        type: UPDATE_ITEM,
        id,
        value,
    }
}

export function removeItem(id, value) {
    return {
        type: REMOVE_ITEM,
        id,
        value
    }
}

export function setField(key, value) {
    return {
        type: SET_FIELD,
        key,
        value,
    }
}

const initialState = {
    items: [
        {id: null, value: null},
    ],
    summaryCosts: 0,
    summaryVal: 0,

};


// reducer
export function reducer(state = initialState, action) {
    let {type, id, item, key, value} = action;

    switch (type) {
        case ADD_ITEM:
            return produce(state, (s) => {
                let item = s.items.find(el => el.id === id);
                item ? item.value++ : s.items.push({id, value: 1});
                s.summaryVal++;
                s.summaryCosts += value;
            });

        case UPDATE_ITEM:
            return produce(state, (s) => {
                let {price, newValue} = value
                let item = s.items.find(el => el.id === id),
                    newPrice = +price * [+newValue],
                    oldPrice = +price * [+item.value];
                s.summaryCosts = +s.summaryCosts - oldPrice + newPrice;
                s.summaryVal = +s.summaryVal - item.value + newValue;
                item.value = newValue;
            });

        case REMOVE_ITEM:
            return produce(state, (s) => {
                let element = s.items.find(el => el.id === id);
                let {deleteNumb, price} = value;
                if (element) {
                    if (element.value > deleteNumb) {
                        element.value = + element.value - deleteNumb;
                        s.summaryVal = +s.summaryVal - deleteNumb;
                        s.summaryCosts = +s.summaryCosts - [price * deleteNumb];
                    } else {
                        s.items.splice(s.items.indexOf(id), 1);
                        s.summaryVal = +s.summaryVal - element.value;
                        s.summaryCosts = +s.summaryCosts - [element.value * price];
                    }
                }
            });

        case SET_FIELD:
            return produce(state, s => {
                s[key] = value;
            });

        default:
            return state;
    }
}

const getValues = () => {
    let sum = 0;
    for (let el in initialState) {
        sum += el.value;
    }
    return sum
}
// selectors
export const selectItems = state => state[namespace].items;
export const selectItemsValue = state => state[namespace].summaryVal;
export const selectItemsCosts = state => state[namespace].summaryCosts;
