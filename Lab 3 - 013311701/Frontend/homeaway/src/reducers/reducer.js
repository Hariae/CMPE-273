import { AUTH_LOGIN } from '../actions/index';


//Reducer listening to action types

export default function (state={}, action){

    switch(action.type){

        case AUTH_LOGIN: 
            console.log('Inside Reducer', action.payload);
            return {
                ...state,
                result : action.payload
            }  
        default: 
            return state;


    }
}
