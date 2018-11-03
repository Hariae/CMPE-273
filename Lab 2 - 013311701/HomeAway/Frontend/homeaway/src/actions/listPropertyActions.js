import axios from 'axios';
import {rooturl} from '../config/settings';
export const PHOTO_HANDLER = "PHOTO_HANDLER";
export const PHOTO_HANDLER_FAILURE = "PHOTO_HANDLER_FAILURE";


export function photoHandler(photos){
    return async function(dispatch){
        
        let data = new FormData();
        for (var i = 0; i < photos.length; i++) {
            data.append('photos', photos[i]);
        }

        var result = {
            photoThumbnail: [],
            photos: ""
        }

        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        await axios.post('http://'+rooturl+':3001/upload-file', data, {
            headers: {"Authorization" : `Bearer ${token}`}
        })
            .then(response => {
                var photoArr = "";

                if (response.status === 200) {
                    for (var i = 0; i < photos.length; i++) {
                        photoArr = photoArr.length == 0 ? photos[i].name : photoArr + ',' + photos[i].name;                        
                    }      
                    result.photos = photoArr;              
                }

                

            }).catch((err) =>{
                if(err){
                    dispatch({
                        type: PHOTO_HANDLER_FAILURE
                    });                    
                }
            });

            axios.defaults.withCredentials = true;
            var imagePreviewArr = [];
            for (var i = 0; i < photos.length; i++) {
                await axios.post('http://'+rooturl+':3001/download-file/' + photos[i].name, {
                    headers: {"Authorization" : `Bearer ${token}`}
                })
                .then(response => {
                    //console.log("Imgae Res : ", response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    imagePreviewArr.push(imagePreview);

                    result.photoThumbnail = imagePreviewArr;                   

                })
                .catch((err) =>{
                    if(err){
                        dispatch({
                            type: PHOTO_HANDLER_FAILURE                                        
                        });                                    
                    }
                });
            }
            
            dispatch({
                type: PHOTO_HANDLER,
                payload: result
            });  
            
    }
}


