import React, {Component} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { onLoadPopularData } from "../action/popular";
import actions from "../action";
import { connect } from "react-redux";
class MyPage extends Component {
    render() {
        const {onThemeChange, theme} = this.props;
        return (
            <View style={styles.container}>
                <Text>MyPage</Text>
                <Button title='改变主题' onPress={() => {
                    onThemeChange(theme === 'red' ? '#2196f3' : 'red');
                }} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = (dispatch) => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
