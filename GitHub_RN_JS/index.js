import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import AppNavigators from "./js/navigator/AppNavigators";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppNavigators);
