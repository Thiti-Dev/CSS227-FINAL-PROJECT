import React, { Component } from "react";

import { connect } from 'react-redux'
import {logoutUser} from '../../../../redux/actions/authActions'
import { dummyAction } from '../../../../redux/actions/globalActions'
import { withRouter } from 'react-router-dom'

import styled from "styled-components";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Row,
    Col,
    Image,
    ProgressBar,
    Tab,
    Tabs,
    Badge
} from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faCoins } from '@fortawesome/free-solid-svg-icons'

import Wallpaper from "./img/wallpaper.jpg";

//import PostExtention from "./PostFeed";
import PostFeed from "./PostFeed";

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";
import FollowTab from "../followTabPage/FollowTab";
import FollowingTab from '../followingTabPage/FollowingTab'

import NavBar from '../reuse/NavBar'

SmoothScrollbar.use(OverscrollPlugin);

library.add(faStroopwafel, faCoins)


//const Profile = "https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/34068391_1710167105717925_6315633921392377856_n.jpg?_nc_cat=108&_nc_ht=scontent.fbkk13-1.fna&oh=3f9c188b7c32686d17668c34c4871f1b&oe=5D933942";

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

const Inside = styled(Row)`
  background-color: #fff;
  width: 70vw;
  height: 100vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-color: #fff;
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-color: #fff;
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-color: #fff;
    width: 98vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-color: #fff;
    width: 98vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-color: #fff;
    width: 98vw;
    height: 100vh;
    margin: 0 auto;
  }
`;

const InsideLeft = styled(Col)`
  /*background-color: #eee;*/
  width: 20vw;
  height: 100vh;
  margin: 0 auto;
  margin-top: 2vh;
  @media (max-width: 1025px) {
    width: 30vw;
    height: 100vh;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 769px) {
    width: 30vw;
    height: 100vh;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 426px) {
    width: 98vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 376px) {
    width: 98vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 320px) {
    width: 98vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2vh;
  }
`;

const InsideLeftPicture = styled.div`
  /*background-color: #333;*/
  background-image: ${props => `url('${props.urlpicture}')`};

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 20vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 40vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 35vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 30vh;
    margin: 0 auto;
  }
`;

const InsideLeftInfo = styled.div`
  width: 20vw;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  @media (max-width: 1025px) {
    width: 30vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
  }
  @media (max-width: 769px) {
    width: 30vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
  }
  @media (max-width: 426px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
  }
  @media (max-width: 376px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
  }
  @media (max-width: 320px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
  }
`;

const InfoTag = styled.div`
  width: 20vw;
  margin: 0 auto;
  margin-top: 2%;
  text-align: start;
  font-family: "Mandali", sans-serif;
  @media (max-width: 1025px) {
    width: 30vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: start;
    font-family: "Mandali", sans-serif;
  }
  @media (max-width: 769px) {
    width: 30vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: start;
    font-family: "Mandali", sans-serif;
  }
  @media (max-width: 426px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: start;
    font-family: "Mandali", sans-serif;
  }
  @media (max-width: 376px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: start;
    font-family: "Mandali", sans-serif;
  }
  @media (max-width: 320px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: start;
    font-family: "Mandali", sans-serif;
  }
`;

const ButtonStyle = styled(Button)`
  width: 20vw;
  margin: 0 auto;
  margin-top: 2%;
  text-align: center;
  font-family: "Mandali", sans-serif;
  background-color: #7f8c8d;
  border: 0px;
  @media (max-width: 1025px) {
    width: 30vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    font-family: "Mandali", sans-serif;
    background-color: #7f8c8d;
    border: 0px;
  }
  @media (max-width: 769px) {
    width: 30vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    font-family: "Mandali", sans-serif;
    background-color: #7f8c8d;
    border: 0px;
  }
  @media (max-width: 426px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    font-family: "Mandali", sans-serif;
    background-color: #7f8c8d;
    border: 0px;
  }
  @media (max-width: 376px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    font-family: "Mandali", sans-serif;
    background-color: #7f8c8d;
    border: 0px;
  }
  @media (max-width: 320px) {
    width: 95vw;
    margin: 0 auto;
    margin-top: 2%;
    text-align: center;
    font-family: "Mandali", sans-serif;
    background-color: #7f8c8d;
    border: 0px;
  }
`;

const BarStyle = styled.div`
  /*background-color: #333;*/
  width: 20vw;
  height: 60vh;
  margin: 0 auto;
  margin-top: 5%;
  text-align: center;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 1025px) {
    width: 30vw;
    height: 60vh;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 769px) {
    width: 30vw;
    height: 60vh;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 426px) {
    width: 90vw;
    height: 60vh;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 376px) {
    width: 80vw;
    height: 60vh;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 320px) {
    width: 80vw;
    height: 60vh;
    margin: 0 auto;
    margin-top: 5%;
    text-align: center;
    border-top: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

const CircularProgressbarStyle = styled(CircularProgressbar)`
  /*background-color: #333;*/
  width: 15vw;
  height: 20vh;
  margin: 0 auto;
  margin-top: 1%;
  margin-bottom: 3%;
  @media (max-width: 1025px) {
    width: 20vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 769px) {
    width: 20vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 426px) {
    width: 70vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 376px) {
    width: 70vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 320px) {
    width: 70vw;
    height: 20vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
`;

const ProgressBarStyle = styled(ProgressBar)`
  /*background-color: #333;*/
  width: 15vw;
  height: 4vh;
  margin: 0 auto;
  margin-top: 1%;
  margin-bottom: 3%;
  @media (max-width: 1025px) {
    width: 20vw;
    height: 4vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 769px) {
    width: 20vw;
    height: 4vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 426px) {
    width: 70vw;
    height: 4vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 376px) {
    width: 70vw;
    height: 4vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
  @media (max-width: 320px) {
    width: 70vw;
    height: 4vh;
    margin: 0 auto;
    margin-top: 1%;
    margin-bottom: 3%;
  }
`;

const InsideRight = styled(Col)`
  width: 50vw;
  height: auto;
  margin: 20%;
  margin: 0 auto;
  margin-top: 2vh;
  @media (max-width: 1025px) {
    width: 60vw;
    height: auto;
    margin: 20%;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 769px) {
    width: 60vw;
    height: auto;
    margin: 20%;
    margin: 0 auto;
    margin-top: 2vh;
  }
  @media (max-width: 426px) {
    width: 98vw;
    height: auto;
    margin: 20%;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    width: 98vw;
    height: auto;
    margin: 20%;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    width: 98vw;
    height: auto;
    margin: 20%;
    margin: 0 auto;
  }
`;

const InsideRightPost = styled.div`
  /*background-color: #333;*/
  background-image: ${props => `url('${props.urlpicture}')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 48vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image: ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 15vh;
    margin: 0 auto;
  }
`;

const TabStye = styled.div`
  width: 48vw;
  height: auto;
  margin: 0 auto;
  margin-top: 4%;
  @media (max-width: 1025px) {
    width: 58vw;
    height: auto;
    margin: 0 auto;
    margin-top: 4%;
  }
  @media (max-width: 769px) {
    width: 58vw;
    height: auto;
    margin: 0 auto;
    margin-top: 4%;
  }
  @media (max-width: 426px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 4%;
  }
  @media (max-width: 376px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 4%;
  }
  @media (max-width: 320px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-top: 4%;
  }
`;

const percentage = 1;

class HomeContent extends Component {
  componentDidMount(){
    console.log("Prepare to load the feed")
  }

  scrollHander(e) {
    //console.log("Scrolling + " + JSON.stringify(e));
    if (e.offset.y >= e.limit.y) {
      console.log("Loading new fetch item");
      this.props.dummyAction('fetchStatus');
      //this.loadMoreContent();
    }
  }

  onChangePage(changeTo) {
    //done();
    this.props.history.push(changeTo);
    /*setTimeout(() => {
      //this.setState({ contentShow: false })
      setTimeout(() => {
        this.props.history.push(changeTo);
      }, 700);
    }, 700);*/
  }
  testFunc(stringHere){
    console.log(stringHere)
  }

  render() {
    console.log(this.props.profiledata)
    const { profiledata} = this.props
    console.log(profiledata.profileURL)
    //let renderTabContent;
    return (
      <Scrollbar damping={0.1} continuousScrolling={true} onScroll={this.scrollHander.bind(this)}>
        <Outside>
          <NavBar />

            <Inside>
                <InsideLeft>
                    <InsideLeftPicture urlpicture={profiledata.profileURL.toString()} />

                    <InsideLeftInfo>
                        <InfoTag>Username : {profiledata.username}</InfoTag>
                        <InfoTag>First name : {profiledata.firstname}</InfoTag>
                        <InfoTag>Last name : {profiledata.lastname}</InfoTag>
                        <InfoTag>Status : <Badge variant="primary">Student</Badge></InfoTag>
                        <InfoTag>Point : {profiledata.point}  <FontAwesomeIcon style={{ color: "gold" }} icon="coins" /></InfoTag>

                      <ButtonStyle onClick={this.onChangePage.bind(this,'/editProfile')}>Edit Profile</ButtonStyle>
                    </InsideLeftInfo>

                    <BarStyle>
                        <label>Level of your skill</label>
                        <CircularProgressbarStyle
                        value={profiledata.level}
                        text={profiledata.level}
                            styles={buildStyles({
                                strokeLinecap: "butt"
                            })}
                        />
                        <label>Exp.</label>
                        <ProgressBarStyle striped variant="success" animated now={profiledata.experience} />
                        <label>Read time/day</label>
                        <ProgressBarStyle striped variant="info" animated now={profiledata.readtime} />
                        <label>Monthly check in</label>
                        <ProgressBarStyle striped variant="danger" animated now={profiledata.checkin} />
                    </BarStyle>
                </InsideLeft>
                <InsideRight>
                    <InsideRightPost urlpicture={profiledata.coverURL}/>
                    <TabStye>
                        <Tabs defaultActiveKey="postStatus" transition={false}>
                            <Tab eventKey="postStatus" title="Post">
                                <PostFeed currentname={profiledata.username} currentprofileurl={profiledata.profileURL}/>
                            </Tab>
                            <Tab eventKey="followers" title="Followers">
                                <FollowTab currentid={this.props.auth.user.id} currentprofile={this.props.auth.user.username} />
                            </Tab>
                              <Tab eventKey="following" title="Following">
                    <FollowingTab currentid={this.props.auth.user.id} currentprofile={this.props.auth.user.username} />
                            </Tab>
                        </Tabs>
                    </TabStye>
                </InsideRight>
            </Inside>
        </Outside>
      </Scrollbar>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {dummyAction,logoutUser})(withRouter(HomeContent));