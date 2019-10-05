import React from "react";
import Presentation from "./Presentation";
import App from "./App";
import md5 from "js-md5";
import Page from "./components/layout/Page";
import { withRouter } from "react-router-dom";
import characters from "./images/PrimeDay_Cardboard_0018_CHARACTER_HEADPHONE.png";
import plane from "./images/29_PD18_STYLE_PLANE_W_BANNER_001.png";
import "./login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAlias: "",
            password: "",
            userAliasValid: false
        };
        this.loginProcess = this.loginProcess.bind(this);
        this.handleUserAlias = this.handleUserAlias.bind(this);
        this.handleUserPassword = this.handleUserPassword.bind(this);
        this.loginButtonCheck = this.loginButtonCheck.bind(this);
    }

    loginProcess() {
        if (
            this.state.userAlias.trim() != "" &&
            this.state.userAlias.trim() != null &&
            this.state.userAliasValid == true
        ) {
            console.log("going to validate page");
            this.props.history.push({
                pathname: `/validate/${this.state.userAlias}`,
                state: { password: this.state.password }
            });
        } else if (this.state.userAlias == "") {
            console.log("Wrong data");
            this.setState({ userAliasValid: false });
        }
    }

    handleUserAlias(e) {
        if (/^[a-zA-Z]+$/.test(e.target.value)) {
            this.setState({ userAlias: e.target.value });
            this.setState({ userAliasValid: true });
        } else if (e.target.value == "") {
            this.setState({ userAliasValid: true });
            this.setState({ userAlias: e.target.value });
        } else {
            this.setState({ userAlias: e.target.value });
            this.setState({ userAliasValid: false });
        }
    }

    handleUserPassword(e) {
        this.setState({ password: e.target.value });
        console.log("Enter in login page =================", e.key);
        // if (e.key === "Enter") {
        //   this.loginProcess();
        // }
    }

    loginButtonCheck(e) {
        if (e.key === "Enter") {
            this.loginProcess();
        }
    }

    render() {
        return (
            <div className="loginBG">
                <div className="show-grid">
                    <div className="Logo">
                        <img alt="Plane" src={plane} className="plane" />
                        {/* <div className="LogoCopy">Presentation Tool</div> */}
                    </div>
                    <div xs={12} md={12}>
                        <div className="show-grid" className="centerPannel">
                            <div xs={2} md={2} />
                            <div xs={4} md={4} className="loginPannel">
                                <div className="show-grid">
                                    <div
                                        xs={12}
                                        md={12}
                                        className="loginPannelHeading"
                                    >
                                        Login to Fugu
                                    </div>

                                    <div xs={12} md={12}>
                                        {/* <span className="loginInputText">
                                            Alias
                                        </span> */}
                                        <input
                                            className="aliasInput"
                                            placeholder="Alias (without @amazon.com)"
                                            type="text"
                                            pattern="[a-zA-Z]"
                                            value={this.state.userAlias}
                                            onChange={e =>
                                                this.handleUserAlias(e)
                                            }
                                        />
                                    </div>

                                    <div xs={12} md={12}>
                                        {/* <span className="loginInputText">
                                            Password
                                        </span> */}
                                        <input
                                            className="aliasInput"
                                            placeholder="Password"
                                            type="password"
                                            pattern="[a-zA-Z]"
                                            value={this.state.password}
                                            onChange={e =>
                                                this.handleUserPassword(e)
                                            }
                                            onKeyDown={e =>
                                                this.loginButtonCheck(e)
                                            }
                                        />
                                    </div>

                                    <div xs={12} md={12}>
                                        <button
                                            className="buttonClick"
                                            onClick={() => {
                                                this.props.history.push({
                                                    pathname: `/validate`,
                                                    state: {
                                                        password: this.state
                                                            .password,
                                                        userAlias: this.state
                                                            .userAlias
                                                    }
                                                });
                                            }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img
                            alt="PrimeDay character"
                            src={characters}
                            className="character"
                        />
                    </div>
                </div>
                <Page
                    style={styles.pageStyle}
                    description="Type creative comments here..."
                />
            </div>
        );
    }
}

export default withRouter(Login);
const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    page: {
        width: "100%",
        zIndex: -1
    }
};
