import { SAVE_SEARCH_DETAILS_TO_STORE } from '../actions/homeAction';

export default function(state = {}, action){
    switch(action.type){
        case SAVE_SEARCH_DETAILS_TO_STORE:
            console.log('SAVE_SEARCH_DETAILS_TO_STORE reducer');
            return {
                ...state,
                result : action.payload
            }
        default: 
            return state;
    }
}