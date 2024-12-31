import React, {Component} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { tabNav } from "../navigator/NavigationDelegate";
import keys from '../res/data/keys.json'
import * as actions from "../action/theme";
import { connect } from "react-redux";

class PopularPage extends Component {
    render() {
        const { theme } = this.props;
        const TabNavigator = keys.length ?
            tabNav({ Component: PopularTabPage, theme: { themeColor: theme ?? '#2196f3' }, keys }) : null;
        return (
            <View style={styles.container}>
                {TabNavigator}
            </View>
        );
    }
}

class PopularTab extends Component {
    render() {
        const { tabLabel, onThemeChange, theme } = this.props;
        return (
            <Text>
                <Text>{tabLabel}</Text>
                <Button title='改变主题' onPress={() => {
                    onThemeChange(theme === 'red' ? '#2196f3' : 'red');
                }} />
            </Text>
        )
    }
}

const mapStateToProps = (state) => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

export default connect(mapStateToProps)(PopularPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196f3',
    },
    safeArea: {
        backgroundColor: '#2196f3',
    }
})
