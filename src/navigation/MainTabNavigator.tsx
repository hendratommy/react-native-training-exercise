import React from "react";
import { Platform } from "react-native";
import {
    createBottomTabNavigator,
    createStackNavigator,
    TabBarIconProps
} from "react-navigation";
import TabBarIcon from "../components/VectorIcon";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }: TabBarIconProps) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-information-circle${focused ? "" : "-outline"}`
                    : "md-information-circle"
            }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack
});
