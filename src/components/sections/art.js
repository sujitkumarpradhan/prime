import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import ReactGA from "react-ga";
import LogoPlaceholder from "../../assets/LogoPlaceholder.png";
import ProductShot from "../../assets/productShotPlaceholder.png";
import gql from "graphql-tag";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Thumbnail,
  Button,
  Jumbotron,
  Popover,
  Tooltip,
  Modal,
  ButtonGroup,
  DropdownButton,
  nav,
  Grid,
  Row,
  Col
} from "react-bootstrap";

// import "./all/global.css";

const GET_Art = gql`
  query ListArts {
    listArts {
      items {
        ArtID
        Title
        Description
        CreatedBy
        CreatedByAlias
        CreatedByAbout
        AwardedTo
        AwardedToAlias
        AwardedToFor
        ArtURL
        Awarded
        Show
      }
    }
  }
`;

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "Heading placeholder",
      subheading: "Subheading placeholder",
      logoImageUrl: "../../assets/hpLogo.png",
      productImageUrl: "../../assets/productShot.png",
      logoSize: 50,
      productSize: 50,
      translate: "translateX(0) translateY(76px)",
      Xaxis: 0,
      Yaxis: 76,
      backgroundColorATF: "#B2E5F6",
      backgroundColorBTF: "#B2E5F6",

      override300x250: false,
      heading300x250: "Heading placeholder",
      subheading300x250: "Subheading placeholder",
      logoSize300x250: 50,
      productSize300x250: 40,
      translate300x250: "translateX(-9px) translateY(76px)",
      Xaxis300x250: -9,
      Yaxis300x250: 76,

      override160x600: false,
      heading160x600: "Heading placeholder",
      subheading160x600: "Subheading placeholder",
      logoSize160x600: 50,
      productSize160x600: 50,
      translate160x600: "translateX(0) translateY(76px)",
      Xaxis160x600: 0,
      Yaxis160x600: 76,
      roductShotImage: "sadas"
    };

    this.handleHeading = this.handleHeading.bind(this);
    this.handleSubheading = this.handleSubheading.bind(this);
    this.handleLogoSize = this.handleLogoSize.bind(this);
    this.handleProductSize = this.handleProductSize.bind(this);
    this.changeXYais = this.changeXYais.bind(this);
    this.handleBackgroundColorATF = this.handleBackgroundColorATF.bind(this);
    this.handleBackgroundColorBTF = this.handleBackgroundColorBTF.bind(this);
    this.finalfiles = this.finalfiles.bind(this);
  }

  handleHeading(e, unitName) {
    if (unitName == "300x250")
      this.setState({ heading300x250: e.target.value });
    else if (unitName == "160x600")
      this.setState({ heading160x600: e.target.value });
    else if (unitName == "AllUnits") {
      this.setState({ heading: e.target.value });
      if (!this.state.override300x250)
        this.setState({ heading300x250: e.target.value });
      if (!this.state.override160x600)
        this.setState({ heading160x600: e.target.value });
    } else {
      this.setState({ heading: e.target.value });
      if (!this.state.override300x250)
        this.setState({ heading300x250: e.target.value });
      if (!this.state.override160x600)
        this.setState({ heading160x600: e.target.value });
    }
  }

  handleSubheading(e, unitName) {
    if (unitName == "300x250")
      this.setState({ subheading300x250: e.target.value });
    else if (unitName == "160x600")
      this.setState({ subheading160x600: e.target.value });
    else if (unitName == "AllUnits") {
      this.setState({ subheading: e.target.value });
      if (!this.state.override300x250)
        this.setState({ subheading300x250: e.target.value });
      if (!this.state.override160x600)
        this.setState({ subheading160x600: e.target.value });
    } else {
      this.setState({ subheading: e.target.value });
      if (!this.state.override300x250)
        this.setState({ subheading300x250: e.target.value });
      if (!this.state.override160x600)
        this.setState({ subheading160x600: e.target.value });
    }
  }

  handleLogoSize(e, unitName) {
    if (unitName == "300x250") {
      this.setState({ logoSize300x250: e.target.value });
    } else if (unitName == "160x600") {
      this.setState({ logoSize160x600: e.target.value });
    }
  }

  handleProductSize(e, unitName) {
    if (unitName == "300x250") {
      this.setState({ productSize300x250: e.target.value });
    } else if (unitName == "160x600") {
      this.setState({ productSize160x600: e.target.value });
    }
  }

  async handleXaxis(e, unitName) {
    if (unitName == "300x250") {
      this.setState(
        {
          Xaxis300x250: e.target.value
        },
        () => {
          this.changeXYais(unitName);
        }
      );
    } else if (unitName == "160x600") {
      this.setState(
        {
          Xaxis160x600: e.target.value
        },
        () => {
          this.changeXYais(unitName);
        }
      );
    }
  }

  async handleYaxis(e, unitName) {
    if (unitName == "300x250") {
      this.setState(
        {
          Yaxis300x250: e.target.value
        },
        () => {
          this.changeXYais(unitName);
        }
      );
    } else if (unitName == "160x600") {
      this.setState(
        {
          Yaxis160x600: e.target.value
        },
        () => {
          this.changeXYais(unitName);
        }
      );
    }
  }

  changeXYais(unitName) {
    if (unitName == "300x250") {
      var temp =
        "translateX(" +
        this.state.Xaxis300x250 +
        "px) translateY(" +
        this.state.Yaxis300x250 +
        "px)";

      this.setState({ translate300x250: temp });
    } else if (unitName == "160x600") {
      var temp =
        "translateX(" +
        this.state.Xaxis160x600 +
        "px) translateY(" +
        this.state.Yaxis160x600 +
        "px)";
      this.setState({ translate160x600: temp });
    }
  }

  handleBackgroundColorATF(changeEvent) {
    this.setState({
      backgroundColorATF: changeEvent.target.value
    });
  }

  handleBackgroundColorBTF(changeEvent) {
    this.setState({
      backgroundColorBTF: changeEvent.target.value
    });
  }

  finalfiles(unitName) {
    var FileSaver = require("file-saver");
    var node = document.getElementById(unitName);

    // domtoimage.toBlob(node).then(function (blob) {
    //   FileSaver.saveAs(blob, '300x250.jpeg');
    // });

    // domtoimage.toJpeg(node, { quality:1.0 })
    // .then(function (dataUrl) {
    //     FileSaver.saveAs(dataUrl, '300x250.jpeg');
    // });

    html2canvas(node).then(function(canvas) {
      var img = canvas.toDataURL("image/jpeg");
      FileSaver.saveAs(img, unitName + ".jpeg");
    });
  }

  handleImageUpload(event, type) {
    if (type == "Logo") {
      this.setState({
        logoImageUrl: URL.createObjectURL(event.target.files[0])
      });
    } else if (type == "Product") {
      this.setState({
        productImageUrl: URL.createObjectURL(event.target.files[0])
      });
    }
  }

  handleOverride(unitName) {
    if (unitName == "300x250") {
      if (this.state.override300x250) {
        this.setState({
          heading300x250: this.state.heading,
          subheading300x250: this.state.subheading
        });
      }
      this.setState({ override300x250: !this.state.override300x250 });
    } else if (unitName == "160x600")
      if (this.state.override160x600) {
        this.setState({
          heading160x600: this.state.heading,
          subheading160x600: this.state.subheading
        });
      }
    this.setState({ override160x600: !this.state.override160x600 });
  }

  render() {
    return (
      <Query query={GET_Art}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className="loadingClass">Loading...</div>;
          }
          if (data) {
            // console.log(data.listArts.items[0]);
          }

          return (
            <div className="container MainContaner">
              <Row className="show-grid">
                <Col className="title" xs={12} md={12}>
                  Prime Day tool
                </Col>
                <Col xs={12} md={12}>
                  <Row className="show-grid">
                    <Col xs={4} md={4}>
                      <Row className="show-grid">
                        <Col xs={5} md={5}>
                          Heading copy :
                        </Col>
                        <Col xs={7} md={7}>
                          <textarea
                            className=""
                            placeholder="Heading"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.heading}
                            onChange={e => this.handleHeading(e, "AllUnits")}
                          />
                        </Col>

                        <Col xs={5} md={5}>
                          Subheading copy :
                        </Col>
                        <Col xs={7} md={7}>
                          <textarea
                            className=""
                            placeholder="Heading"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.subheading}
                            onChange={e => this.handleSubheading(e, "AllUnits")}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={4} md={4}>
                      <Row className="show-grid">
                        <Col xs={12} md={12}>
                          Logo image:
                          <input
                            type="file"
                            onChange={e => this.handleImageUpload(e, "Logo")}
                          />
                        </Col>

                        <Col className="logoMargin" xs={12} md={12}>
                          Product image:
                          <input
                            type="file"
                            onChange={e => this.handleImageUpload(e, "Product")}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col xs={4} md={4}>
                      <Row className="show-grid">
                        <Col xs={12} md={12}>
                          Background Color
                        </Col>
                        <Col xs={2} md={2}>
                          ATF:
                        </Col>
                        <Col xs={9} md={9}>
                          <Row className="show-grid">
                            <Col xs={3} md={3}>
                              <input
                                type="radio"
                                value="#FFEBB7"
                                checked={
                                  this.state.backgroundColorATF === "#FFEBB7"
                                }
                                onChange={this.handleBackgroundColorATF}
                              />
                              <span className="color1 colorBox" />
                            </Col>

                            <Col xs={3} md={3}>
                              {/* <input type="radio" name="Color" value="#B2E5F6" />#B2E5F6 */}
                              <input
                                type="radio"
                                value="#B2E5F6"
                                checked={
                                  this.state.backgroundColorATF === "#B2E5F6"
                                }
                                onChange={this.handleBackgroundColorATF}
                              />
                              <span className="color2 colorBox" />
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={2} md={2}>
                          BTF:
                        </Col>
                        <Col xs={9} md={9}>
                          <Row className="show-grid">
                            <Col xs={3} md={3}>
                              <input
                                type="radio"
                                value="#FFEBB7"
                                checked={
                                  this.state.backgroundColorBTF === "#FFEBB7"
                                }
                                onChange={this.handleBackgroundColorBTF}
                              />
                              <span className="color1 colorBox" />
                            </Col>

                            <Col xs={3} md={3}>
                              {/* <input type="radio" name="Color" value="#B2E5F6" />#B2E5F6 */}
                              <input
                                type="radio"
                                value="#B2E5F6"
                                checked={
                                  this.state.backgroundColorBTF === "#B2E5F6"
                                }
                                onChange={this.handleBackgroundColorBTF}
                              />
                              <span className="color2 colorBox" />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={12}>
                  <div className="width80">
                    <div className="divider light" />
                  </div>
                </Col>

                <Col xs={12} md={12} className="PU300x250">
                  <Row className="show-grid">
                    <Col xs={4} md={4}>
                      <div
                        id="PU300x250"
                        className="banner1_300x250"
                        style={{
                          backgroundColor: this.state.backgroundColorATF
                        }}
                      >
                        <div className="productBlock300x250">
                          <img
                            className="productShot"
                            style={{
                              transform: this.state.translate300x250,
                              width: this.state.productSize300x250 + "%"
                            }}
                            src={this.state.productImageUrl}
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = ProductShot;
                            }}
                          />
                        </div>

                        <div className="logo-copy300x250">
                          <div className="logoBlock300x250">
                            <img
                              className="logo300x250"
                              style={{
                                width: this.state.logoSize300x250 + "%"
                              }}
                              src={this.state.logoImageUrl}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = LogoPlaceholder;
                              }}
                            />
                          </div>

                          <div className="">
                            <div className="heading300x250">
                              {this.state.heading300x250}
                            </div>
                            <div className="subheading300x250">
                              {this.state.subheading300x250}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col xs={8} md={8}>
                      <Row className="show-grid">
                        <Col xs={12} md={12}>
                          Override:{" "}
                          <input
                            type="checkbox"
                            checked={this.state.override300x250}
                            onChange={e => this.handleOverride("300x250")}
                          />
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          style={{
                            display: this.state.override300x250 ? "" : "none"
                          }}
                        >
                          <Row className="show-grid">
                            <Col xs={3} md={3}>
                              Headline
                            </Col>
                            <Col xs={2} md={2}>
                              <textarea
                                className=""
                                placeholder="Heading"
                                type="text"
                                pattern="[a-zA-Z]"
                                value={this.state.heading300x250}
                                onChange={e => this.handleHeading(e, "300x250")}
                              />
                            </Col>

                            <Col xs={2} md={2} />

                            <Col xs={3} md={3}>
                              Sub heading
                            </Col>

                            <Col xs={2} md={2}>
                              <textarea
                                className=""
                                placeholder="Subheading"
                                type="text"
                                pattern="[a-zA-Z]"
                                value={this.state.subheading300x250}
                                onChange={e =>
                                  this.handleSubheading(e, "300x250")
                                }
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={12} md={12}>
                          <Row className="show-grid">
                            <Col xs={5} md={5}>
                              <Row className="show-grid">
                                <Col xs={7} md={7}>
                                  Size of the logo(%)
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Image Width"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.logoSize300x250}
                                    onChange={e =>
                                      this.handleLogoSize(e, "300x250")
                                    }
                                  />
                                </Col>

                                <Col xs={7} md={7}>
                                  Size of the product(%)
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Product Width"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.productSize300x250}
                                    onChange={e =>
                                      this.handleProductSize(e, "300x250")
                                    }
                                  />
                                </Col>
                              </Row>
                            </Col>

                            <Col xs={2} md={2} />

                            <Col xs={5} md={5}>
                              <Row className="show-grid">
                                <Col xs={7} md={7}>
                                  X-axis of product:
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="X Axis"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.Xaxis300x250}
                                    onChange={e =>
                                      this.handleXaxis(e, "300x250")
                                    }
                                  />
                                </Col>

                                <Col xs={7} md={7}>
                                  Y-axis of product:
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Y Axis"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.Yaxis300x250}
                                    onChange={e =>
                                      this.handleYaxis(e, "300x250")
                                    }
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={12} md={12}>
                          <button
                            className="finalFiles_button"
                            onClick={e => this.finalfiles("PU300x250")}
                          >
                            300x250 final files
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={12} className="PU160x600">
                  <Row className="show-grid">
                    <Col xs={4} md={4}>
                      <div
                        id="PU160x600"
                        className="Banner160x600"
                        style={{
                          backgroundColor: this.state.backgroundColorATF
                        }}
                      >
                        <div className="logo-copy160x600">
                          <div className="logoBlock160x600">
                            <img
                              className="logo"
                              style={{
                                width: this.state.logoSize160x600 + "%"
                              }}
                              src={this.state.logoImageUrl}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = LogoPlaceholder;
                              }}
                            />
                          </div>

                          <div className="">
                            <div className="heading160x600">
                              {this.state.heading160x600}
                            </div>
                            <div className="subheading160x600">
                              {this.state.subheading160x600}
                            </div>
                          </div>
                        </div>

                        <div className="productBlock160x600">
                          <img
                            className="productShot160x600"
                            style={{
                              transform: this.state.translate160x600,
                              width: this.state.productSize160x600 + "%"
                            }}
                            src={this.state.productImageUrl}
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = ProductShot;
                            }}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col xs={8} md={8}>
                      <Row className="show-grid">
                        <Col xs={12} md={12}>
                          Override:{" "}
                          <input
                            type="checkbox"
                            checked={this.state.override160x600}
                            onChange={e => this.handleOverride("160x600")}
                          />
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          style={{
                            display: this.state.override160x600 ? "" : "none"
                          }}
                        >
                          <Row className="show-grid">
                            <Col xs={3} md={3}>
                              Headline
                            </Col>
                            <Col xs={2} md={2}>
                              <textarea
                                className=""
                                placeholder="Heading"
                                type="text"
                                pattern="[a-zA-Z]"
                                value={this.state.heading160x600}
                                onChange={e => this.handleHeading(e, "160x600")}
                              />
                            </Col>

                            <Col xs={2} md={2} />

                            <Col xs={3} md={3}>
                              Sub heading
                            </Col>

                            <Col xs={2} md={2}>
                              <textarea
                                className=""
                                placeholder="Subheading"
                                type="text"
                                pattern="[a-zA-Z]"
                                value={this.state.subheading160x600}
                                onChange={e =>
                                  this.handleSubheading(e, "160x600")
                                }
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={12} md={12}>
                          <Row className="show-grid">
                            <Col xs={6} md={6}>
                              <Row className="show-grid">
                                <Col xs={7} md={7}>
                                  Size of the logo(%)
                                </Col>

                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Image Width"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.logoSize160x600}
                                    onChange={e =>
                                      this.handleLogoSize(e, "160x600")
                                    }
                                  />
                                </Col>

                                <Col xs={7} md={7}>
                                  Size of the product(%)
                                </Col>

                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Product Width"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.productSize160x600}
                                    onChange={e =>
                                      this.handleProductSize(e, "160x600")
                                    }
                                  />
                                </Col>
                              </Row>
                            </Col>

                            <Col xs={2} md={2} />

                            <Col xs={6} md={6}>
                              <Row className="show-grid">
                                <Col xs={7} md={7}>
                                  X-axis of product shot:
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="X Axis"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.Xaxis160x600}
                                    onChange={e =>
                                      this.handleXaxis(e, "160x600")
                                    }
                                  />
                                </Col>

                                <Col xs={7} md={7}>
                                  Y-axis of product shot:
                                </Col>
                                <Col xs={5} md={5}>
                                  <input
                                    className=""
                                    placeholder="Y Axis"
                                    type="number"
                                    pattern="[0-9]"
                                    value={this.state.Yaxis160x600}
                                    onChange={e =>
                                      this.handleYaxis(e, "160x600")
                                    }
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        <Col xs={12} md={12}>
                          <button
                            className="finalFiles_button"
                            onClick={e => this.finalfiles("PU160x600")}
                          >
                            160x600 final files
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* <div class="creaiveSpace"> */}
              {/* <div className="Banner300x250">
                  <div className="productBLock300x250">
                    <img className="productShot" style={{ transform: "translateX(0) translateY(76px)", width: this.state.productSize }} src={ProductShot}></img>
                  </div>


                  <div className="logo-copy300x250">
                    <div className="logoBlock300x250">
                      <img className="logo" style={{ width: this.state.logoSize }} src={HPlogo}></img>
                    </div>

                    <div className="textBlock">
                      <div className="heading">{this.state.heading}</div>
                      <div className="subheading">{this.state.subheading}</div>
                    </div>

                  </div> */}

              {/* <Draggable
                  axis="x"
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  position={null}
                  grid={[25, 25]}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}>
                  <div>
                    <div className="handle">Drag from here</div>
                    <div>This readme is really dragging on...</div>
                  </div>
                </Draggable> */}

              {/* </div>

              </div> */}
            </div>
          );
        }}
      </Query>
    );
  }
}
export default withRouter(Art);
