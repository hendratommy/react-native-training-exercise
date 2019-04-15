import React from "react";
import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
    ActivityIndicator
} from "react-native";
import { inject, observer } from "mobx-react";
import { IAppStore } from "./stores/AppStore";
import AppNavigator from "./navigation/AppNavigator";

interface IProps {
    appStore?: IAppStore;
    skipLoadingScreen?: boolean;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

@inject("appStore")
@observer
export default class Main extends React.Component<IProps> {
    componentDidMount() {
        setTimeout(() => {
            this.onLoadingFinished();
        }, 3000);
    }

    onLoadingFinished = () => {
        this.props.appStore!.setLoading(false);
    };

    render() {
        const { skipLoadingScreen } = this.props;
        const { loading } = this.props.appStore!;
        if (loading && !skipLoadingScreen) {
            return <ActivityIndicator size="large" />;
        } else {
            return (
                <View style={styles.root}>
                    {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </View>
            );
        }
    }
}
