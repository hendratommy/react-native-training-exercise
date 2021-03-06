import { inject, observer } from "mobx-react";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { FlatList, NavigationScreenProps } from "react-navigation";
import VectorIcon from "../components/VectorIcon";
import { Snackbar } from "react-native-paper";
import { ICategoryStore } from "../stores/CategoryStore";
import globalStyles from "../styles/globalStyles";
import { ICategory } from "../types";

const styles = StyleSheet.create({
    floatingActionButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 70,
        backgroundColor: "#01a699",
        borderRadius: 100,
        zIndex: 1
    },
    snackbar: {
        width: "60%",
        bottom: 20
    }
});

interface IProps extends NavigationScreenProps {
    categoryStore: ICategoryStore;
}

@inject("categoryStore")
@observer
export default class CategoriesScreen extends React.Component<IProps> {
    static navigationOptions = {
        title: "Categories"
    };

    onSnackbarDismiss = () => {
        this.props.categoryStore!.setMessage(undefined);
    };

    componentDidMount() {
        this.props.categoryStore!.getCategories();
    }

    renderCategoryList = (index: number, category: ICategory) => {
        return (
            <TouchableOpacity onPress={() => console.debug(`onPress`)}>
                <View style={globalStyles.flatListItem}>
                    <Text>{category.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { categories, loading } = this.props.categoryStore!;
        // const message = this.props.navigation.getParam("message");
        // if (message && !this.state.snackbarVisible) {
        //     this.setState({ snackbarVisible: true });
        // }
        const { message } = this.props.categoryStore!;
        return (
            <View style={[globalStyles.contentBody]}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <React.Fragment>
                        {message && (
                            <Snackbar
                                visible={message != undefined && message != ""}
                                onDismiss={this.onSnackbarDismiss}
                                duration={3000}
                                style={styles.snackbar}
                                // action={{
                                //     label: "Dismiss",
                                //     onPress: () => this.onSnackbarDismiss
                                // }}
                            >
                                {message}
                            </Snackbar>
                        )}
                        <FlatList
                            data={categories ? categories : []}
                            keyExtractor={category => `${category.id}`}
                            renderItem={({ item, index }) =>
                                this.renderCategoryList(index, item)
                            }
                        />
                        <TouchableOpacity
                            style={styles.floatingActionButton}
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "CreateCategoryScreen"
                                )
                            }
                        >
                            <VectorIcon name="md-add" size={30} color="#fff" />
                        </TouchableOpacity>
                    </React.Fragment>
                )}
            </View>
        );
    }
}
