import Types from "../../action/types";

const defaultState = {};

/**
 * state树设计为动态的多键对象:
 * popular: {
 *     java: {
 *         items: [],
 *         isLoading: false,
 *     },
 *     ios: {
 *         items: [],
 *         isLoading: false,
 *     }
 * }
 * @param state
 * @param action
 * @returns {{theme}}
 */

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS: // 下拉刷新成功
            return {
                ...state,
                [action.storeName] : {
                    ...state[action.storeName],
                    items: action.items, // 原始数据
                    projectModes: action.projectModes, // 此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            };
        case Types.POPULAR_REFRESH: // 下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                }
            };
        case Types.POPULAR_REFRESH_FAIL: // 下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS: // 上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL: // 上拉加载更多失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                }
            }
        default:
            return state;
    }
}
