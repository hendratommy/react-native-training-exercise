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
import authAction from "../actions/authAction";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    containerContent: {
        paddingTop: 30
    },
    form: {
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
    submitButtonContainer: {
        width: "100%",
        marginTop: 30,
        alignItems: "center"
    },
    loadingIndicatorContainer: {
        position: "absolute",
        zIndex: 1,
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    loadingIndicator: {}
});

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Email required")
        .email("Email not valid"),
    password: yup.string().required("Password required"),
    firstname: yup.string().required("First required"),
    lastname: yup.string().required("Last name required")
});

interface IProps extends NavigationScreenProps {}

export default class WelcomeScreen extends React.Component<IProps> {
    static navigationOptions = {
        title: "Register"
    };

    onRegistrationSuccess = () => {
        this.props.navigation.navigate("LoginScreen", {
            message: "Registration success"
        });
    };

    render() {
        const self = this;
        return (
            <ScrollView style={styles.container}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        username: "",
                        password: "",
                        firstname: "",
                        lastname: ""
                    }}
                    onSubmit={async (values, action) => {
                        try {
                            const response = await authAction.registerUser(
                                values.username,
                                values.password,
                                values.firstname,
                                values.lastname
                            );
                            const { status, message } = response.data;
                            if (status !== 200) {
                                action.setStatus({ message });
                            } else {
                                self.onRegistrationSuccess();
                            }
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
                        isSubmitting
                    }) => (
                        <View style={styles.form}>
                            {isSubmitting && (
                                <View style={styles.loadingIndicatorContainer}>
                                    <ActivityIndicator size="large" />
                                </View>
                            )}
                            <View style={styles.formField}>
                                <Text>Email: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("username")}
                                    value={values.username}
                                />
                                {status && status.username ? (
                                    <Text style={styles.errorText}>
                                        {status.username}
                                    </Text>
                                ) : (
                                    <Text style={styles.errorText}>
                                        {errors.username}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formField}>
                                <Text>Password: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {status && status.password ? (
                                    <Text style={styles.errorText}>
                                        {status.password}
                                    </Text>
                                ) : (
                                    <Text style={styles.errorText}>
                                        {errors.password}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formField}>
                                <Text>First name: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("firstname")}
                                    value={values.firstname}
                                />
                                {status && status.firstname ? (
                                    <Text style={styles.errorText}>
                                        {status.firstname}
                                    </Text>
                                ) : (
                                    <Text style={styles.errorText}>
                                        {errors.firstname}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formField}>
                                <Text>Last name: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("lastname")}
                                    value={values.lastname}
                                />
                                {status && status.lastname ? (
                                    <Text style={styles.errorText}>
                                        {status.lastname}
                                    </Text>
                                ) : (
                                    <Text style={styles.errorText}>
                                        {errors.lastname}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.submitButtonContainer}>
                                <Button
                                    onPress={handleSubmit}
                                    title="Register"
                                    disabled={isSubmitting}
                                />
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        );
    }
}
