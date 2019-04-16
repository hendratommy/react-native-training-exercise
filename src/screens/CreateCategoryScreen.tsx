import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    TextInput,
    ActivityIndicator
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as yup from "yup";
import { Formik } from "formik";
import { observer, inject } from "mobx-react";
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
    name: yup.string().required("Name required")
});

interface IProps extends NavigationScreenProps {
    categoryStore: ICategoryStore;
}

@inject("categoryStore")
@observer
export default class CreateCategoryScreen extends React.Component<IProps> {
    static navigationOptions = {
        title: "Create Category"
    };

    onCreateSuccess = () => {
        this.props.categoryStore.setMessage("Category created");
        this.props.navigation.navigate("CategoriesScreen");
    };

    render() {
        const { categoryStore } = this.props;
        return (
            <ScrollView style={styles.container}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        name: ""
                    }}
                    onSubmit={async (values, action) => {
                        try {
                            await categoryStore.createCategory(values.name);
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
                        touched
                    }) => (
                        <View style={styles.form}>
                            {isSubmitting && (
                                <View style={styles.loadingIndicatorContainer}>
                                    <ActivityIndicator size="large" />
                                </View>
                            )}
                            {status && status.message && (
                                <View style={[styles.centeredContainer]}>
                                    <Text style={styles.errorText}>
                                        {`${(status.message as string)
                                            .charAt(0)
                                            .toUpperCase()}${(status.message as string).slice(
                                            1
                                        )}`}
                                    </Text>
                                </View>
                            )}

                            {categoryStore &&
                                categoryStore.error &&
                                categoryStore.error.message && (
                                    <View style={[styles.centeredContainer]}>
                                        <Text style={styles.errorText}>
                                            {`${categoryStore.error.message
                                                .charAt(0)
                                                .toUpperCase()}${categoryStore.error.message.slice(
                                                1
                                            )}`}
                                        </Text>
                                    </View>
                                )}

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
                                            <Text style={styles.errorText}>
                                                {errors.name}
                                            </Text>
                                        )))}
                            </View>
                            <View style={styles.centeredContainer}>
                                <View style={styles.submitButtonContainer}>
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
            </ScrollView>
        );
    }
}
