import React, {Component} from 'react';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

export default class Index extends Component {
    render() {
        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>
    }
}
