import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tabNav } from "../navigator/NavigationDelegate";
import keys from '../res/data/keys.json'
export default class Index extends Component {
    render() {
        const TabNavigator = keys.length ?
            tabNav({ Component: PopularTab, theme: { themeColor: '#2196f3' }, keys }) : null;
        return (
            <View style={styles.container}>
                {TabNavigator}
            </View>
        );
    }
}

class PopularTab extends Component {
    render() {
        const { tabLabel } = this.props;
        return (<Text>{tabLabel}</Text>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#2196f3',
    }
})
