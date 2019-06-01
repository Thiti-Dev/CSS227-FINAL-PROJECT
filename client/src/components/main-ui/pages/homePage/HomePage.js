import React, { Component } from "react";

import { connect } from 'react-redux'
import { getCurrentProfile } from "../../../../redux/actions/profileActions";

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

import PostExtention from "./PostFeed";
import HomeContent from "./HomeContent";

import { Animated } from "react-animated-css";
import LoaderPage from '../loaderPage/LoaderPage'

library.add(faStroopwafel, faCoins)



const Profile = "https://scontent.fbkk13-1.fna.fbcdn.net/v/t1.0-9/34068391_1710167105717925_6315633921392377856_n.jpg?_nc_cat=108&_nc_ht=scontent.fbkk13-1.fna&oh=3f9c188b7c32686d17668c34c4871f1b&oe=5D933942";

const Outside = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
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
  background-image: url(${Profile});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 20vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image: url(${Profile});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image: url(${Profile});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 30vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image: url(${Profile});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 40vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image: url(${Profile});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 35vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image: url(${Profile});
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
  background-image: url(${Wallpaper});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 48vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 30vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 58vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image: url(${Wallpaper});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 95vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image: url(${Wallpaper});
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

class HomePage extends Component {

    componentDidMount() {
        document.title = "My Profile 🤦🏻‍"
        this.props.getCurrentProfile();
    }
    render() {
      const { user, isAuthenticated } = this.props.auth;
      const { profile, loading } = this.props.profile;

      let profileContent;

      if (profile === null || loading) {
        profileContent = (
              <LoaderPage />
          );
      } else {
        //Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
          profileContent = (
            <HomeContent profiledata={profile}/>
          )
        } else {
          //User is logged in but has no profile
          profileContent = (
            <div>
              <p className="lead text-muted">There was an error to your profile</p>
            </div>
          )
          window.localStorage.removeItem('jwtToken');
        }
      }



        return (
          <>
            <Animated animationIn="fadeIn" animationOut="fadeOutLeft" animationInDuration={5000} animationOutDuration={500} isVisible={true}>
              {profileContent}
            </Animated>
          </>
        );
    }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(HomePage);