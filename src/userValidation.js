import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import ReactLoading from "react-loading";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import md5 from "js-md5";
import Cookies from "universal-cookie";

const GET_User = gql`
    query getUser($alias: String!) {
        getUser(alias: $alias) {
            name
            alias
            role
            password
            userLevel
        }
    }
`;

const cookies = new Cookies();

class UserValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAlias: this.props.location.state.userAlias,
            encrpytPassword: md5(this.props.location.state.password)
        };
    }

    render() {
        return (
            <div>
                <Query
                    query={GET_User}
                    variables={{
                        alias: this.props.location.state.userAlias
                    }}
                >
                    {({ loading, error, data }) => {
                        if (error) {
                            console.log(error);
                            return <div>Some error occurred.</div>;
                        }

                        if (loading) {
                            console.log("loading");
                            return (
                                <div>
                                    <div className="validationPage show-grid">
                                        <div
                                            style={{
                                                ...styles,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                margin: "0 auto",
                                                position: "relative",
                                                top: "25vh"
                                            }}
                                        >
                                            <ReactLoading
                                                type={"bars"}
                                                color={"#5389b5"}
                                                height={100}
                                                width={50}
                                            />
                                        </div>
                                        <div
                                            xs={12}
                                            md={12}
                                            className="validationLodingText"
                                        >
                                            Please wait while we are loading...
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (data === null) {
                            console.log("No User ===================");
                            this.props.history.push(`/`);
                            return null;
                        } else if (
                            data.getUser != null &&
                            data.getUser.password == this.state.encrpytPassword
                        ) {
                            var tempAuth = this.props.location.state.userAlias;
                            var currentDate = new Date();
                            var expiresDate = new Date(
                                currentDate.setDate(currentDate.getDate() + 1)
                            );
                            cookies.set("loginAuthTP", tempAuth, {
                                path: "/",
                                expires: expiresDate
                            });
                            this.props.history.push(`/home`);
                            return null;
                        } else {
                            console.log("No User ===================");
                            this.props.history.push(`/`);
                            return null;
                        }
                    }}
                </Query>
            </div>
        );
    }
}

export default UserValidation;

const styles = {};
