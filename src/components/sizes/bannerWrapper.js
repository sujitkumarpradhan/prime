import React, { Component } from "react";
import Dropzone from "react-dropzone";

import Banner from "./banner";

class BannerWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBackup: false,
            bannerSrc: null,
            backupBannerSrc: null,
            bannerApproval: false,
            bannerIsCommentBoxOpen: false,
            isApproved: null,
            comment: null,
            isApprovedBackup: null,
            commentBackup: null
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle(event) {
        this.setState({
            isBackup: !this.state.isBackup
        });
        console.log(this.props);
    }
    render() {
        return (
            <div>
                {this.state.isBackup ? (
                    <Banner
                        platform={this.props.platform}
                        key="1"
                        advertiserID={this.props.advertiserID}
                        CreativeVersion={this.props.CreativeVersion}
                        approvalPadding={this.props.approvalPadding}
                        index={this.props.index}
                        src={this.props.backupBannerSrc}
                        destination={this.props.DestinationURLBackup}
                        onSrcChange={this.props.onSrcChange}
                        DestinationID={this.props.DestinationID}
                        indexDestination={this.props.indexDestination}
                        isApproved={this.props.isApprovedBackup}
                        onApprovalChange={this.props.onApprovalChange}
                        comment={this.props.commentBackup}
                        onCommentChange={this.props.onCommentChange}
                        style={styles.banner}
                        width={this.props.width}
                        height={this.props.height}
                        type="backup"
                        isVisibleCommentIcon={this.props.isVisibleCommentIcon}
                    />
                ) : (
                    <Banner
                        platform={this.props.platform}
                        key="2"
                        CreativeVersion={this.props.CreativeVersion}
                        advertiserID={this.props.advertiserID}
                        approvalPadding={this.props.approvalPadding}
                        index={this.props.index}
                        src={this.props.bannerSrc}
                        DestinationID={this.props.DestinationID}
                        indexDestination={this.props.indexDestination}
                        onSrcChange={this.props.onSrcChange}
                        isApproved={this.props.isApprovedMain}
                        onApprovalChange={this.props.onApprovalChange}
                        comment={this.props.commentMain}
                        onCommentChange={this.props.onCommentChange}
                        style={styles.banner}
                        width={this.props.width}
                        height={this.props.height}
                        type="main"
                        isVisibleCommentIcon={this.props.isVisibleCommentIcon}
                    />
                )}
                <label
                    className="switch"
                    style={{
                        ...styles.toggle,
                        visibility: this.props.disableToggle
                            ? "hidden"
                            : "visible"
                    }}
                >
                    <input type="checkbox" onClick={this.handleToggle} />
                    <span className="slider round" />
                    <span className="text" />
                </label>
            </div>
        );
    }
}
const styles = {
    banner: {
        top: "317px",
        position: "relative"
    },
    toggle: {}
};
export default BannerWrapper;
