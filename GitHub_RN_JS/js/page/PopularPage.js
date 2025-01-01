import React, {Component} from 'react';
import { Button, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { tabNav } from "../navigator/NavigationDelegate";
import keys from '../res/data/keys.json'
import actions from '../action'
import { connect } from "react-redux";

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

class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        // 使用包装好的onLoadPopularData而不是直接使用dispatch比较方便
        onLoadPopularData(this.storeName, url);
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
    renderItem(data) {
        const item = data.item;
        return <View style={{marginBottom: 10}}>
            <Text style={{backgroundColor: '#faa'}}>
                {JSON.stringify(item)}
            </Text>
        </View>
    }
    render() {
        const {popular} = this.props;
        let store = popular[this.storeName]; // 动态获取state
        if (!store) { // 在没有数据时需要占位
            store = { items: [], isLoading: false }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
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
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    popular: state.popular,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

export default connect(mapStateToProps)(PopularPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196f3',
    },
})
