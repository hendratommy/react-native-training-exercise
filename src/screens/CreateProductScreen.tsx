import { Formik } from "formik";
import { inject, observer } from "mobx-react";
import React from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Picker
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as yup from "yup";
import { IProductStore } from "../stores/ProductStore";
import { ICategoryStore } from "../stores/CategoryStore";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%"
    },
    containerContent: {
        paddingTop: 30
    },
    form: {
        height: "100%",
        marginTop: 30,
        marginHorizontal: 50
    },
    formField: {
        width: "100%",
        marginTop: 8
    },
    errorText: {
        color: "red"
    },
    textInput: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1
    },
    centeredContainer: {
        alignItems: "center",
        width: "100%"
    },
    submitButtonContainer: {
        marginTop: 30,
        width: 100
    },
    loadingIndicatorContainer: {
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%"
    }
});

const schema = yup.object().shape({
    name: yup.string().required("Name required"),
    price: yup.number().moreThan(0, "Price must more than 0"),
    images: yup.string().required("Image required"),
    desc: yup.string().required("Description required"),
    idCategory: yup.number().moreThan(0, "Category not valid")
});

interface IProps extends NavigationScreenProps {
    productStore: IProductStore;
    categoryStore: ICategoryStore;
}

@inject("productStore", "categoryStore")
@observer
export default class CreateProductScreen extends React.Component<IProps> {
    static navigationOptions = {
        title: "Create Product"
    };

    componentDidMount() {
        this.props.categoryStore!.getCategories();
    }

    onCreateSuccess = () => {
        this.props.productStore.setMessage("Product created");
        this.props.navigation.navigate("ProductsScreen");
    };

    render() {
        const { productStore, categoryStore } = this.props;
        const { loading } = categoryStore!;
        return (
            <ScrollView style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <View>
                        <Formik
                            validationSchema={schema}
                            initialValues={{
                                name: "",
                                price: 0,
                                idCategory: 0,
                                images: "",
                                desc: ""
                            }}
                            onSubmit={async (values, action) => {
                                try {
                                    console.debug("trigger");
                                    await productStore!.createProduct(
                                        values.name,
                                        values.price,
                                        values.idCategory,
                                        values.images,
                                        values.desc
                                    );
                                    this.onCreateSuccess();
                                } catch (error) {
                                    Alert.alert("Error", error.message);
                                } finally {
                                    action.setSubmitting(false);
                                }
                            }}
                            render={({
                                handleSubmit,
                                handleChange,
                                values,
                                status,
                                errors,
                                isSubmitting,
                                touched,
                                setFieldValue
                            }) => (
                                <View style={styles.form}>
                                    {isSubmitting && (
                                        <View
                                            style={
                                                styles.loadingIndicatorContainer
                                            }
                                        >
                                            <ActivityIndicator size="large" />
                                        </View>
                                    )}
                                    {status && status.message && (
                                        <View
                                            style={[styles.centeredContainer]}
                                        >
                                            <Text style={styles.errorText}>
                                                {`${(status.message as string)
                                                    .charAt(0)
                                                    .toUpperCase()}${(status.message as string).slice(
                                                    1
                                                )}`}
                                            </Text>
                                        </View>
                                    )}

                                    {productStore &&
                                        productStore.error &&
                                        productStore.error.message && (
                                            <View
                                                style={[
                                                    styles.centeredContainer
                                                ]}
                                            >
                                                <Text style={styles.errorText}>
                                                    {`${productStore.error.message
                                                        .charAt(0)
                                                        .toUpperCase()}${productStore.error.message.slice(
                                                        1
                                                    )}`}
                                                </Text>
                                            </View>
                                        )}

                                    <View style={styles.formField}>
                                        <Text>Category: </Text>
                                        <Picker
                                            selectedValue={values.idCategory}
                                            style={{ height: 50, width: 100 }}
                                            onValueChange={value =>
                                                setFieldValue(
                                                    "idCategory",
                                                    value
                                                )
                                            }
                                        >
                                            {categoryStore.categories.map(
                                                (category, index) => (
                                                    <Picker.Item
                                                        key={`${
                                                            category.id
                                                        }.${index}`}
                                                        label={category.name}
                                                        value={category.id}
                                                    />
                                                )
                                            )}
                                        </Picker>
                                        {touched.idCategory &&
                                            ((status && status.idCategory && (
                                                <Text style={styles.errorText}>
                                                    {status.idCategory}
                                                </Text>
                                            )) ||
                                                (errors &&
                                                    errors.idCategory && (
                                                        <Text
                                                            style={
                                                                styles.errorText
                                                            }
                                                        >
                                                            {errors.idCategory}
                                                        </Text>
                                                    )))}
                                    </View>
                                    <View style={styles.formField}>
                                        <Text>Name: </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            onChangeText={handleChange("name")}
                                            value={values.name}
                                        />
                                        {touched.name &&
                                            ((status && status.name && (
                                                <Text style={styles.errorText}>
                                                    {status.name}
                                                </Text>
                                            )) ||
                                                (errors && errors.name && (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {errors.name}
                                                    </Text>
                                                )))}
                                    </View>
                                    <View style={styles.formField}>
                                        <Text>Price: </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            onChangeText={handleChange("price")}
                                            value={`${values.price}`}
                                            keyboardType="number-pad"
                                        />
                                        {touched.price &&
                                            ((status && status.price && (
                                                <Text style={styles.errorText}>
                                                    {status.price}
                                                </Text>
                                            )) ||
                                                (errors && errors.price && (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {errors.price}
                                                    </Text>
                                                )))}
                                    </View>
                                    <View style={styles.formField}>
                                        <Text>Images: </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            onChangeText={handleChange(
                                                "images"
                                            )}
                                            value={`${values.images}`}
                                        />
                                        {touched.images &&
                                            ((status && status.images && (
                                                <Text style={styles.errorText}>
                                                    {status.images}
                                                </Text>
                                            )) ||
                                                (errors && errors.images && (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {errors.images}
                                                    </Text>
                                                )))}
                                    </View>
                                    <View style={styles.formField}>
                                        <Text>Description: </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            onChangeText={handleChange("desc")}
                                            value={`${values.desc}`}
                                        />
                                        {touched.desc &&
                                            ((status && status.desc && (
                                                <Text style={styles.errorText}>
                                                    {status.desc}
                                                </Text>
                                            )) ||
                                                (errors && errors.desc && (
                                                    <Text
                                                        style={styles.errorText}
                                                    >
                                                        {errors.desc}
                                                    </Text>
                                                )))}
                                    </View>
                                    <View style={styles.centeredContainer}>
                                        <View
                                            style={styles.submitButtonContainer}
                                        >
                                            <Button
                                                onPress={handleSubmit}
                                                title="Create"
                                                disabled={isSubmitting}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                )}
            </ScrollView>
        );
    }
}
