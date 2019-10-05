import React, { Component } from "react";

import "./App.css";
import Pagination from "react-js-pagination";
import characters from "./images/empty.png";
import { Link } from "react-router-dom";
import AdvertiserListItem from "./AdvertiserListItem";
import plane from "./images/29_PD18_STYLE_PLANE_W_BANNER_001.png";
import ReactLoading from "react-loading";

import { withRouter } from "react-router-dom";
import girl from "./images/PrimeDay_Cardboard_0018_CHARACTER_HEADPHONE.png";
import Cookies from "universal-cookie";

import {
  AdvertiserList,
  AdvertiserItem,
  AddAdvertiser,
  getLevel
} from "./Advertiser";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Page from "./components/layout/Page";
import "react-bootstrap";

const GET_Advertisers = gql`
  query ListAdvertisers {
    listAdvertisers {
      items {
        id
        name
        locale
        createdAt
        lastModified
        MajorEvent
        sfURL
        designersAlias
        status
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
  }
`;
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

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      locale: "",
      sort: "createdAt",
      data: [],
      searchText: "",
      color: "#999",
      event: "",
      status: "",
      title: "",
      pageCount: 0,
      indexOfFirstLink: 0,
      perPage: 10,
      indexOfLastLink: 10,
      selected: 1,
      filteredList: [],
      year: "2019",
      version: 1,
      time: Date.now()
    };

    // this.setState({filterList: []});

    this.redirectLink = this.redirectLink.bind(this);
    this.searchAdv = this.searchAdv.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentWillMount() {
    if (!cookies.get("loginAuthTP")) {
      this.props.history.push("/");
    }

    console.log("inside willmount", this.props.location.state);
    if (
      this.props.location.state &&
      this.props.location.state.from.indexOf("presentation") !== -1
    ) {
      console.log("inside if");
      this.props.history.push({
        pathname: `/home`
      });
      window.location.reload(true);
    }
  }
  componentDidMount() {
    if (!cookies.get("loginAuthTP")) {
      this.props.history.push("/");
    }

    this._isMounted = true;
    console.log("window popstate", window.onpopstate);
    window.onpopstate = () => {
      if (this._isMounted) {
        const { hash } = window.location;
        console.log("outside brwser if", window.location);
        if (
          window.onpopstate &&
          window.location.href.indexOf("presentation") === -1
        ) {
          this.props.history.push({
            pathname: `/home`
          });
          window.location.reload(true);
        }
      }
    };
  }

  redirectLink(id, name, MajorEvent, status) {
    // console.log("CONSOLE LOG==========================", this.props.match.params.userAlias);
    this.props.history.push(
      `/presentation/${name}/${id}/${MajorEvent}/${status}`
    );
  }
  handlePageChange(pageNumber) {
    console.log("inside page click");
    this.setState({
      selected: pageNumber,
      indexOfLastLink: pageNumber * this.state.perPage,
      indexOfFirstLink: pageNumber * this.state.perPage - this.state.perPage
    });
    console.log(
      "Last Link:",
      this.state.indexOfLastLink,
      "First Link:",
      this.state.indexOfFirstLink,
      "selected: ",
      this.state.selected,
      "Per Page:",
      this.state.perPage
    );
  }

  searchAdv(e) {
    this.setState({ searchText: e.target.value });
  }

  render() {
    return (
      <div className="AppBG">
        <div className="HeaderWrapper">
        
                        <img alt="Plane" src={plane} className="planeMain" />
                        <div className="Header">Presentation Tool</div>
       
        </div>
        <Mutation
          ignoreResults
          refetchQueries={[
            {
              query: GET_Advertisers
            }
          ]}
          mutation={gql`
            mutation DeleteAdvertiser($id: ID!) {
              deleteAdvertiser(input: { id: $id }) {
                id
              }
            }
          `}
        >
          {deleteAdvertiser => {
            return (
              <Query
                query={GET_Advertisers}
                onCompleted={data => {
                  if (
                    this.props.location.state &&
                    this.props.location.state.from.indexOf("presentation")
                  )
                    window.location.reload(true);
                }}
              >
                {({ loading, error, data, listAdvertisers }) => {
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

                  if (data != null) {
                    this.state.data = data.listAdvertisers.items;
                    this.state.filterList = data.listAdvertisers.items;
                  }
                  return (
                    <div className="List">
                      {this.state.filterList.length === 0 && (
                        <div
                          style={{
                            ...styles,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative"
                          }}
                        >
                          <img
                            alt="Empty State"
                            src={characters}
                            style={{
                              ...styles,
                              height: 300,
                              opacity: 0.3
                            }}
                          />
                          <span
                            style={{
                              ...styles,
                              fontSize: 26,
                              fontWeight: 600,
                              color: "#188c77"
                            }}
                          >
                            {" "}
                            It feels little empty here!{" "}
                          </span>
                          <p
                            style={{
                              ...styles,
                              fontSize: 16,
                              fontWeight: 300,
                              color: "#48657c",
                              textAlign: "center",
                              paddingTop: 15
                            }}
                          >
                            Be the first one to create a presentation.
                            <br /> Start by adding your salesforce assignment
                            URL.{" "}
                          </p>
                        </div>
                      )}
                      <div
                        className="filterWrapper"
                        style={{
                          ...styles,
                          display:
                            this.state.filterList.length === 0 ? "none" : "flex"
                        }}
                      >
                        <label className="Filter">
                          <i className="fa fa-filter" aria-hidden="true" />
                          <select
                            value={this.state.event}
                            onChange={e =>
                              this.setState({
                                event: e.target.value
                              })
                            }
                            className="FilterInput"
                            required
                          >
                            <option value="" hidden>
                              Major Event
                            </option>
                            <option value="">All</option>
                            <option value="Prime Day">Prime Day</option>
                            <option value="BFCM">BFCM</option>
                          </select>
                        </label>
                       
                                                
                        <label className="Filter">
                          <i className="fa fa-filter" aria-hidden="true" />
                          <select
                            value={this.state.locale}
                            onChange={e =>
                              this.setState({
                                locale: e.target.value
                              })
                            }
                            className="FilterInput"
                            required
                          >
                            <option value="" hidden>
                              Locale
                            </option>
                            <option value="">All</option>
                            <option value="US">US</option>
                            <option value="CA">CA</option>
                            <option value="UK">UK</option>
                            <option value="DE">DE</option>
                            <option value="FR">FR</option>
                            <option value="IT">IT</option>
                            <option value="ES">ES</option>
                            <option value="IN">IN</option>
                            <option value="JP">JP</option>
                          </select>
                        </label>
                        <label className="Filter">
                          <i className="fa fa-filter" aria-hidden="true" />

                          <select
                            value={this.state.year}
                            onChange={e =>
                              this.setState({
                                year: e.target.value
                              })
                            }
                            className="FilterInput"
                            required
                          >
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                          </select>
                        </label>
                        <label className="Filter">
                          <i className="fa fa-arrow-down" aria-hidden="true" />

                          <select
                            value={this.state.sort}
                            onChange={e =>
                              this.setState({
                                sort: e.target.value
                              })
                            }
                            className="FilterInput"
                            required
                          >
                            <option value="createdAt">Created at</option>
                            <option value="lastModified">Last modified</option>
                          </select>
                        </label>

                        <label className="Filter">
                          <input
                            className="CreateInputSearch"
                            placeholder="Search text"
                            type="text"
                            value=""
                            value={this.state.searchText}
                            onChange={e => this.searchAdv(e)}
                          />
                        </label>
                      </div>
                      <ul style={{...styles, paddingInlineEnd: 40}}>
                        <table
                          class="table table-hover"
                          style={{
                            ...styles,
                            width:1300,
                            display:
                              this.state.filterList.length === 0
                                ? "none"
                                : "inline"
                          }}
                        >
                          <thead>
                            <tr>
                              <th>Advertiser</th>
                              <th>Version</th>
                              <th>Major Event</th>
                              <th>Locale</th>
                              <th>Designers</th>
                              <th>Created At</th>
                              <th>Last Modified</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...this.state.filterList]
                              .filter(advertiser => {
                                if (
                                  advertiser.gateway ||
                                  advertiser.event ||
                                  advertiser.contextual ||
                                  advertiser.mGateway ||
                                  advertiser.mEvent ||
                                  advertiser.mContextual ||
                                  advertiser.fireTv ||
                                  advertiser.fireTablet ||
                                  advertiser.lp
                                ) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              .sort((var1, var2) => {
                                if (this.state.sort === "lastModified") {
                                  var a = new Date(var1.lastModified),
                                    b = new Date(var2.lastModified);
                                  if (a < b) return 1;
                                  if (a > b) return -1;

                                  return 0;
                                } else if (this.state.sort === "createdAt") {
                                  var a = new Date(var1.createdAt),
                                    b = new Date(var2.createdAt);
                                  if (a < b) return 1;
                                  if (a > b) return -1;

                                  return 0;
                                }
                              })

                              .filter(advertiser => {
                                if (
                                  advertiser.createdAt.includes(this.state.year)
                                ) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              .filter(advertiser => {
                                if (
                                  advertiser.MajorEvent === this.state.event
                                ) {
                                  return true;
                                } else if (this.state.event === "") {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              .filter(advertiser => {
                                if (advertiser.status === this.state.status) {
                                  return true;
                                } else if (this.state.status === "") {
                                  return true;
                                } else {
                                  return false;
                                }
                              })

                              .filter(advertiser => {
                                if (advertiser.locale === this.state.locale) {
                                  return true;
                                } else if (this.state.locale === "") {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              .filter(advertiser => {
                                return (
                                  advertiser.name
                                    .toLowerCase()
                                    .search(
                                      this.state.searchText.toLowerCase()
                                    ) !== -1 ||
                                  advertiser.designersAlias
                                    .toLowerCase()
                                    .search(
                                      this.state.searchText.toLowerCase()
                                    ) !== -1
                                );
                              })
                              .slice(
                                this.state.indexOfFirstLink,
                                this.state.indexOfLastLink
                              )
                              .map(advertiser => {
                                return (
                                  <AdvertiserListItem
                                    key={advertiser.id}
                                    id={advertiser.id}
                                    status={advertiser.status}
                                    sfURL={advertiser.sfURL}
                                    version={advertiser.version}
                                    locale={advertiser.locale}
                                    name={advertiser.name}
                                    event={advertiser.MajorEvent}
                                    createdAt={advertiser.createdAt}
                                    lastModified={advertiser.lastModified}
                                    designer={advertiser.designersAlias}
                                  />
                                );
                              })}
                          </tbody>
                        </table>

                        <div className="pagination-wrapper">
                          <Pagination
                            hideDisabled
                            activePage={this.state.selected}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={
                              [...this.state.filterList]
                                .sort((var1, var2) => {
                                  if (this.state.sort === "lastModified") {
                                    var a = new Date(var1.lastModified),
                                      b = new Date(var2.lastModified);
                                    if (a < b) return 1;
                                    if (a > b) return -1;

                                    return 0;
                                  } else if (this.state.sort === "createdAt") {
                                    var a = new Date(var1.createdAt),
                                      b = new Date(var2.createdAt);
                                    if (a < b) return 1;
                                    if (a > b) return -1;

                                    return 0;
                                  }
                                })
                                .filter(advertiser => {
                                  if (
                                    advertiser.MajorEvent === this.state.event
                                  ) {
                                    return true;
                                  } else if (this.state.event === "") {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                })
                                .filter(advertiser => {
                                  if (advertiser.status === this.state.status) {
                                    return true;
                                  } else if (this.state.status === "") {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                })

                                .filter(advertiser => {
                                  if (advertiser.locale === this.state.locale) {
                                    return true;
                                  } else if (this.state.locale === "") {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                })
                                .filter(advertiser => {
                                  if (
                                    advertiser.createdAt.includes(
                                      this.state.year
                                    )
                                  ) {
                                    return true;
                                  } else {
                                    return false;
                                  }
                                })
                                .filter(advertiser => {
                                  return (
                                    advertiser.name
                                      .toLowerCase()
                                      .search(
                                        this.state.searchText.toLowerCase()
                                      ) !== -1
                                  );
                                }).length
                            }
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                          />
                        </div>
                      </ul>
                    </div>
                  );
                }}
              </Query>
            );
          }}
        </Mutation>
        <img
                            alt="PrimeDay character"
                            src={girl}
                            className="girl"
                        />
        <Page
          style={styles.pageStyle}
          description="Type creative comments here..."
        />
      </div>
    );
  }
}

export default withRouter(App);

const styles = {
  pageStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  listItem: {
    marginRight: "10px"
  },
  listItemStatus: {
    color: "#ee810c"
  },
  error: {
    fontSize: "12px",
    color: "#905020",
    padding: "10px",
    textAlign: "center"
  },
  characterBg: {
    height: 40,
    width: "100vw",
    backgroundColor: "#fff"
  }
};
