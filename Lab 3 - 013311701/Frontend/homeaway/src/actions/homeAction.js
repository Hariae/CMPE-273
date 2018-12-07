export const SAVE_SEARCH_DETAILS_TO_STORE = "SAVE_SEARCH_DETAILS_TO_STORE";

export function saveSearchDetailsToStore(data){
    return function(dispatch){
        var result = {
            searchText : data.searchText,
            startDate : data.startDate,
            endDate : data.endDate,
            guests : data.guests,
            isSearch : true
        }
        
        dispatch({
            type: SAVE_SEARCH_DETAILS_TO_STORE,
            payload: result
        });
    }
}