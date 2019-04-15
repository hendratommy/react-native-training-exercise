import WebBrowser from "react-native-inappbrowser-reborn";
import React from "react";
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Linking
} from "react-native";
import { NavigationScreenProps } from "react-navigation";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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

interface IProps extends NavigationScreenProps {}

export default class WelcomeScreen extends React.Component<IProps> {
    static navigationOptions = {
        header: null
    };

    onProceed = () => {
        this.props.navigation.navigate("Main");
    };

    render() {
        return (
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
                    <Text style={styles.getStartedText}>
                        Get started by opening
                    </Text>

                    <View
                        style={[
                            styles.codeHighlightContainer,
                            styles.homeScreenFilename
                        ]}
                    >
                        <Text style={styles.codeHighlightText}>
                            src/screens/HomeScreen.tsx
                        </Text>
                    </View>

                    <Text style={styles.getStartedText}>
                        Change this text and your app will automatically reload.
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

                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                        This App still in early stage and maybe unstable.
                    </Text>
                    <Button title="I Understand" onPress={this.onProceed} />
                </View>
            </ScrollView>
        );
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
