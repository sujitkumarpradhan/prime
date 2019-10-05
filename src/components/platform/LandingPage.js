import React, { Component } from "react";

import { Link, Route, Switch } from "react-router-dom";
import Page from "../layout/Page";
import BannerWrappers from "../sizes/bannerWrappers";
import LangingBg from "./images/FireTVBG1.jpg";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            landingPageURL
        }
    }
`;

class LandingPage extends Component {
    state = {
        landingPageURL: this.props.landingPageURL
    };

    render() {
        return (
            <div>
                <Mutation
                    refetchQueries={[
                        {
                            query: GET_Advertiser,
                            variables: {
                                id: this.props.advertiserID
                            }
                        }
                    ]}
                    mutation={gql`
                        mutation UpdateAdvertiser(
                            $id: ID!
                            $landingPageURL: String
                        ) {
                            updateAdvertiser(
                                input: {
                                    id: $id
                                    landingPageURL: $landingPageURL
                                }
                            ) {
                                id
                                landingPageURL
                            }
                        }
                    `}
                >
                    {(updateAdvertiser, { data, loading }) => {
                        return (
                            <Query
                                query={GET_Advertiser}
                                variables={{
                                    id: this.props.advertiserID
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
                                    // if (data.getAdvertiser.landingPageURL) {
                                    //   return this.setState({
                                    //     landingPageURL: data.getAdvertiser.landingPageURL
                                    //   });
                                    // }

                                    return (
                                        <div style={styles.pageBg}>
                                            <div className="LandingPagePreview">
                                                <input
                                                    className="LandingPagePreviewInput"
                                                    placeholder="landingPageURL"
                                                    type="text"
                                                    value={
                                                        this.state
                                                            .landingPageURL
                                                    }
                                                    onChange={e =>
                                                        this.setState({
                                                            landingPageURL:
                                                                e.target.value
                                                        })
                                                    }
                                                />

                                                <button
                                                    className="LandingPagePreviewAddUrl"
                                                    onClick={() => {
                                                        updateAdvertiser({
                                                            variables: {
                                                                id: this.props
                                                                    .advertiserID,
                                                                landingPageURL: this
                                                                    .state
                                                                    .landingPageURL
                                                            }
                                                        });
                                                    }}
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? "updating..."
                                                        : "Update"}
                                                </button>

                                                <a
                                                    href={
                                                        data.getAdvertiser
                                                            .landingPageURL
                                                    }
                                                    target="_blank"
                                                    className="LandingPagePreviewItem"
                                                >
                                                    View preview
                                                </a>
                                            </div>

                                            <h1>Desktop Banner</h1>

                                            <BannerWrappers
                                                advertiserID={
                                                    this.props.advertiserID
                                                }
                                                platform={this.props.platform}
                                                placement="Gateway"
                                                width={3000}
                                                height={600}
                                                top={0}
                                                disableToggle={true}
                                                paddingCarousel={true}
                                            />

                                            <h1>Tablet Banner</h1>
                                            <BannerWrappers
                                                advertiserID={
                                                    this.props.advertiserID
                                                }
                                                platform={this.props.platform}
                                                placement="Gateway"
                                                width={2560}
                                                height={600}
                                                top={0}
                                                disableToggle={true}
                                                paddingCarousel={true}
                                            />

                                            <h1>Mobile Banner</h1>
                                            <BannerWrappers
                                                advertiserID={
                                                    this.props.advertiserID
                                                }
                                                platform={this.props.platform}
                                                placement="Gateway"
                                                width={1242}
                                                height={666}
                                                top={0}
                                                disableToggle={true}
                                                paddingCarousel={true}
                                            />
                                        </div>
                                    );
                                }}
                            </Query>
                        );
                    }}
                </Mutation>
                <Page
                    style={styles.pageStyle}
                    description="Type creative comments here..."
                />
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
    pageBg: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "1130px",
        backgroundPosition: "center",
        position: "relative",
        // backgroundImage: `url(${LangingBg})`,
        margin: 10,
        overflowX: "hidden"
    }
};
export default LandingPage;
