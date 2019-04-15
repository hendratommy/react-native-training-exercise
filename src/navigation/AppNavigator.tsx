import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator
} from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default createAppContainer(
    createSwitchNavigator(
        {
            LoginScreen: createStackNavigator({ LoginScreen, RegisterScreen }),
            MainScreen: MainTabNavigator
        },
        {
            initialRouteName: "LoginScreen"
        }
    )
);
