import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Logo from "../../assets/Logo.png";
import logogif from "../../assets/ThankhuesNew.gif";
import video from "../../assets/video-player.svg";
import faq from "../../assets/question.svg";
import info from "../../assets/info.svg";
import homeIcon from "../../assets/canvas.svg";
import videoSelected from "../../assets/video-playerSelected.svg";
import faqSelected from "../../assets/questionSelected.svg";
import infoSelected from "../../assets/infoSelected.svg";
import homeIconSelected from "../../assets/canvasSelected.svg";
import comment from "../../assets/chat.svg";

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
  nav
} from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    console.log("sx---------", this.props.pageType);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
         

          <Col className="aboutLogo" xs={12} md={12} style={{display: this.props.pageType == "home" ? "block": "none"}}>
            ThankHues is a platform, where an appreciation is given from a person in the form of a painted canvas to another person of a different location.
          </Col>
          <Col className="aboutIcons" xs={8} md={8}>
          </Col>
          <Col className="aboutIcons" xs={4} md={4}>
            <a href="/home">
              <img className="icon" style={{display: this.props.pageType != "home" ? "inline-block": "none"}} src={homeIcon} title="FAQ"></img>
              <img className="icon opacity1" style={{display: this.props.pageType == "home" ? "inline-block": "none"}} src={homeIconSelected} title="FAQ"></img>
            </a>
            <a href="https://s3-ap-northeast-1.amazonaws.com/thankhues-images/thankhues.mp4" target="_blank">
              <img className="icon" src={video} title="Video"></img>
            </a> 
            <a href="/faq">
              <img className="icon" style={{display: this.props.pageType != "faq" ? "inline-block": "none"}} src={faq} title="FAQ"></img>
              <img className="icon opacity1" style={{display: this.props.pageType == "faq" ? "inline-block": "none"}} src={faqSelected} title="FAQ"></img>
            </a>
            <a href="/about">
              <img className="icon" style={{display: this.props.pageType != "about" ? "inline-block": "none"}} src={info} title="About us"></img>
              <img className="icon opacity1" style={{display: this.props.pageType == "about" ? "inline-block": "none"}} src={infoSelected} title="About us"></img>
            </a>
            {/* <img className="icon" src={comment}></img> */}
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Banner);
