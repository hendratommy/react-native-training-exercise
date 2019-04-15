import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../styles/colors";

interface IProps {
    name: string;
    focused?: boolean;
    size: number;
}

export default class VectorIcon extends React.Component<IProps> {
    static defaultProps = {
        size: 26
    };

    render() {
        return (
            <Ionicons
                name={this.props.name}
                size={this.props.size}
                style={{ marginBottom: -3 }}
                color={
                    this.props.focused
                        ? Colors.tabIconSelected
                        : Colors.tabIconDefault
                }
            />
        );
    }
}
