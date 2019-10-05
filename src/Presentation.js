import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import update from "react-addons-update";
import "./Presentation.css";

import ApolloClient from "apollo-client";
import { graphql, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import Desktop from "./components/platform/Desktop";
import Tablet from "./components/platform/Tablet";
import Mobile from "./components/platform/Mobile";
import FireTablet from "./components/platform/FireTablet";
import FireTV from "./components/platform/FireTV";
import LandingPage from "./components/platform/LandingPage";
import { Link, Route, Switch } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import ReactLoading from "react-loading";
import md5 from "js-md5";
import Cookies from "universal-cookie";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            name
            landingPageURL
            designersAlias
            locale
            sfURL
            createdAt
            version
            gateway
            event
            contextual
            mGateway
            mEvent
            mContextual
            lp
            fireTablet
            fireTv
        }
    }
`;

const cookies = new Cookies();

class Presentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.itemName,
            tabState: "Desktop",
            title: "Advertiser/Brand",
            sfURL: this.props.match.params.itemSF,
            status: "Not ready"
        };

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {

        if (!cookies.get("loginAuthTP")) {
            this.props.history.push("/");
        }

        if (
            this.props.location.state &&
            this.props.location.state.email &&
            this.props.location.state.email == "false"
        ) {
            alert(
                "There is no banner which is rejected. Please update and try again."
            );
        } else {
            console.log("sfURL: ", this.props.match.params.itemSF);

            fetch(
                `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        assignmentId: this.props.match.params.itemSF
                    })
                }
            ).then(response => {
                response.json().then(response => {
                    this.setState({
                        status: response.status
                    });
                    console.log("status: ", this.state.status);
                });
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.name === prevState.name ||
            nextProps.sfURL === prevState.sfURL
        ) {
            return null;
        }

        if (!nextProps.name || !nextProps.sfURL) {
            return null;
        }

        return {
            name: nextProps.name,
            sfURL: nextProps.sfURL
        };
    }

    handleTabChange(event) {
        this.setState({
            tabState: event.target.id
        });
    }

    render() {
        return (
            <Mutation
                refetchQueries={[
                    {
                        query: GET_Advertiser,
                        variables: {
                            id: this.props.match.params.itemID
                        }
                    }
                ]}
                mutation={gql`
                    mutation UpdateAdvertiser($id: ID!, $name: String!) {
                        updateAdvertiser(input: { id: $id, name: $name }) {
                            id
                            name
                        }
                    }
                `}
            >
                {(updateName, { loading }) => {
                    return (
                        <Query
                            query={GET_Advertiser}
                            variables={{
                                id: this.props.match.params.itemID
                            }}
                        >
                            {({ loading, error, data, getAdvertiser }) => {
                                if (error) {
                                    console.log(error);
                                    return <div>Some error occurred.</div>;
                                }

                                if (loading) {
                                    return (
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
                                    );
                                }

                                return (
                                    <div className="App">
                                        <span
                                            style={styles.home}
                                            onClick={e =>
                                                this.props.history.push({
                                                    pathname: `/home`,
                                                    state: {
                                                        from: this.props
                                                            .location.pathname
                                                    }
                                                })
                                            }
                                        >
                                            Back to home
                                        </span>

                                        <div
                                            className="App-header"
                                            style={{
                                                display:
                                                    this.props.match.params
                                                        .itemEvent === "BFCM"
                                                        ? "none"
                                                        : "flex"
                                            }}
                                        >
                                            PrimeDay - Tentpole
                                        </div>
                                        <div
                                            className="App-header"
                                            style={{
                                                display:
                                                    this.props.match.params
                                                        .itemEvent === "BFCM"
                                                        ? "flex"
                                                        : "none"
                                            }}
                                        >
                                            BFCM - Tentpole
                                        </div>

                                        <div className="Brand-header">
                                            <span
                                                style={styles.pageTitle}
                                                value={this.state.name}
                                                className="_w_t"
                                            >
                                                {" "}
                                                {this.state.name}{" "}
                                            </span>
                                            <div className="blockSendButton">
                                                <label className="FilterAlt">
                                                    <span
                                                        style={{
                                                            ...styles,

                                                            color: "#ccc",
                                                            fontSize: 16,
                                                            fontWeight: 300
                                                        }}
                                                    >
                                                        Version:{" "}
                                                    </span>
                                                    <span
                                                        style={{
                                                            ...styles,
                                                            color: "#1fcdff",
                                                            fontWeight: 800,
                                                            fontSize: 16,
                                                            paddingRight: 30
                                                        }}
                                                    >
                                                        {
                                                            data.getAdvertiser
                                                                .version
                                                        }
                                                        {"    "}
                                                    </span>
                                                    <span
                                                        style={{
                                                            ...styles,

                                                            color: "#ccc",
                                                            fontSize: 16,
                                                            fontWeight: 300
                                                        }}
                                                    >
                                                        Status:{" "}
                                                    </span>
                                                    <span
                                                        style={{
                                                            ...styles,
                                                            paddingRight: 20,
                                                            color:
                                                                this.state
                                                                    .status ===
                                                                    "Tentpole approved" ||
                                                                this.state
                                                                    .status ===
                                                                    "Tentpole approved with changes"
                                                                    ? "#0cb781"
                                                                    : (() => {
                                                                          switch (
                                                                              this
                                                                                  .state
                                                                                  .status
                                                                          ) {
                                                                              case "Tentpole revision requested":
                                                                                  return "#de7f39";

                                                                              case "Tentpole review ready":
                                                                                  return "#e0a7f8";

                                                                              default:
                                                                                  return "#1fcdff";
                                                                          }
                                                                      })(),
                                                            fontSize: 16
                                                        }}
                                                    >
                                                        {this.state.status}
                                                    </span>
                                                </label>
                                                <Link
                                                    to={{
                                                        pathname: `/sendMailValidator/${this.props.match.params.userAlias}/${
                                                            this.props.match
                                                                .params.itemID
                                                        }`,
                                                        state: {
                                                            designersAlias:
                                                                data
                                                                    .getAdvertiser
                                                                    .designersAlias,
                                                            path: this.props
                                                                .location
                                                                .pathname,
                                                            sfURL:
                                                                data
                                                                    .getAdvertiser
                                                                    .sfURL
                                                        }
                                                    }}
                                                    className="sendMailButton"
                                                    // designersAlias={data.getAdvertiser.designersAlias}
                                                >
                                                    Notify designer
                                                </Link>

                                                <a
                                                    href={
                                                        data.getAdvertiser.sfURL
                                                    }
                                                    target="blank"
                                                    className="sendMailButton"
                                                    // designersAlias={data.getAdvertiser.designersAlias}
                                                >
                                                    View Salesforce
                                                </a>

                                                {/* <button className="sendMailButton">
                                                    Notify designer
                                                </button> */}
                                            </div>
                                        </div>
                                        <div className="Navigation">
                                            <a
                                                style={{
                                                    ...styles.NavLink,
                                                    display:
                                                        data.getAdvertiser
                                                            .gateway ||
                                                        data.getAdvertiser
                                                            .event ||
                                                        data.getAdvertiser
                                                            .contextual
                                                            ? "inline"
                                                            : "none",
                                                    backgroundColor:
                                                        this.state.tabState ===
                                                        "Desktop"
                                                            ? "#283544"
                                                            : ""
                                                }}
                                                id="Desktop"
                                                href="#"
                                                className="navLink"
                                                onClick={this.handleTabChange}
                                            >
                                                Desktop
                                            </a>
                                            <a
                                                style={{
                                                    ...styles.NavLink,
                                                    display:
                                                        data.getAdvertiser
                                                            .mGateway ||
                                                        data.getAdvertiser
                                                            .mEvent ||
                                                        data.getAdvertiser
                                                            .mContextual
                                                            ? "inline"
                                                            : "none",
                                                    backgroundColor:
                                                        this.state.tabState ===
                                                        "Mobile"
                                                            ? "#283544"
                                                            : ""
                                                }}
                                                id="Mobile"
                                                href="#"
                                                className="navLink"
                                                onClick={this.handleTabChange}
                                            >
                                                Mobile
                                            </a>
                                            <a
                                                style={{
                                                    ...styles.NavLink,
                                                    display: data.getAdvertiser
                                                        .fireTv
                                                        ? "inline"
                                                        : "none",
                                                    backgroundColor:
                                                        this.state.tabState ===
                                                        "FireTV"
                                                            ? "#283544"
                                                            : ""
                                                }}
                                                id="FireTV"
                                                href="#"
                                                className="navLink"
                                                onClick={this.handleTabChange}
                                            >
                                                Fire TV
                                            </a>

                                            <a
                                                style={{
                                                    ...styles.NavLink,
                                                    display: data.getAdvertiser
                                                        .fireTablet
                                                        ? "inline"
                                                        : "none",
                                                    backgroundColor:
                                                        this.state.tabState ===
                                                        "FireTablet"
                                                            ? "#283544"
                                                            : "",
                                                    visibility:
                                                        data.getAdvertiser
                                                            .createdAt.incl
                                                }}
                                                id="FireTablet"
                                                href="#"
                                                className="navLink"
                                                onClick={this.handleTabChange}
                                            >
                                                Fire Tablet
                                            </a>

                                            <a
                                                style={{
                                                    ...styles.NavLink,
                                                    display: data.getAdvertiser
                                                        .lp
                                                        ? "inline"
                                                        : "none",
                                                    backgroundColor:
                                                        this.state.tabState ===
                                                        "LandingPage"
                                                            ? "#283544"
                                                            : ""
                                                }}
                                                id="LandingPage"
                                                href="#"
                                                className="navLink"
                                                onClick={this.handleTabChange}
                                            >
                                                Landing Page
                                            </a>
                                        </div>
                                        {this.state.tabState === "Desktop" ? (
                                            <Desktop
                                                advertiserID={
                                                    this.props.match.params
                                                        .itemID
                                                }
                                                gateway={
                                                    data.getAdvertiser.gateway
                                                }
                                                event={data.getAdvertiser.event}
                                                contextual={
                                                    data.getAdvertiser
                                                        .contextual
                                                }
                                                MajorEvent={
                                                    this.props.match.params
                                                        .itemEvent
                                                }
                                                locale={
                                                    data.getAdvertiser.locale
                                                }
                                                platform="Desktop"
                                                createdAt={
                                                    data.getAdvertiser.createdAt
                                                }
                                            />
                                        ) : null}
                                        {this.state.tabState === "Tablet" ? (
                                            <Tablet />
                                        ) : null}
                                        {this.state.tabState === "Mobile" ? (
                                            <Mobile
                                                advertiserID={
                                                    this.props.match.params
                                                        .itemID
                                                }
                                                gateway={
                                                    data.getAdvertiser.mGateway
                                                }
                                                event={
                                                    data.getAdvertiser.mEvent
                                                }
                                                contextual={
                                                    data.getAdvertiser
                                                        .mContextual
                                                }
                                                MajorEvent={
                                                    this.props.match.params
                                                        .itemEvent
                                                }
                                                locale={
                                                    data.getAdvertiser.locale
                                                }
                                                platform="Mobile"
                                                createdAt={
                                                    data.getAdvertiser.createdAt
                                                }
                                            />
                                        ) : null}
                                        {this.state.tabState ===
                                        "FireTablet" ? (
                                            <FireTablet
                                                advertiserID={
                                                    this.props.match.params
                                                        .itemID
                                                }
                                                locale={
                                                    data.getAdvertiser.locale
                                                }
                                                createdAt={
                                                    data.getAdvertiser.createdAt
                                                }
                                            />
                                        ) : null}
                                        {this.state.tabState === "FireTV" ? (
                                            <FireTV
                                                advertiserID={
                                                    this.props.match.params
                                                        .itemID
                                                }
                                                platform="FireTV"
                                                createdAt={
                                                    data.getAdvertiser.createdAt
                                                }
                                            />
                                        ) : null}
                                        {this.state.tabState ===
                                        "LandingPage" ? (
                                            <LandingPage
                                                advertiserID={
                                                    this.props.match.params
                                                        .itemID
                                                }
                                                platform="LandingPage"
                                                landingPageURL={
                                                    data.getAdvertiser
                                                        .landingPageURL
                                                }
                                                createdAt={
                                                    data.getAdvertiser.createdAt
                                                }
                                            />
                                        ) : null}
                                    </div>
                                );
                            }}
                        </Query>
                    );
                }}
            </Mutation>
        );
    }
}

export default Presentation;

const styles = {
    home: {
        position: "absolute",
        top: 0,
        left: "20px",
        margin: 20,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Helvetica Neue",
        cursor: "pointer"
    },
    generate: {
        position: "absolute",
        top: 0,
        right: "20px",
        margin: 20,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Helvetica Neue",
        cursor: "pointer"
    },
    pageTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        display: "block",
        fontSize: "40px",
        fontWeight: "Regular",
        width: "960px",
        border: 0,
        margin: "0 auto",
        fontFamily: "Helvetica Neue",
        color: "#FFf",
        background: "transparent",
        bottom: 0,
        right: 0
    },
    NavLink: {
        textDecoration: "none",
        fontSize: 22,
        color: "#fff"
    }
};
