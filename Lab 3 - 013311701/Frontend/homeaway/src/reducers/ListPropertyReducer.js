import { PHOTO_HANDLER, PHOTO_HANDLER_FAILURE } from '../actions/listPropertyActions';

var intialState = {
    errorRedirect : false
}

export default function(state = intialState, action){

    switch(action.type){
        case PHOTO_HANDLER:
            console.log('Inside PHOTO_HANDLER reducer');
            return {
                ...state,
                result : action.payload
            }
        case PHOTO_HANDLER_FAILURE:
            console.log('Inside PHOTO_HANDLER_FAILURE reducer');
            return {
                ...state,
                errorRedirect : true
            }
            
        default: 
            return state;
    }
}