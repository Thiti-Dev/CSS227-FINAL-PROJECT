import React, { Component } from "react";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import styled from "styled-components";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Row,
    Col
} from "react-bootstrap";
import studyBackground from "./img/studyBackground.jpg";
import freeDelivery from "./img/free-delivery.png";
import calendar from "./img/calendar.png";
import brian from "./img/brain.png";

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";

SmoothScrollbar.use(OverscrollPlugin);

const Outside = styled.div`
  background-color: #eee;
  width: 100vw;
  height: 100vh;
`;

const NavStyle = styled(Navbar.Brand)`
  margin-left: 10%;
  @media (max-width: 1024px) {
    margin-left: 0%;
  }
  @media (max-width: 320px) {
    margin-left: 0%;
    margin-right: 0%;
    font-size: 1em;
  }
`;

const NavCollapse = styled(Navbar.Collapse)`
  margin-right: 10%;
  @media (max-width: 1024px) {
    margin-right: 0%;
  }
`;

const MenuBar = styled(Navbar)`
  font-family: "Mandali", sans-serif;
`;

const Inside = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${studyBackground});
  background-size: 100% auto;
  background-repeat: no-repeat;
  overflow: "hidden";
`;

const TabButton = styled.div`
  width: 100vw;
  height: 40vh;
  background-color: rgba(0, 0, 0, 0.6);
  @media (max-width: 426px) {
    width: 100vw;
    height: 50vh;
    background-color: rgba(36, 37, 42, 1);
  }
`;

const TabInfo = styled.div`
  width: 100vw;
  height: 60vh;
  background-color: #ffffff;
  @media (max-width: 320px) {
    font-size: 1em;
  }
`;

const InfoDetail = styled.div`
  width: 100vw;
  height: 30vh;
  padding: 5%;
  color: #ffffff;
  text-align: center;
  font-family: "Mandali", sans-serif;
`;

const RowStyle = styled(Row)`
  margin: 0 25%;
  @media (max-width: 426px) {
    margin: 0 auto;
  }
`;

const ColLayer = styled(Col)`
  float: none;
  margin: 0 auto;
`;

const ButtonStyle = styled(Button)`
  width: 24vw;
  color: #ffffff;
  border: 2px;
  background-color: rgba(0, 0, 0, 0.6);
  @media (max-width: 426px) {
    width: 80vw;
    color: #ffffff;
    border: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    margin-top: 5%;
  }
`;

const RowDetail = styled(Row)`
  margin: 0 auto;
  height: 50vh;
`;

const ColDetail = styled(Col)`
  margin: 0 auto;
  display: table;
  text-align: center;
  font-family: "Mandali", sans-serif;
`;

class IndexPage extends Component {
    //eslint-disable-next-line
    constructor(){
        super();
        this.state = ({
            contentShow: true
        })
    }

    componentDidMount() {
      document.title = "Welcome 💎"
      if (this.props.auth.isAuthenticated) {
          this.props.history.push('/Home')
      }
    }

    onChangePage(changeTo){
        this.setState({contentShow:false})
        setTimeout(() => {
            this.props.history.push(changeTo);
        }, 800);
        //this.props.history.push(changeTo);
    }

    render() {
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOutLeft" animationInDuration={2000} animationOutDuration={500} isVisible={this.state.contentShow}>
                <Scrollbar damping={0.1} continuousScrolling={true}>
                    <Outside>
                        <MenuBar bg="dark" variant="dark" expand="lg">
                            <NavStyle>KMUTT Community of Project</NavStyle>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <NavCollapse id="basic-navbar-nav" className="justify-content-end">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#News">News</Nav.Link>
                                    <Nav.Link href="#Feature">Feature</Nav.Link>
                                    <Nav.Link href="#Contract">Contract</Nav.Link>
                                </Nav>

                                <Form inline>
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        className="mr-sm-2"
                                    />
                                    <Button className="mr-2" variant="dark">
                                        Search
                    </Button>
                                </Form>
                            </NavCollapse>
                        </MenuBar>

                        <Inside>
                            <TabButton>
                                <InfoDetail>
                                    <h1>Welcome to my class room</h1>
                                    <h4>KMUTT Community of Practice</h4>
                                </InfoDetail>
                                <RowStyle>
                                    <ColLayer lg="6">
                                        <ButtonStyle onClick={this.onChangePage.bind(this, '/login')}>Login</ButtonStyle>
                                    </ColLayer>
                                    <ColLayer lg="6">
                                        <ButtonStyle onClick={this.onChangePage.bind(this,'/register')}>Register</ButtonStyle>
                                    </ColLayer>
                                </RowStyle>
                            </TabButton>
                            <TabInfo>
                                <RowDetail>
                                    <ColDetail lg="4">
                                        <img
                                            className="mt-5 mb-3"
                                            src={brian}
                                            width="200"
                                            height="200"
                                            alt="brain"
                                        />
                                        <h4>Lerning</h4>
                                        <h5>Improve your English skill</h5>
                                        <h5>Join our community here!</h5>
                                    </ColDetail>
                                    <ColDetail lg="4">
                                        <img
                                            className="mt-5 mb-3"
                                            src={calendar}
                                            width="200"
                                            height="200"
                                            alt="calendar"
                                        />
                                        <h4>Every day & Every time</h4>
                                        <h5>You are free too learn</h5>
                                        <h5>You can access anywhere</h5>
                                    </ColDetail>
                                    <ColDetail lg="4">
                                        <img
                                            className="mt-5 mb-3"
                                            src={freeDelivery}
                                            width="200"
                                            height="200"
                                            alt="freeDelivery"
                                        />
                                        <h4>It's free for everyone</h4>
                                        <h5>Espescially for KMUTT student</h5>
                                    </ColDetail>
                                </RowDetail>
                            </TabInfo>
                        </Inside>
                    </Outside>
                </Scrollbar>
            </Animated>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(IndexPage));