import React from "react";
import { Platform } from "react-native";
import {
    createBottomTabNavigator,
    createStackNavigator,
    TabBarIconProps
} from "react-navigation";
import VectorIcon from "../components/VectorIcon";
import CategoriesScreen from "../screens/CategoriesScreen";
import HomeScreen from "../screens/HomeScreen";
import CreateCategoryScreen from "../screens/CreateCategoryScreen";

const HomeStack = createStackNavigator({
    HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }: TabBarIconProps) => (
        <VectorIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-information-circle${focused ? "" : "-outline"}`
                    : "md-information-circle"
            }
        />
    )
};

const CategoriesStack = createStackNavigator({
    CategoriesScreen: CategoriesScreen,
    CreateCategoryScreen: CreateCategoryScreen
});

CategoriesStack.navigationOptions = {
    tabBarLabel: "Categories",
    tabBarIcon: ({ focused }: TabBarIconProps) => (
        <VectorIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-pricetags${focused ? "" : "-outline"}`
                    : "md-pricetags"
            }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    CategoriesStack
});
