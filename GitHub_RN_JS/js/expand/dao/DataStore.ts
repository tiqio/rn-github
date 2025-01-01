import { get } from './HiNet';
import Constants from './Constants';
import { URL } from 'react-native-url-polyfill';//use URLSearchParams in RN

//用于标识最热模块和趋势模块的请求
export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
};
export default class DataStore {
  /**
   * 获取数据
   * @param url
   * @param flag
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<unknown>}
   */
  fetchData(url: string, flag: string, pageIndex = 1, pageSize = 25): Promise<unknown> {
    const isTrending = flag === FLAG_STORAGE.flag_trending;
    let api, params: any = { pageIndex, pageSize };
    if (isTrending) {
      api = Constants.trending.api;
      params.sourceUrl = url;
    } else {
      api = Constants.popular.api;
      //从url中取出q参数：eg:url https://api.devio.org/uapi/popular?q=java&pageIndex=1&pageSize=25
      const q = new URL(url).searchParams.get('q');
      params.q = q;
    };
    // 最后构建出来的url不能直接请求
    // https://api.devio.org/uapi/popular?pageIndex=1&pageSize=25&q=ALL
    // 正确的url获取方法应该是
    // curl -X GET "https://api.devio.org/uapi/popular?q=ALL&pageIndex=1&pageSize=25" -H "accept: */*" -H "course-flag: rn" -H "auth-token: fd82d1e882462e23b8e88aa82198f166" -H "boarding-pass: B59DE7D60F9B96F3DD9D93D1725D2702NR"
    return get(api)(params);
  }
}
