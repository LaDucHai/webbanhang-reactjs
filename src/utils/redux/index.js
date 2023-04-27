import { createStore } from 'redux';

function counterReducer(state = null , action) {
    switch (action.type) {
        case 'viewProduct-productBox-productInforBlock':
            return action.data;
        
        default:
            return state;
    }
}

export const reduxStore = createStore(counterReducer);

// action in product/productBox-productInforBlock
/**
*@typedef {
*type: 'viewProduct-productBox-productInforBlock'
*data: object
*} detailView_action
*/
