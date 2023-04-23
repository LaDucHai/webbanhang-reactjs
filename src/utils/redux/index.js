import { createStore } from 'redux';

function counterReducer(state = null , action) {
    switch (action.type) {
        case 'login':
            return 'login';
        
        default:
            return state
    }
}

export let reduxStore = createStore(counterReducer);