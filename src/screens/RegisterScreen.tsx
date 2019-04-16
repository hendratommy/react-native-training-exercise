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
        marginTop: 30
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
    username: yup
        .string()
        .required("Email required")
        .email("Email not valid"),
    password: yup.string().required("Password required"),
    firstname: yup.string().required("First required"),
    lastname: yup.string().required("Last name required")
});

interface IProps extends NavigationScreenProps {}

export default class RegisterScreen extends React.Component<IProps> {
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

                            <View style={styles.formField}>
                                <Text>Email: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("username")}
                                    value={values.username}
                                    keyboardType="email-address"
                                />
                                {touched.username &&
                                    ((status && status.username && (
                                        <Text style={styles.errorText}>
                                            {status.username}
                                        </Text>
                                    )) ||
                                        (errors && errors.username && (
                                            <Text style={styles.errorText}>
                                                {errors.username}
                                            </Text>
                                        )))}
                            </View>

                            <View style={styles.formField}>
                                <Text>Password: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {touched.password &&
                                    ((status && status.password && (
                                        <Text style={styles.errorText}>
                                            {status.password}
                                        </Text>
                                    )) ||
                                        (errors && errors.password && (
                                            <Text style={styles.errorText}>
                                                {errors.password}
                                            </Text>
                                        )))}
                            </View>

                            <View style={styles.formField}>
                                <Text>First name: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("firstname")}
                                    value={values.firstname}
                                />
                                {touched.firstname &&
                                    ((status && status.firstname && (
                                        <Text style={styles.errorText}>
                                            {status.firstname}
                                        </Text>
                                    )) ||
                                        (errors && errors.firstname && (
                                            <Text style={styles.errorText}>
                                                {errors.firstname}
                                            </Text>
                                        )))}
                            </View>

                            <View style={styles.formField}>
                                <Text>Last name: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={handleChange("lastname")}
                                    value={values.lastname}
                                />
                                {touched.lastname &&
                                    ((status && status.lastname && (
                                        <Text style={styles.errorText}>
                                            {status.lastname}
                                        </Text>
                                    )) ||
                                        (errors && errors.lastname && (
                                            <Text style={styles.errorText}>
                                                {errors.lastname}
                                            </Text>
                                        )))}
                            </View>
                            <View
                                style={[
                                    styles.centeredContainer,
                                    styles.submitButtonContainer
                                ]}
                            >
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
