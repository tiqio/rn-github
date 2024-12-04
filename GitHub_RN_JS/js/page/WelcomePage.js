import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getBoarding } from "../util/BoardingUtil";
import NavigationUtil from "../navigator/NavigationUtil";
export default class Index extends Component {
    componentDidMount() {
        this.doLaunch();
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    async doLaunch() {
        const boarding = await getBoarding();
        const { navigation } = this.props;
        this.timer = setTimeout(() => {
            if (boarding) {
                NavigationUtil.resetToHomPage({ navigation });
            } else {
                NavigationUtil.login({ navigation })
            }
        }, 200);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>最热</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
