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
import CreateProductScreen from "../screens/CreateProductScreen";
import ProductsScreen from "../screens/ProductsScreen";

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

const ProductStack = createStackNavigator({
    ProductsScreen: ProductsScreen,
    CreateProductScreen: CreateProductScreen
});

ProductStack.navigationOptions = {
    tabBarLabel: "Products",
    tabBarIcon: ({ focused }: TabBarIconProps) => (
        <VectorIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-cube${focused ? "" : "-outline"}`
                    : "md-cube"
            }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    CategoriesStack,
    ProductStack
});
