import React, {Component} from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { tabNav } from "../navigator/NavigationDelegate";
import keys from '../res/data/keys.json'
import actions from '../action'
import { connect } from "react-redux";
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

class PopularPage extends Component {
    render() {
        const { theme } = this.props;
        // const TabNavigator = keys.length ?
        //     tabNav({ Component: PopularTabPage, theme: { themeColor: theme ?? '#2196f3' }, keys }) : null;
        //通过复用TabNavigator来防止导航器频繁的创建，提升渲染效率
        this.TabNavigator = this.TabNavigator ? this.TabNavigator : keys.length
            ? tabNav({
                Component: PopularTabPage,
                theme: { themeColor: theme },
                keys,
            })
            : null;
        return (
            <View style={styles.container}>
                {this.TabNavigator}
            </View>
        );
    }
}

const pageSize = 10; // 设置为常量防止修改
class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount() {
        this.loadData();
    }
    loadData(loadMore) {
        const {onLoadPopularData, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.toast.show('没有更多了');
            })
        } else {
            onLoadPopularData(this.storeName, url, pageSize);
        }
        // 使用包装好的onLoadPopularData而不是直接使用dispatch比较方便
        // onLoadPopularData(this.storeName, url);
    }
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [], // 要显示的数据
                hideLoadingMore: true, // 默认隐藏加载更多
            }
        }
        return store;
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
    renderItem(data) {
        const item = data.item;
        return <PopularItem item={item} onSelect={() => {}} />
    }
    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        // const {popular} = this.props;
        // let store = popular[this.storeName]; // 动态获取state
        // if (!store) { // 在没有数据时需要占位
        //     store = { items: [], isLoading: false }
        // }
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => ''+item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        this.loadData(true);
                    }}
                    onEndReachedThreshold={0.5}
                />
                <Toast ref={(toast) => {this.toast = toast}}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    popular: state.popular,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

export default connect(mapStateToProps)(PopularPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196f3',
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
})
