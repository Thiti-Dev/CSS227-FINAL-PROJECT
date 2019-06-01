import React, { Component } from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

import CatZ from "./img/Cat_Z.png";
import NavBar from "../reuse/NavBar";

import {Animated} from 'react-animated-css'

const Outside = styled.div`
  width: 100vw;
  height: 100vh;
  display: table;
`;

const Inside = styled.div`
  width: 50%;
  height: 50%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const Notice = styled.div`
  font-family: "Mandali", sans-serif;
  font-size: 6rem;
  font-weight: 500;
  @media (max-width: 1025px) {
    font-family: "Mandali", sans-serif;
    font-size: 6rem;
    font-weight: 500;
  }
  @media (max-width: 769px) {
    font-family: "Mandali", sans-serif;
    font-size: 6rem;
    font-weight: 500;
  }
  @media (max-width: 426px) {
    font-family: "Mandali", sans-serif;
    font-size: 3.5rem;
    font-weight: 500;
  }
  @media (max-width: 376px) {
    font-family: "Mandali", sans-serif;
    font-size: 3.5rem;
    font-weight: 500;
  }
  @media (max-width: 320px) {
    font-family: "Mandali", sans-serif;
    font-size: 3rem;
    font-weight: 500;
  }
`;

class NotfoundPage extends Component {
    render() {
        return (
          <>
            <NavBar />
            <Animated animationIn="flash" animationOut="zoomOutDown" animationInDuration={3000} animationOutDuration={3000} isVisible={true}>
              <Outside>
                  <Inside>
                      <Notice>404</Notice>
                      <Notice>Not found</Notice>
                      <Image src={CatZ} />
                  </Inside>
              </Outside>
            </Animated>
            </>
        );
    }
}

export default NotfoundPage;