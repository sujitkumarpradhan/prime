import React, { Component, PropTypes } from "react";
import axios from "axios";

import "./Presentation.css";
import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GridLoader } from "react-spinners";
import { css } from "react-emotion";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            name
            createdAt
            lastModified
            designersAlias
            BannerCarousel {
                items {
                    id
                    AdvertiserID
                    Platform
                    Placement
                    SrcMain
                    Width
                    Height
                    CommentMain
                    ApprovalMain
                    CommentBackup
                    ApprovalBackup
                    SrcBackup
                }
            }
            FireTablet {
                items {
                    id
                    Gen7L
                    Gen7P
                    Gen6L
                    Gen6P
                    Gen5L
                    Gen5P
                    GenMultiple
                    Vso
                    TopInterface
                    BottomInterface
                    Approval
                    Comment
                    PaddleText
                }
            }
        }
    }
`;

const scope = this;

class PDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            base64: "",
            loading: true
        };

        this.passHtmlToMail = this.passHtmlToMail.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state.designersAlias);
        setTimeout(() => {
            this.passHtmlToMail(this.props.location.state.designersAlias);
        }, 5000);
    }

    passHtmlToMail(alias) {
        var temp = document.getElementById("divToPrint");
        var htmlToSendString = temp.innerHTML;

        html2canvas(document.querySelector("#divToPrint")).then(canvas => {
            document.body.appendChild(canvas);
        });

        const filename = "ThisIsYourPDFFilename.pdf";

        // html2canvas(document.querySelector('#divToPrint'), {scale: 1}).then(canvas => {
        // 	let pdf = new jsPDF("l", "mm", "a4");
        // 	pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0);
        // 	pdf.save(filename);
        // });

        htmlToSendString = "'" + htmlToSendString + "'";
        console.log(htmlToSendString);
        // Pass Value to API
        axios({
            method: "POST",
            url: "http://52.68.215.248/send",
            data: {
                name: "Tentpole-Feedback",
                email: "presentation-tool@amazon.com",
                message: htmlToSendString,
                to: alias
            }
        })
            .then(response => {
                console.log("Response for emsil", response.data.msg);
                if (response.data.msg === "success") {
                    alert("Email sent to designer.");
                    // window.history.back();
                    this.props.history.push(this.props.location.state.path);
                } else if (response.data.msg === "fail") {
                    alert("Message failed to send.");
                    this.props.history.push(this.props.location.state.path);
                }
            })
            .catch(error => {
                alert(error + ". Please try again.");
                this.props.history.push(this.props.location.state.path);
                // console.log("Response for emsil", error);
            });
    }

    render() {
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
                        return <div>Loading...</div>;
                    }

                    // if (data) {
                    //     if (data.getAdvertiser || data.getAdvertiser.BannerCarousel || !data.getAdvertiser.BannerCarousel.length)
                    //         window.history.back();

                    //     var temp = 0;
                    //     for (var i = 0; i < data.getAdvertiser.BannerCarousel.length; i++) {
                    //         if (!data.getAdvertiser.BannerCarousel.items[0].ApprovalMain == "true") {
                    //             temp = 1;
                    //             break;
                    //         }
                    //     }

                    //     for (var i = 0; i < data.getAdvertiser.FireTablet.length; i++) {
                    //         if (!data.getAdvertiser.BannerCarousel.items[0].ApprovalMain == "true") {
                    //             temp = 1;
                    //             break;
                    //         }
                    //     }

                    //     if (temp == 0) {
                    //         window.history.back();
                    //     }

                    // }

                    return (
                        <div>
                            <div className="loaderMain sweet-loading">
                                <GridLoader
                                    className="override"
                                    sizeUnit={"px"}
                                    size={40}
                                    color="#8eb7e8"
                                    loading={this.state.loading}
                                />
                            </div>
                            <div id="divToPrint">
                                <div style={{ margin: "20px" }}>
                                    <p
                                        style={{
                                            fontSize: "24px",
                                            textAlign: "center",
                                            fontWeight: "500",
                                            letterSpacing: "1px",
                                            color: "#ffffff",
                                            padding: "10px",
                                            backgroundColor: "#008000"
                                        }}
                                    >
                                        * * DONOT REPLY TO THIS EMAIL * *
                                    </p>

                                    <p
                                        style={{
                                            fontSize: "22px",
                                            textAlign: "center",
                                            fontWeight: "300",
                                            letterSpacing: "1px",
                                            marginBottom: "80px",
                                            lineHeight: "30px"
                                        }}
                                    >
                                        Feedback from Tentpole review on
                                        Presentation ID
                                        <br />
                                        <span
                                            style={{
                                                fontWeight: "800"
                                            }}
                                        >
                                            {data.getAdvertiser.name}
                                        </span>
                                    </p>
                                    {data.getAdvertiser.BannerCarousel.items.map(
                                        (items, index) => {
                                            return (
                                                <div key={index}>
                                                    <div
                                                        style={{
                                                            display:
                                                                items.ApprovalMain &&
                                                                !(
                                                                    items.ApprovalMain ===
                                                                    "true"
                                                                )
                                                                    ? "block"
                                                                    : items.CommentMain
                                                                    ? "block"
                                                                    : "none",
                                                            margin: "0 0 45px 0"
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "17px",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            Main:{" "}
                                                            {items.Platform} -{" "}
                                                            {items.Placement} (
                                                            {items.Width}x
                                                            {items.Height})
                                                        </p>
                                                        <div
                                                            style={{
                                                                display: "block"
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    items.SrcMain
                                                                }
                                                                style={{
                                                                    width:
                                                                        items.Platform ===
                                                                            "Mobile" ||
                                                                        items.Platform ===
                                                                            "LandingPage" ||
                                                                        items.Width ===
                                                                            970
                                                                            ? "50%"
                                                                            : "auto"
                                                                }}
                                                            />

                                                            <div
                                                                style={{
                                                                    margin:
                                                                        "4px 0 0 0",
                                                                    fontSize:
                                                                        "15px",
                                                                    letterSpacing:
                                                                        "0.2px"
                                                                }}
                                                            >
                                                                {
                                                                    items.CommentMain
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            display:
                                                                items.ApprovalBackup &&
                                                                !(
                                                                    items.ApprovalBackup ===
                                                                    "true"
                                                                )
                                                                    ? "block"
                                                                    : items.CommentBackup
                                                                    ? "block"
                                                                    : "none",
                                                            margin: "0 0 45px 0"
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "17px",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            Backup:{" "}
                                                            {items.Platform} -{" "}
                                                            {items.Placement} (
                                                            {items.Width}x{" "}
                                                            {items.Height})
                                                        </p>
                                                        <div
                                                            style={{
                                                                display: "block"
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    items.SrcBackup
                                                                }
                                                                style={{
                                                                    width:
                                                                        items.Platform ===
                                                                            "Mobile" ||
                                                                        items.Platform ===
                                                                            "LandingPage" ||
                                                                        items.Width ===
                                                                            970
                                                                            ? "50%"
                                                                            : "auto"
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    margin:
                                                                        "4px 0 0 0",
                                                                    fontSize:
                                                                        "15px",
                                                                    letterSpacing:
                                                                        "0.2px"
                                                                }}
                                                            >
                                                                {
                                                                    items.CommentBackup
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}

                                    {data.getAdvertiser.FireTablet.items.map(
                                        (items, index) => {
                                            return (
                                                <div key={index}>
                                                    <div
                                                        style={{
                                                            display:
                                                                items.Approval &&
                                                                !(
                                                                    items.Approval ===
                                                                    "true"
                                                                )
                                                                    ? "block"
                                                                    : items.Comment
                                                                    ? "block"
                                                                    : "none",
                                                            margin: "0 0 45px 0"
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "17px",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            FireTable: Package -{" "}
                                                            {index + 1}
                                                        </p>
                                                        <div
                                                            style={{
                                                                display: "block"
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    items.Gen7L
                                                                }
                                                                style={{
                                                                    width: "50%"
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    margin:
                                                                        "5px 0 0 0px",
                                                                    fontSize:
                                                                        "15px",
                                                                    letterSpacing:
                                                                        "0.2px"
                                                                }}
                                                            >
                                                                {items.Comment}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}

                                    <div
                                        style={{
                                            fontSize: "14px",
                                            textAlign: "center",
                                            fontWeight: "300",
                                            letterSpacing: "1px",
                                            padding: "20px 0",
                                            borderTop: "1px solid #000000",
                                            borderBottom: "1px solid #000000",
                                            lineHeight: "25px"
                                        }}
                                    >
                                        On feedback amend please create a new
                                        Presentation with version number next to
                                        it. <br />
                                        Example: 00000000_Advertizer_v2
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "12px",
                                            textAlign: "center",
                                            fontWeight: "300",
                                            letterSpacing: "1px",
                                            padding: "20px 0 0 0"
                                        }}
                                    >
                                        Presentation tool URL:{" "}
                                        <a
                                            href="http://dss-tentpole-presentation-tool.s3-website-ap-northeast-1.amazonaws.com"
                                            target="_blank"
                                        >
                                            http://dss-tentpole-presentation-tool.s3-website-ap-northeast-1.amazonaws.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const styles = {
    pageStyle: {
        display: "block"
    }
};
export default PDF;
