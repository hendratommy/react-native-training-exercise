import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
    Alert
} from "react-native";
import WebBrowser from "react-native-inappbrowser-reborn";
import { NavigationScreenProps } from "react-navigation";
import { observer, inject } from "mobx-react";
import { IAppStore } from "../stores/AppStore";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 200,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3, width: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    }
});

interface IProps extends NavigationScreenProps {
    appStore?: IAppStore;
}

@inject("appStore")
@observer
export default class HomeScreen extends React.Component<IProps> {
    static navigationOptions = {
        header: null
    };

    logout = () => {
        this.props.appStore!.invalidateSession();
        // this.props.navigation.navigate("LoginScreen");
    };

    render() {
        // const { sessionExpiredIn } = this.props.appStore!;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.welcomeImage}
                        />
                    </View>

                    <View style={styles.getStartedContainer}>
                        {this._maybeRenderDevelopmentModeWarning()}

                        <Text style={styles.getStartedText}>
                            Get started by opening
                        </Text>

                        <View
                            style={[
                                styles.codeHighlightContainer,
                                styles.homeScreenFilename
                            ]}
                        >
                            <Text
                                style={[
                                    styles.codeHighlightText,
                                    { fontFamily: "space-mono" }
                                ]}
                            >
                                src/screens/HomeScreen.tsx
                            </Text>
                        </View>

                        <Text style={styles.getStartedText}>
                            Change this text and your app will automatically
                            reload.
                        </Text>
                    </View>

                    <View style={styles.helpContainer}>
                        <TouchableOpacity
                            onPress={this._handleHelpPress}
                            style={styles.helpLink}
                        >
                            <Text style={styles.helpLinkText}>
                                Help, it didn’t automatically reload!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <Text style={styles.tabBarInfoText}>
                        Your session will be expired in:
                    </Text>

                    {/* <View
                        style={[
                            styles.codeHighlightContainer,
                            styles.navigationFilename
                        ]}
                    >
                        <Text
                            style={[
                                styles.codeHighlightText,
                                { fontFamily: "space-mono" }
                            ]}
                        >
                            {`${Math.ceil(sessionExpiredIn / 1000)}s`}
                        </Text>
                    </View> */}

                    <TouchableOpacity
                        onPress={this.logout}
                        style={[styles.helpLink]}
                    >
                        <Text
                            style={[
                                styles.helpLinkText,
                                { fontFamily: "space-mono" }
                            ]}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text
                    onPress={this._handleLearnMorePress}
                    style={styles.helpLinkText}
                >
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you
                    can use useful development tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full
                    speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = async () => {
        const url =
            "https://docs.expo.io/versions/latest/guides/development-mode";
        try {
            if (await WebBrowser.isAvailable()) {
                await WebBrowser.open(url);
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    _handleHelpPress = async () => {
        const url =
            "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes";
        try {
            if (await WebBrowser.isAvailable()) {
                await WebBrowser.open(url);
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
}
