import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import { withSafeArea } from 'react-native-safe-area'

export default class Index extends Component {
    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
