import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput,
    Button
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as yup from "yup";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native";
import authAction from "../actions/authAction";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loginForm: {
        paddingTop: 30
    },
    loginFormHeader: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    appLogo: {
        width: 200,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    loginFormBody: {
        alignItems: "flex-start",
        marginHorizontal: 50
    },
    loginFormHeaderText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
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
        marginTop: 8,
        alignItems: "flex-end"
    },
    registerContainer: {
        marginTop: 30,
        alignItems: "center"
    },
    registerLink: {
        paddingVertical: 15
    },
    registerLabelText: {
        fontSize: 14,
        color: "gray"
    },
    registerLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    },
    messageContainer: {
        borderWidth: 1,
        borderColor: "#2e78b7",
        padding: 15,
        alignItems: "center"
    },
    messageText: {
        fontSize: 14,
        color: "#2e78b7",
        textAlign: "center"
    }
});

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Email required")
        .email("Email not valid"),
    password: yup.string().required("Password required")
});

interface IProps extends NavigationScreenProps {}

export default class WelcomeScreen extends React.Component<IProps> {
    static navigationOptions = {
        header: null
    };

    navigateToRegister = async () => {
        this.props.navigation.navigate("RegisterScreen");
    };

    onLoginSuccess = () => {
        this.props.navigation.navigate("MainScreen");
    };

    render() {
        const message = this.props.navigation.getParam("message");
        const self = this;
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.loginForm}
            >
                <View style={styles.loginFormHeader}>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.appLogo}
                    />
                    <Text style={styles.loginFormHeaderText}>Productify</Text>
                    {message && (
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{message}</Text>
                        </View>
                    )}
                </View>

                <Formik
                    validationSchema={schema}
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, action) => {
                        try {
                            action.setStatus({});
                            const response = await authAction.loginUser(
                                values.username,
                                values.password
                            );
                            const { status, message } = response.data;
                            action.setStatus({ message });
                            if (status === 200) {
                                self.onLoginSuccess();
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
                        <View style={styles.loginFormBody}>
                            {status && status.message && (
                                <Text style={styles.errorText}>
                                    {status.message.toUpperCase()}
                                </Text>
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
                            <View style={styles.submitButtonContainer}>
                                <Button
                                    onPress={handleSubmit}
                                    title="Submit"
                                    disabled={isSubmitting}
                                />
                            </View>
                        </View>
                    )}
                />
                <View style={styles.registerContainer}>
                    <Text style={styles.registerLabelText}>
                        {`Don't have an account?`}
                    </Text>
                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={this.navigateToRegister}
                    >
                        <Text style={styles.registerLinkText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
