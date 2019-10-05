import React, { Component } from "react";
import Dropzone from "react-dropzone";
import ReactLoading from "react-loading";
import Approval from "../approval/approval.js";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_Destination = gql`
    query GetDestination($id: ID!) {
        getDestination(id: $id) {
            id
            DestinationURLMain
            DestinationURLBackup
            AdvertiserID
            CreativeVersion
        }
    }
`;

class Banner extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            isApproved: null,
            bannerError: null,
            destination: null
        };
        console.log("LP:", this.props.platform, "Width", this.props.width);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.destination === prevState.destination) {
            return null;
        }

        if (!nextProps.destination) {
            return null;
        }

        return {
            destination: nextProps.destination
        };
    }

    onDropHandler = (acceptedFiles, rejectedFiles) => {
        let errors = null;
        let width = 0;
        let height = 0;
        if (this.props.width === 414) {
            width = this.props.width * 3;
            height = this.props.height * 3;
        } else if (
            this.props.width === 980 ||
            this.props.width === 1920 ||
            this.props.width === 3000 ||
            this.props.width === 2560 ||
            this.props.width === 1242 ||
            this.props.width === 160
        ) {
            width = this.props.width;
            height = this.props.height;
        } else if (
            this.props.width === 300 &&
            this.props.platform === "Desktop"
        ) {
            width = this.props.width;
            height = this.props.height;
        } else {
            width = this.props.width * 2;
            height = this.props.height * 2;
        }
        acceptedFiles.forEach(file => {
            if (acceptedFiles.length > 0) {
                var acceptedImg = acceptedFiles[0];
                var image = new Image();
                image.addEventListener(
                    "load",
                    function() {
                        if (image.width !== width) {
                            errors = `Image dimensions ${image.width} X ${
                                image.height
                            } do not match required image dimensions ${width} X ${height}`;
                        } else if (image.height !== height) {
                            errors = `Image dimensions ${image.width} X ${
                                image.height
                            } do not match required image dimensions ${width} X ${height}`;
                        }

                        // display errors or do success thing
                        if (errors != null) {
                            this.setState({ bannerError: errors });
                        } else if (errors === null) {
                            console.log("image should be stored");
                            this.props.onSrcChange(
                                acceptedFiles[0].preview,
                                this.props.type,
                                this.props.index,
                                new Date().toGMTString()
                            );
                            var formData = new FormData();
                            formData.append("data", file);
                            const response = fetch(
                                `${process.env.REACT_APP_BACKEND_URL}/upload`,
                                {
                                    method: "POST",
                                    body: formData
                                }
                            );
                            response
                                .then(response => response.json())
                                .then(response => {
                                    this.props.onSrcChange(
                                        response.url,
                                        this.props.type,
                                        this.props.index,
                                        new Date().toGMTString()
                                    );
                                });
                        }
                    }.bind(this)
                );

                image.src = acceptedImg.preview;
                console.log(errors);
                console.log("width", image.dimensions);
            }
        });
    };

    render() {
        return (
            <Mutation
                refetchQueries={[
                    {
                        query: GET_Destination,
                        variables: {
                            id: this.props.DestinationID
                        }
                    }
                ]}
                mutation={gql`
                    mutation updateDestination(
                        $ID: ID!
                        $DestinationURLMain: String
                        $DestinationURLBackup: String
                    ) {
                        updateDestination(
                            input: {
                                id: $ID
                                DestinationURLMain: $DestinationURLMain
                                DestinationURLBackup: $DestinationURLBackup
                            }
                        ) {
                            id
                        }
                    }
                `}
            >
                {(updateDestination, { loading }) => {
                    return (
                        <Query
                            query={GET_Destination}
                            variables={{
                                id: this.props.DestinationID
                            }}
                        >
                            {({ loading, error, data }) => {
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
                                                height={80}
                                                width={30}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div>
                                        <div style={styles.mainDiv}>
                                            <Dropzone
                                                style={{}}
                                                //disableClick={true}
                                                accept="image/*"
                                                multiple={false}
                                                onDrop={this.onDropHandler}
                                            >
                                                {this.props.src ? (
                                                    <div>
                                                        <img
                                                            style={{
                                                                ...styles.banner,
                                                                width:
                                                                    this.props
                                                                        .platform ===
                                                                        "FireTV" ||
                                                                    this.props
                                                                        .platform ===
                                                                        "LandingPage"
                                                                        ? this
                                                                              .props
                                                                              .width /
                                                                              2 +
                                                                          "px"
                                                                        : (this
                                                                              .props
                                                                              .width ===
                                                                              970 ||
                                                                              this
                                                                                  .props
                                                                                  .width ===
                                                                                  1280) &&
                                                                          this
                                                                              .props
                                                                              .platform ===
                                                                              "Mobile"
                                                                        ? this
                                                                              .props
                                                                              .width /
                                                                              1.75 +
                                                                          "px"
                                                                        : this
                                                                              .props
                                                                              .width +
                                                                          "px",
                                                                height:
                                                                    this.props
                                                                        .platform ===
                                                                        "FireTV" ||
                                                                    this.props
                                                                        .platform ===
                                                                        "LandingPage"
                                                                        ? this
                                                                              .props
                                                                              .height /
                                                                              2 +
                                                                          "px"
                                                                        : (this
                                                                              .props
                                                                              .width ===
                                                                              970 ||
                                                                              this
                                                                                  .props
                                                                                  .width ===
                                                                                  1280) &&
                                                                          this
                                                                              .props
                                                                              .platform ===
                                                                              "Mobile"
                                                                        ? this
                                                                              .props
                                                                              .height /
                                                                              1.75 +
                                                                          "px"
                                                                        : this
                                                                              .props
                                                                              .height +
                                                                          "px"
                                                            }}
                                                            alt="banner main"
                                                            src={this.props.src}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            ...styles.amgSize,
                                                            width:
                                                                this.props
                                                                    .platform ===
                                                                    "FireTV" ||
                                                                this.props
                                                                    .platform ===
                                                                    "LandingPage"
                                                                    ? this.props
                                                                          .width /
                                                                          2 +
                                                                      "px"
                                                                    : (this
                                                                          .props
                                                                          .width ===
                                                                          970 ||
                                                                          this
                                                                              .props
                                                                              .width ===
                                                                              1280) &&
                                                                      this.props
                                                                          .platform ===
                                                                          "Mobile"
                                                                    ? this.props
                                                                          .width /
                                                                          1.75 +
                                                                      "px"
                                                                    : this.props
                                                                          .width +
                                                                      "px",
                                                            height:
                                                                this.props
                                                                    .platform ===
                                                                    "FireTV" ||
                                                                this.props
                                                                    .platform ===
                                                                    "LandingPage"
                                                                    ? this.props
                                                                          .height /
                                                                          2 +
                                                                      "px"
                                                                    : (this
                                                                          .props
                                                                          .width ===
                                                                          970 ||
                                                                          this
                                                                              .props
                                                                              .width ===
                                                                              1280) &&
                                                                      this.props
                                                                          .platform ===
                                                                          "Mobile"
                                                                    ? this.props
                                                                          .height /
                                                                          1.75 +
                                                                      "px"
                                                                    : this.props
                                                                          .height +
                                                                      "px",

                                                            backgroundColor:
                                                                this.props
                                                                    .type ===
                                                                "main"
                                                                    ? "#E4FDBF"
                                                                    : "#FFCFCF"
                                                        }}
                                                    >
                                                        AMG {this.props.width} X{" "}
                                                        {this.props.height}
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div
                                                style={{
                                                    ...styles.destination,
                                                    position: this.props
                                                        .approvalPadding
                                                        ? "relative"
                                                        : "",
                                                    left: this.props
                                                        .approvalPadding
                                                        ? "-280px"
                                                        : "",
                                                    top: this.props
                                                        .approvalPadding
                                                        ? "50px"
                                                        : ""
                                                }}
                                            >
                                                <a
                                                    href={
                                                        this.props.type ===
                                                        "main"
                                                            ? data
                                                                  .getDestination
                                                                  .DestinationURLMain
                                                            : data
                                                                  .getDestination
                                                                  .DestinationURLBackup
                                                    }
                                                    target="blank"
                                                >
                                                    <span
                                                        className="destination"
                                                        style={{
                                                            ...styles,
                                                            width: 300,

                                                            display:
                                                                this.props
                                                                    .type ===
                                                                "main"
                                                                    ? data
                                                                          .getDestination
                                                                          .DestinationURLMain
                                                                        ? "inline"
                                                                        : "none"
                                                                    : data
                                                                          .getDestination
                                                                          .DestinationURLBackup
                                                                    ? "inline"
                                                                    : "none"
                                                        }}
                                                    >
                                                        Destination URL{" "}
                                                        <i class="fas fa-external-link-alt" />
                                                    </span>
                                                    {/* <input
                                                        className="destination"
                                                        style={{
                                                            ...styles,
                                                            width: 300
                                                        }}
                                                        value={
                                                            this.props.type ===
                                                            "main"
                                                                ? data
                                                                      .getDestination
                                                                      .DestinationURLMain
                                                                : data
                                                                      .getDestination
                                                                      .DestinationURLBackup
                                                        }
                                                        placeholder="Destination goes here"
                                                        onChange={async e => {
                                                            const response = await this.setState(
                                                                {
                                                                    destination:
                                                                        e.target
                                                                            .value
                                                                }
                                                            );
                                                            console.log(
                                                                "destination:",
                                                                response,
                                                                this.state
                                                                    .destination
                                                            );
                                                        }}
                                                        onBlur={async () => {
                                                            await console.log(
                                                                "blur executed:"
                                                            );
                                                            this.props.type ===
                                                            "main"
                                                                ? updateDestination(
                                                                      {
                                                                          variables: {
                                                                              ID: this
                                                                                  .props
                                                                                  .DestinationID,
                                                                              DestinationURLMain: this
                                                                                  .state
                                                                                  .destination
                                                                          }
                                                                      }
                                                                  )
                                                                : updateDestination(
                                                                      {
                                                                          variables: {
                                                                              ID: this
                                                                                  .props
                                                                                  .DestinationID,
                                                                              DestinationURLBackup: this
                                                                                  .state
                                                                                  .destination
                                                                          }
                                                                      }
                                                                  );
                                                        }}
                                                    /> */}
                                                </a>
                                            </div>
                                            <div
                                                style={{
                                                    ...styles.error,
                                                    visibility:
                                                        this.state
                                                            .bannerError ===
                                                        null
                                                            ? "hidden"
                                                            : "visible",
                                                    position: this.props
                                                        .approvalPadding
                                                        ? "relative"
                                                        : "",
                                                    left: this.props
                                                        .approvalPadding
                                                        ? "-280px"
                                                        : "",
                                                    top: this.props
                                                        .approvalPadding
                                                        ? "50px"
                                                        : ""
                                                }}
                                            >
                                                <i className="fas fa-exclamation-triangle" />{" "}
                                                {this.state.bannerError}
                                            </div>
                                        </div>
                                        <Approval
                                            approvalPadding={
                                                this.props.approvalPadding
                                            }
                                            type={this.props.type}
                                            index={this.props.index}
                                            comment={this.props.comment}
                                            onCommentChange={
                                                this.props.onCommentChange
                                            }
                                            isApproved={this.props.isApproved}
                                            onApprovalChange={
                                                this.props.onApprovalChange
                                            }
                                            isVisibleCommentIcon={
                                                this.props.isVisibleCommentIcon
                                            }
                                        />
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
const styles = {
    mainDiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    banner: {
        display: "block",
        margin: "0 auto",
        position: "relative"
    },
    amgSize: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        backgroundColor: "#e680c9",
        position: "relative"
        // zIndex: -1
    },
    error: {
        fontSize: "11px",
        color: "#905020",
        padding: "3px"
    },
    destination: {
        fontSize: "13px",
        color: "#905020",
        paddingTop: "20px",
        width: 600
    }
};
export default Banner;
