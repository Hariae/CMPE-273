import { SIGNUP } from '../actions/index';

export default function (state = {}, action) {

    switch (action.type) {
        case SIGNUP:
            console.log('Inside Reducer', action.payload);
            return {
                ...state,
                result: action.payload
            }
        default:
            return state;
    }
}