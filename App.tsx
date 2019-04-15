import React from "react";
import { Provider } from "mobx-react";
import { stores } from "./src/stores";
import Main from "./src/Main";
import { configure } from "mobx";

configure({ enforceActions: "always" });

export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Main />
            </Provider>
        );
    }
}
