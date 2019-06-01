import React, { Component } from "react";
import styled from "styled-components";
import { Navbar, Nav, Form, FormControl, Button, Col } from "react-bootstrap";

import NavBar from '../reuse/NavBar'

import { Animated } from "react-animated-css";

const Outside = styled.div`
  background-color: #eee;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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

const Inside = styled(Col)`
  width: 100vw;
  height: auto;
`;

const Notice = styled.div`
  margin-top: 30vh;
  width: 100vw;
`;

const NoticeI = styled.div`
  color: #333;
  text-align: center;
  font-family: "Mandali", sans-serif;
  font-size: 4rem;
  
@media (max-width: 426px) {
  color: #333;
  text-align: center;
  font-family: "Mandali", sans-serif;
  font-size: 2.5rem;
  }
  
`;

const NoticeII = styled.div`
  color: #333;
  text-align: center;
  font-family: "Mandali", sans-serif;
  font-size: 3rem;
  @media (max-width: 426px) {
  color: #333;
  text-align: center;
  font-family: "Mandali", sans-serif;
  font-size: 1.5rem;
  }
  
`;

class Challenge extends Component {
  componentDidMount(){
    document.title = "Coming soon  🤙🏻 "
  }
  render() {
    return (
      <Animated animationIn="zoomIn" animationOut="zoomOutDown" animationInDuration={1400} animationOutDuration={1400} isVisible={true}>
        <Outside>
            <NavBar />

          <Inside>
            <Notice>
              <NoticeI>#Comming Soon</NoticeI>
              <NoticeII>#See you next semester</NoticeII>
            </Notice>
          </Inside>
        </Outside>
      </Animated>
    );
  }
}

export default Challenge;