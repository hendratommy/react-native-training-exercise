import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../styles/colors";

interface IProps {
    name: string;
    focused?: boolean;
    size: number;
    color?: string;
}

export default class VectorIcon extends React.Component<IProps> {
    static defaultProps = {
        size: 26
    };

    render() {
        const { name, size, focused, ...rest } = this.props;
        return (
            <Ionicons
                name={name}
                size={size}
                style={{ marginBottom: -3 }}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                {...rest}
            />
        );
    }
}
