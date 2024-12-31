import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tabNav } from "../navigator/NavigationDelegate";
import keys from "../res/data/langs.json";
export default class Index extends Component {
    render() {
        const TabNavigator = keys.length ?
            tabNav({ Component: TrendingTab, theme: { themeColor: '#2196f3' }, keys }) : null;
        return (
            <View style={styles.container}>
                {TabNavigator}
            </View>
        );
    }
}

class TrendingTab extends Component {
    render() {
        const { tabLabel } = this.props;
        return (<Text>{tabLabel}</Text>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196f3',
    }
})
