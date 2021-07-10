import { produce } from "immer";

// duck namespace
export const namespace = "settings";

// action types
export const ADD_ITEM = `${namespace}/ADD_ITEM`;
export const UPDATE_ITEM = `${namespace}/UPDATE_ITEM`;
export const REMOVE_ITEM = `${namespace}/REMOVE_ITEM`;
export const SET_FIELD = `${namespace}/SET_FIELD`;

// action creators
export function addItem(id) {
    console.log(id)
    return {
        type: ADD_ITEM,
        id,
    }
}

export function updateItem(id, item) {
    return {
        type: UPDATE_ITEM,
        id,
        item,
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id,
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
        {id: null, value: 0},
        ],
    summary: 0,
};

// reducer
export function reducer(state = initialState, action) {
    let { type, id, item, key, value } = action;

    switch (type) {
        case ADD_ITEM:
            return produce(state, (s) => {
                let item = s.items.find(el => el.id === id);
                console.log(item)
                item ? item.value ++ :  s.items.push ({id,value : 1})

            });

        case UPDATE_ITEM:
            return produce(state, (s) => {
                let index = s.items.findIndex(el => el.id === id);
                if (index > -1) {
                    s.items[index] = {
                        ...s.items[index],
                        ...item,
                    };
                }
            });

        case REMOVE_ITEM:
            return produce(state, (s) => {
                let index = s.items.findIndex(el => el.id === id);
                if (index > -1) {
                    s.items.splice(index, 1);
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

// selectors
export const selectItems = state => state[namespace].items;
export const selectIsOpened = state => state[namespace].isOpened;
