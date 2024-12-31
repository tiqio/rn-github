import React, {Component} from 'react';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import { StatusBar } from "react-native";
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from "react-redux";

class HomePage extends Component {
    render() {
        const {theme} = this.props;
        NavigationUtil.navigation = this.props.navigation;
        return (
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                    <StatusBar translucent={true} backgroundColor={theme} />
                    <DynamicTabNavigator/>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(HomePage);

// 成功控制状态栏
// https://blog.csdn.net/Smallwhitestrive/article/details/132539670

