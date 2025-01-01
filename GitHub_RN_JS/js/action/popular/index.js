import Types from "../types";
import DataStore, { FLAG_STORAGE } from "../../expand/dao/DataStore";

// storeName: 需要获取哪个数据, 如java或者python
export function onLoadPopularData(storeName, url) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(dispatch, storeName, data);
            })
            .catch(error => {
                dispatch({type: Types.LOAD_POPULAR_FAIL, storeName: storeName});
            })
    }
}

function handleData(dispatch, storeName, data) {
    // 最后发现不止是这里的防御性编程出现的问题，而是TabNavigator会触发重渲染
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    } else {
        fixItems = data;
    }
    dispatch({
        storeName: storeName,
        type: Types.LOAD_POPULAR_SUCCESS,
        items: fixItems
    })
}
