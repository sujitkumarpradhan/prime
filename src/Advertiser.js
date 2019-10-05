import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Presentation from "./Presentation";
import App from "./App";
import { withRouter } from "react-router-dom";
import "./Advertiser.css";
import { ApolloConsumer } from "react-apollo";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const Filter_Advertisers = gql`
    query ListAdvertisers($sfURL: String!) {
        listAdvertisers(filter: { sfURL: { contains: $sfURL } }) {
            items {
                id
                sfURL
                version
            }
        }
    }
`;

const AdvertiserItem = ({ children, item, onDelete }) => {
    return (
        <div className="ListItemWrapper">
            <ul>
                <Link
                    to={`/presentation/${item.name}/${item.id}/${
                        item.MajorEvent
                    }`}
                    className="ListItem"
                >
                    {children}
                </Link>

                {/* <button
                style={styles.buttonDelete}
                onClick={() => {
                    onDelete(item.id);
                }}
            >
                <i class="far fa-trash-alt" />
            </button> */}
            </ul>
        </div>
    );
};

const AdvertiserList = ({ children }) => {
    return <div className="AdvertiserList">{children}</div>;
};

class AddAdvertiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            designersAlias: null,
            locale: "",
            event: "",
            version: 1,
            buttonBlocked: false
        };
        this.blockButton = this.blockButton.bind(this);
    }
    blockButton() {
        console.log("blocking the button to add data");
        this.setState({
            buttonBlocked: true
        });
        console.log("block status: ", this.state.buttonBlocked);
    }

    render() {
        const { onAdd, loading } = this.props;
        return (
            <ApolloConsumer>
                {client => (
                    <div className="CreateForm">
                        <div className="CreateTitle">
                            Create new presentation
                        </div>
                        <div>
                            <label className="CreateLabel">
                                <input
                                    className="CreateInput"
                                    placeholder="Salesforce URL"
                                    type="text"
                                    value={this.state.name}
                                    onChange={e =>
                                        this.setState({ name: e.target.value })
                                    }
                                />
                            </label>
                        </div>
                        <button
                            className="AddAdvertiser"
                            onClick={async () => {
                                await this.setState({
                                    buttonBlocked: true
                                });
                                if (
                                    this.state.name === "" ||
                                    this.state.name === null
                                ) {
                                    onAdd({
                                        error: "Salesforce URL cannot be empty"
                                    });
                                } else {
                                    let response = await fetch(
                                        `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
                                        {
                                            method: "POST",
                                            body: JSON.stringify({
                                                assignmentId: this.state.name
                                            })
                                        }
                                    );
                                    response.json().then(async response => {
                                        let designer = await fetch(
                                            `http://adinfoprovider.corp.amazon.com/getSalesforceUserDetails`,
                                            {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    userId: JSON.parse(
                                                        response.rawData
                                                    ).Designer__c
                                                })
                                            }
                                        );
                                        designer.json().then(async designer => {
                                            console.log(
                                                "designer: ",
                                                designer.alias
                                            );
                                            if (
                                                JSON.parse(response.rawData)
                                                    .Major_Event__c === null
                                            ) {
                                                onAdd({
                                                    error:
                                                        "This assignment is not tagged to a major event"
                                                });
                                            } else {
                                                const {
                                                    data
                                                } = await client.query({
                                                    query: Filter_Advertisers,
                                                    variables: {
                                                        sfURL: this.state.name
                                                    }
                                                });

                                                onAdd({
                                                    name: `${response.name.replace(
                                                        "Assignment - ",
                                                        ""
                                                    )} ${JSON.parse(
                                                        response.rawData
                                                    ).Advertiser__c.replace(
                                                        /[&\/\\#,+()$~%.'":*?<>{}]/g,
                                                        "_"
                                                    )}`,
                                                    version:
                                                        data.listAdvertisers
                                                            .items.length + 1,
                                                    sfURL: this.state.name,
                                                    designersAlias:
                                                        designer.alias,
                                                    createdAt: new Date().toGMTString(),
                                                    locale:
                                                        response.list[0].locale,
                                                    MajorEvent: JSON.parse(
                                                        response.rawData
                                                    ).Major_Event__c,
                                                    status: response.status
                                                }).then(
                                                    this.setState({
                                                        name: "",
                                                        locale: "",
                                                        designersAlias: "",
                                                        event: "",
                                                        version: 1,
                                                        buttonBlocked: false
                                                    })
                                                );
                                            }
                                        });
                                    });
                                }
                            }}
                            disabled={loading || this.state.buttonBlocked}
                        >
                            {loading ? "Adding..." : "Continue"}
                        </button>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export { AdvertiserList, AdvertiserItem, AddAdvertiser };
const styles = {
    icon: {
        color: "#669fd5",
        fontSize: "12px",
        paddingLeft: "12px",
        paddingBottom: "2px"
    },
    buttonDelete: {
        position: "relative",
        cursor: "pointer",
        fontSize: 14,
        color: "#1b799a",

        background: "none",
        border: "none"
    }
};
