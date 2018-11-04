import { GET_PROFILE_DETAILS, UPDATE_PROFILE_DETAILS,  UPDATE_PROFILE_DETAILS_FAILURE, GET_PROFILE_DETAILS_FAILURE} from '../actions/profileActions';

var intialState = {
    errorRedirect : false
}


export default function(state = intialState, action){
    switch(action.type){
        case GET_PROFILE_DETAILS:
            console.log('GET PROFILE DETAILS Reducer..');
            return {
                ...state,
                result: action.payload
            }
        case GET_PROFILE_DETAILS_FAILURE:
            return {
                ...state,
                errorRedirect : action.payload
            }
        case UPDATE_PROFILE_DETAILS:
            console.log('UPDATE PROFILE DETAILS Reducer..');
            return {
                ...state
            }
        case UPDATE_PROFILE_DETAILS_FAILURE:
            console.log('UPDATE_PROFILE_DETAILS_FAILURE', action.payload);
            return{                
                ...state,
                errorRedirect : action.payload
            }
        default: 
            return state;
    }
} 