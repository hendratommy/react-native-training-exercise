import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";

export default createAppContainer(
    createSwitchNavigator(
        {
            Welcome: createStackNavigator({ Welcome: WelcomeScreen }),
            Main: MainTabNavigator
        },
        {
            initialRouteName: "Welcome"
        }
    )
);
