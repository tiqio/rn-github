import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import AppNavigators from "./js/navigator/AppNavigators";
import { AppRegistry } from "react-native";
import App from "./js/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
AppRegistry.registerComponent('GitHub_RN', () => App);
