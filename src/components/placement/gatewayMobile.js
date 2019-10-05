import React, { Component } from "react";
import "./Mobile.css";

import Page from "../layout/Page";
import pageMobile from "./images/pageMobile.png";
import pageMobile2 from "./images/pageMobile2.png";
import deviceIphone from "./images/deviceIphone.png";
import Mobile_1242x300 from "./images/CA-Mobile_1242x300.png";
import Mobile_1242x450 from "./images/Mobile_1242x450.jpeg";
import TabletCA from "./images/tabletCA_event.jpg";
import deviceTablet from "./images/deviceTablet.png";

import BannerWrapper from "../sizes/bannerWrapper";
import BannerWrappers from "../sizes/bannerWrappers";
import { relative } from "path";

class GatewayMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={styles.divWrapper}>
                <div
                    style={{
                        ...styles.mobile,
                        display: this.props.locale == "CA" ? "initial" : "none"
                    }}
                >
                    <img style={styles.pageHeader} src={Mobile_1242x450} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={414}
                        height={150}
                        top={124}
                        left={-30}
                    />
                </div>
                <div style={styles.mobile}>
                    <img style={styles.pageHeader} src={pageMobile} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={320}
                        height={50}
                        top={380}
                    />
                </div>

                <div
                    style={{
                        ...styles.mobile,
                        display: this.props.locale == "CA" ? "none" : "initial"
                    }}
                >
                    <img style={styles.pageHeader} src={pageMobile2} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={300}
                        height={250}
                        top={194}
                    />
                </div>

                <div
                    style={{
                        ...styles.tabletNEw,
                        display: this.props.locale == "CA" ? "initial" : "none"
                    }}
                >
                    <img style={styles.TabletMock} src={TabletCA} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={1280}
                        height={300}
                        top={180}
                        //left={30}
                    />
                </div>

                <Page />
            </div>
        );
    }
}
const styles = {
    pageHeader: {
        position: "absolute",
        width: "324px",
        left: 15,
        top: 68,
        height: "574px"
    },
    mobile: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "354px 722px",
        height: 800,
        width: 354,
        marginRight: 40,
        position: "relative",
        backgroundImage: `url(${deviceIphone})`,
        top: 20
    },
    TabletMock: {
        position: "absolute",
        width: "560px",
        left: "116px",
        top: "78px",
        height: "724px",
        height: "824px"
    },

    tabletNEw: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "800px 1000px",
        height: 1200,
        width: 800,
        //marginLeft: "0%",
        position: "relative",
        backgroundImage: `url(${deviceTablet})`,
        top: 20
    },
    divWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
};
export default GatewayMobile;
