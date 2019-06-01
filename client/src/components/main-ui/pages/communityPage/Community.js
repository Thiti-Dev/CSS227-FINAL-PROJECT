import React, { Component } from "react";
import styled from "styled-components";
import {withRouter} from 'react-router-dom'
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Row,
    Card
} from "react-bootstrap";
import CommunityBackground from "./img/community.jpg";

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";

import NavBar from '../reuse/NavBar'

SmoothScrollbar.use(OverscrollPlugin);

const Animal =
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const Travel =
    "https://images.pexels.com/photos/2370724/pexels-photo-2370724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const Science =
    "https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const Computer =
    "https://images.pexels.com/photos/2194062/pexels-photo-2194062.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const Sport =
    "https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const Culture =
    "https://images.pexels.com/photos/1313814/pexels-photo-1313814.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const Outside = styled.div`
  background-color: #fff;
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
  height: auto;
`;

const Topic = styled.div`
  width: 100vw;
  height: 60vh;
  background-image: url(${CommunityBackground});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 1025px) {
    width: 100vw;
    height: 60vh;
    background-image: url(${CommunityBackground});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 769px) {
    width: 100vw;
    height: 60vh;
    background-image: url(${CommunityBackground});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 426px) {
    width: 100vw;
    height: 60vh;
    background-image: url(${CommunityBackground});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 376px) {
    width: 100vw;
    height: 60vh;
    background-image: url(${CommunityBackground});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 320px) {
    width: 100vw;
    height: 60vh;
    background-image: url(${CommunityBackground});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const TopicDetail = styled.div`
  text-align: center;
  color: #333;
  font-family: "Mandali", sans-serif;
  font-size: 3em;
  font-weight: bold;
  background-color: #fff;
  @media (max-width: 1025px) {
    text-align: center;
    color: #333;
    font-family: "Mandali", sans-serif;
    font-size: 3em;
    font-weight: bold;
    background-color: #fff;
  }
  @media (max-width: 769px) {
    text-align: center;
    color: #333;
    font-family: "Mandali", sans-serif;
    font-size: 2em;
    font-weight: bold;
    background-color: #fff;
  }
  @media (max-width: 426px) {
    text-align: center;
    color: #333;
    font-family: "Mandali", sans-serif;
    font-size: 1.8em;
    font-weight: bold;
    background-color: #fff;
  }
  @media (max-width: 376px) {
    text-align: center;
    color: #333;
    font-family: "Mandali", sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    background-color: #fff;
  }
  @media (max-width: 320px) {
    text-align: center;
    color: #333;
    font-family: "Mandali", sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    background-color: #fff;
  }
`;

const CardCommunity = styled(Row)`
  width: 95vw;
  height: auto;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const CardStyle = styled(Row)`
  width: 18em;
  margin: auto;
  margin-bottom: 3%;
  box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
`;

const CardImgStyle = styled(Card.Img)`
  width: 100%;
  height: 30vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

class Community extends Component {
    render() {
        return (
          <Animated animationIn="bounceInUp" animationOut="fadeOutRight" animationInDuration={1500} animationOutDuration={700} isVisible={true}>
            <Scrollbar damping={0.1} continuousScrolling={true}>
                <Outside>
                    <NavBar />

                    <Inside>
                        <Topic />
                        <TopicDetail>Welcome to our community</TopicDetail>
                        <TopicDetail>Community of Practice</TopicDetail>

                  <Animated animationIn="rubberBand" animationOut="fadeOutRight" animationInDuration={2500} animationOutDuration={700} isVisible={true}>
                          <CardCommunity>
                              <CardStyle>
                                  <CardImgStyle variant="top" src={Animal} fluid />
                                  <Card.Body>
                                      <Card.Title>Animal</Card.Title>
                                      <Card.Text>
                                          Everythings that related to the animal.
                      </Card.Text>
                                      <Button variant="primary" onClick={e => this.props.history.push('/Community/Animal')}>Go to Community</Button>
                                  </Card.Body>
                              </CardStyle>
                              <CardStyle>
                                  <CardImgStyle variant="top" src={Travel} />
                                  <Card.Body>
                                      <Card.Title>Travel</Card.Title>
                                      <Card.Text>
                                          Enjoy Travelling? post here to announce to the travellers.
                      </Card.Text>
                          <Button variant="primary" onClick={e => this.props.history.push('/Community/Travel')}>Go to Community</Button>
                                  </Card.Body>
                              </CardStyle>

                              <CardStyle>
                                  <CardImgStyle variant="top" src={Science} />
                                  <Card.Body>
                                      <Card.Title>Science</Card.Title>
                                      <Card.Text>
                                          Enjoy science? ... love chemical and others stuff?.
                      </Card.Text>
                          <Button variant="primary" onClick={e => this.props.history.push('/Community/Science')}>Go to community</Button>
                                  </Card.Body>
                              </CardStyle>
                              <CardStyle>
                                  <CardImgStyle variant="top" src={Computer} />
                                  <Card.Body>
                                      <Card.Title>Computer</Card.Title>
                                      <Card.Text>
                                          If you love computer , this is the only place that you should've been.
                      </Card.Text>
                          <Button variant="primary" onClick={e => this.props.history.push('/Community/Computer')}>Go to community</Button>
                                  </Card.Body>
                              </CardStyle>

                              <CardStyle>
                                  <CardImgStyle variant="top" src={Sport} />
                                  <Card.Body>
                                      <Card.Title>Sport</Card.Title>
                                      <Card.Text>
                                          Football , Exercise , Weight trainning , and and more.
                      </Card.Text>
                          <Button variant="primary" onClick={e => this.props.history.push('/Community/Sport')}>Go to community</Button>
                                  </Card.Body>
                              </CardStyle>
                              <CardStyle>
                                  <CardImgStyle variant="top" src={Culture} />
                                  <Card.Body>
                                      <Card.Title>Culture</Card.Title>
                                      <Card.Text>
                                          Various culture around the world waiting for you.
                      </Card.Text>
                          <Button variant="primary" onClick={e => this.props.history.push('/Community/Culture')}>Go to community</Button>
                                  </Card.Body>
                              </CardStyle>
                          </CardCommunity>
                  </Animated>
                    </Inside>
                </Outside>
            </Scrollbar>
          </Animated>
        );
    }
}

export default withRouter(Community);