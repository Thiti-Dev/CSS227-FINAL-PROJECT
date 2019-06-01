import React, { Component } from "react";
import { connect } from 'react-redux'
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

import PostFeed from "./PostFeed";

import axios from 'axios'

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";
import FollowTab from "../followTabPage/FollowTab";
import FollowingTab from '../followingTabPage/FollowingTab'

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

import LoaderPage from '../loaderPage/LoaderPage'

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
  background-image:  ${props => `url('${props.urlpicture}')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 20vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 40vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 35vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
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

const ButtonStyleAsync = styled(AwesomeButtonProgress)`
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
  background-image:  ${props => `url('${props.urlpicture}')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 48vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image:  ${props => `url('${props.urlpicture}')`};
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

class InspectProfile extends Component {
    constructor() {
      super();
      this.state = {
        profile: {},
        errors: {},
        loaded: false
      };

      //this.onChange = this.onChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.profileId) {

          if (this.props.auth.user.username === this.props.match.params.profileId){
            this.props.history.push('/Home');
          }else{
            console.log(this.props.match.params.profileId)
            axios.get(`/api/profile/${this.props.match.params.profileId}`)
              .then(res => {
                console.log(res.data);
                this.setState({ profile: res.data, loaded: true })
              })
              .catch(err => {
                console.log(err);
                this.props.history.push('/profile-is-not-found');
              })
          }
            //this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

  scrollHander(e) {
    //console.log("Scrolling + " + JSON.stringify(e));
    if (e.offset.y >= e.limit.y) {
      console.log("Loading new fetch item");
      this.props.dummyAction('fetchStatus');
      //this.loadMoreContent();
    }
  }
  commitFollow(userId,done){
    console.log("Try to follow user id : " + userId);
    axios.post(`/api/profile/follow/${userId}`)
      .then(res => {
        console.log(res.data);
        //this.setState({ loaded: false })
        done();
        setTimeout(() => {
          this.refreshFollower();
          this.setState({ loaded: false })
        }, 1200);
        //this.setState({profile: res.data})
        //let array = [...this.state.profile];
        //console.log(array)
        /*array.followers = res.data.followers;
        this.setState({profile: array})*/
      })
      .catch(err => {
        console.log(err.response.data);
        done(false, '🤞🏽 Already followed');
        //this.props.history.push('/profile-is-not-found');
      })
  }
  refreshFollower(){
    axios.get(`/api/profile/${this.props.match.params.profileId}`)
      .then(res => {
        console.log(res.data);
        this.setState({ profile: res.data, loaded: true })
      })
  }


  render() {

    let profileContent;
    let renderTabContent;
    let allContent;

    if(this.state.loaded){
        profileContent = (
          <InsideLeft>
            <InsideLeftPicture urlpicture={this.state.profile.profileURL}/>

            <InsideLeftInfo>
              <InfoTag>Username : {this.state.profile.username}</InfoTag>
              <InfoTag>First name : {this.state.profile.firstname}</InfoTag>
              <InfoTag>Last name : {this.state.profile.lastname}</InfoTag>
              <InfoTag>Status : <Badge variant="primary">Student</Badge></InfoTag>
              <InfoTag>Point : {this.state.profile.point}  <FontAwesomeIcon style={{ color: "gold" }} icon="coins" /></InfoTag>

              {/* <ButtonStyle onClick={this.commitFollow.bind(this, this.state.profile._id)}>Follow</ButtonStyle> */}
                  <AwesomeButtonProgress
                      style={{width:"100%"}}
                      type="secondary"
                      size="large"
                      action={(element, next) => { this.commitFollow(this.state.profile._id,next)}}
                      loadingLabel="Following"
                      resultLabel="👍🏽"
                  >
                      Follow
              </AwesomeButtonProgress>
            </InsideLeftInfo>

            <BarStyle>
              <label>Level of your skill</label>
              <CircularProgressbarStyle
                value={ this.state.profile.level }
                text={this.state.profile.level}
                styles={buildStyles({
                  strokeLinecap: "butt"
                })}
              />
              <label>Exp.</label>
              <ProgressBarStyle striped variant="success" animated now={this.state.profile.experience} />
              <label>Read time/day</label>
              <ProgressBarStyle striped variant="info" animated now={this.state.profile.readtime} />
              <label>Monthly check in</label>
              <ProgressBarStyle striped variant="danger" animated now={this.state.profile.checkin} />
            </BarStyle>
          </InsideLeft>
        )
        renderTabContent = (
          <TabStye>
            <Tabs defaultActiveKey="postStatus" transition={false}>
              <Tab eventKey="postStatus" title="Post">
                <PostFeed currentid={this.state.profile._id} currentprofile={this.props.match.params.profileId} currentprofileurl={this.state.profile.profileURL}/>
              </Tab>
              <Tab eventKey="followers" title="Followers" >
                <FollowTab currentid={this.state.profile._id} currentprofile={this.props.match.params.profileId}/>
              </Tab>
              <Tab eventKey="following" title="Following">
                <FollowingTab currentid={this.state.profile._id} currentprofile={this.props.match.params.profileId} />
              </Tab>
            </Tabs>
          </TabStye>
        )
          allContent = (
            <Outside>
                <NavBar />

              <Inside>
                {profileContent}
                <InsideRight>
                  <InsideRightPost urlpicture={this.state.profile.coverURL} />
                  {renderTabContent}
                </InsideRight>
              </Inside>
            </Outside>
          )

    }else{
      allContent = (
        <LoaderPage />
      )
    }

    return (
      <Animated animationIn="zoomIn" animationOut="zoomOutDown" animationInDuration={1400} animationOutDuration={1400} isVisible={true}>
        <Scrollbar damping={0.1} continuousScrolling={true} onScroll={this.scrollHander.bind(this)}>
          {allContent}

        </Scrollbar>
      </Animated>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {dummyAction})(withRouter(InspectProfile));