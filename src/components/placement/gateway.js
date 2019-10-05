import React, { Component } from "react";
import update from "react-addons-update";

import Page from "../layout/Page";
import BannerWrapper from "../sizes/bannerWrapper";
import pageBgPrimeBg from "./images/DesktopGatewayBg.jpg";
import pageBgPD19 from "./images/PD-DesktopGatewayBg_PD2019.jpg";
import pageBgBFCMBg from "./images/DesktopGatewayBg_BFCM.jpg";
import pageBgBFCMBgCA from "./images/DesktopGatewayBg_BFCMCA.jpg";
import BannerWrappers from "../sizes/bannerWrappers";

class Gateway extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("CreatedAt:", this.props.createdAt);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent == "Prime Day" &&
                            this.props.createdAt.includes("2019") != true
                                ? "initial"
                                : "none"
                    }}
                >
                    <div style={styles.pageBgPrime}>
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={480}
                            height={200}
                            top={516}
                            left={286}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={480}
                            height={400}
                            top={970}
                            left={-286}
                        />
                    </div>
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>

                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "BFCM" &&
                            this.props.locale != "CA"
                                ? "initial"
                                : "none"
                    }}
                >
                    <div style={styles.pageBgBFCM}>
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={300}
                            height={250}
                            top={516}
                            left={523}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={970}
                            height={250}
                            top={970}
                            left={-1}
                        />
                    </div>
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>

                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "Prime Day" &&
                            this.props.createdAt.includes("2019")
                                ? "initial"
                                : "none"
                    }}
                >
                    <div style={styles.pageBgPrime19}>
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={300}
                            height={250}
                            top={516}
                            left={553}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={970}
                            height={250}
                            top={970}
                            left={0}
                        />
                    </div>
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>

                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "BFCM" &&
                            this.props.locale == "CA"
                                ? "initial"
                                : "none"
                    }}
                >
                    <div style={styles.pageBgBFCMCA}>
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={1500}
                            height={300}
                            top={86}
                            left={0}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={300}
                            height={250}
                            top={147}
                            left={556}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={970}
                            height={250}
                            top={544}
                            left={0}
                        />
                    </div>
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>
            </div>
        );
    }
}
const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    page: {
        width: "100%",
        zIndex: -1
    },
    pageBgPrime: {
        backgroundRepeat: "no-repeat",
        height: "3030px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${pageBgPrimeBg})`,
        top: 30,
        overflowX: "hidden"
    },

    pageBgBFCM: {
        backgroundRepeat: "no-repeat",
        height: "3280px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${pageBgBFCMBg})`,
        top: 30,
        overflowX: "hidden"
    },
    pageBgPrime19: {
        backgroundRepeat: "no-repeat",
        height: "2780px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${pageBgPD19})`,
        top: 30,
        overflowX: "hidden"
    },

    pageBgBFCMCA: {
        backgroundRepeat: "no-repeat",
        height: "3450px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${pageBgBFCMBgCA})`,
        top: 30,
        overflowX: "hidden"
    }
};
export default Gateway;
