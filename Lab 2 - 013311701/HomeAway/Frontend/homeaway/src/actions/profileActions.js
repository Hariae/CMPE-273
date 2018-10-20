import axios from "axios";
import { bindActionCreators } from "C:/Users/User/AppData/Local/Microsoft/TypeScript/3.1/node_modules/redux";
export const GET_PROFILE_DETAILS = "GET_PROFILE_DETAILS";
export const UPDATE_PROFILE_DETAILS = "UPDATE_PROFILE_DETAILS";
export const UPDATE_PROFILE_DETAILS_FAILURE = "UPDATE_PROFILE_DETAILS_FAILURE";

export function getProfileDetails() {
    return async function (dispatch) {

        console.log('Inside Get Profile Details');
        axios.defaults.withCredentials = true;
        
        var ProfileImage = "";
        var result = {
            data : {},
            imageData : ""
        }

        await axios.get('http://localhost:3001/profile-details')
            .then((response) => {
                result.data = response.data;
                ProfileImage = response.data.ProfileImage;
            });
        console.log('ProfileImage', ProfileImage);
        await axios.post('http://localhost:3001/download-file/' + ProfileImage)
            .then(response => {
                result.imageData = 'data:image/jpg;base64, ' + response.data;

            });
        
        
        dispatch({
            type: GET_PROFILE_DETAILS,
            payload: result
        });        

    }
}


export function updateProfileDetails(data){
    return function(dispatch){
        console.log('Inside Update Profile Details');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/update-profile', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('');
                    dispatch({
                         type: UPDATE_PROFILE_DETAILS                         
                    });
                }
            })
            .catch((err) =>{
                if(err){
                    var errorRedirect = true;
                    console.log('in update catch');
                    dispatch({
                        type: UPDATE_PROFILE_DETAILS_FAILURE,
                        payload: errorRedirect                       
                   });
                }
            });
    }
}

