import Types from "../types";
import DataStore, { FLAG_STORAGE } from "../../expand/dao/DataStore";

// storeName: 需要获取哪个数据, 如java或者python
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize);
            })
            .catch(error => {
                dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName: storeName});
            })
    }
}

export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray=[], callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex-1)*pageSize >= dataArray.length) { // 已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                })
            } else {
                // 本次可载入的最大数据量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max),
                })
            }
        })
    }
}

function handleData(dispatch, storeName, data, pageSize) {
    // 最后发现不止是这里的防御性编程出现的问题，而是TabNavigator会触发重渲染
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    } else {
        fixItems = data;
    }
    dispatch({
        storeName: storeName,
        items: fixItems,
        type: Types.POPULAR_REFRESH_SUCCESS,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据
        pageIndex: 1,
    })
}
