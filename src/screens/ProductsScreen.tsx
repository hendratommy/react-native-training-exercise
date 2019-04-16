import { inject, observer } from "mobx-react";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Snackbar } from "react-native-paper";
import { FlatList, NavigationScreenProps } from "react-navigation";
import VectorIcon from "../components/VectorIcon";
import { IProductStore } from "../stores/ProductStore";
import globalStyles from "../styles/globalStyles";
import { IProduct } from "../types";

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
    productStore: IProductStore;
}

@inject("productStore")
@observer
export default class ProductScreen extends React.Component<IProps> {
    static navigationOptions = {
        title: "Products"
    };

    onSnackbarDismiss = () => {
        this.props.productStore!.setMessage(undefined);
    };

    componentDidMount() {
        this.props.productStore!.getProducts();
    }

    renderProductList = (index: number, product: IProduct) => {
        return (
            <TouchableOpacity onPress={() => console.debug(`onPress`)}>
                <View style={globalStyles.flatListItem}>
                    <Text>{product.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { products, loading } = this.props.productStore!;
        const { message } = this.props.productStore!;
        return (
            <View style={globalStyles.contentBody}>
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
                            >
                                {message}
                            </Snackbar>
                        )}
                        <FlatList
                            data={products ? products : []}
                            keyExtractor={product => `${product.id}`}
                            renderItem={({ item, index }) =>
                                this.renderProductList(index, item)
                            }
                        />
                        <TouchableOpacity
                            style={styles.floatingActionButton}
                            onPress={() =>
                                this.props.navigation.navigate(
                                    "CreateProductScreen"
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
