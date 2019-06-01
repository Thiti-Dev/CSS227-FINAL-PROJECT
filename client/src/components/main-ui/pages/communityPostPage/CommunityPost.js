import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import styled from "styled-components";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Col,
  Image,
  Modal
} from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'
import NavBar from '../reuse/NavBar'

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";

import ModalHack from './ModalHack'

SmoothScrollbar.use(OverscrollPlugin);

library.add(faSpinner);

const Wallpaper =
  "https://images.pexels.com/photos/2089379/pexels-photo-2089379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const Profile =
  "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/49810318_2021701417897824_2087752524202246144_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk12-2.fna&oh=2af3673cd124b9475281cbf4f41b7924&oe=5D8FEF9C";

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

const ColForm = styled(Col)`
  width: 70vw;
  height: 100vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    width: 70vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }
`;

const WallpaperForm = styled.div`
  background-image: url(${Wallpaper});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 70vw;
  height: 30vh;
  margin: 0 auto;
  @media (max-width: 1025px) {
    background-image: url(${Wallpaper});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 70vw;
    height: 25vh;
    margin: 0 auto;
  }
  @media (max-width: 769px) {
    background-image: url(${Wallpaper});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 90vw;
    height: 20vh;
    margin: 0 auto;
  }
  @media (max-width: 426px) {
    background-image: url(${Wallpaper});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 15vh;
    margin: 0 auto;
  }
  @media (max-width: 376px) {
    background-image: url(${Wallpaper});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 12vh;
    margin: 0 auto;
  }
  @media (max-width: 320px) {
    background-image: url(${Wallpaper});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100vw;
    height: 10vh;
    margin: 0 auto;
  }
`;

const TopicForm = styled.div`
  background-color: #2d3436;
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 0%;
  color: #fff;
  text-align: center;
  font-family: "Mandali", sans-serif;
  font-size: 3rem;
`;

const RoomForm = styled.div`
  width: 70vw;
  height: auto;
  margin: 0 auto;
  background-color: #eee;
  @media (max-width: 1025px) {
    width: 70vw;
    height: auto;
    margin: 0 auto;
    background-color: #eee;
  }
  @media (max-width: 769px) {
    width: 90vw;
    height: auto;
    margin: 0 auto;
    background-color: #eee;
  }
  @media (max-width: 426px) {
    width: 100vw;
    height: auto;
    margin: 0 auto;
    background-color: #eee;
  }
  @media (max-width: 376px) {
    width: 100vw;
    height: auto;
    margin: 0 auto;
    background-color: #eee;
  }
  @media (max-width: 320px) {
    width: 100vw;
    height: auto;
    margin: 0 auto;
    background-color: #eee;
  }
`;

const Room = styled.div`
  width: 65vw;
  height: auto;
  margin: 0 auto;
  margin-bottom: 3%;
  padding: 2%;
  background-color: #fff;
  box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  @media (max-width: 1025px) {
    width: 65vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #fff;
    box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 769px) {
    width: 85vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #fff;
    box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 426px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #fff;
    box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 376px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #fff;
    box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 320px) {
    width: 95vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #fff;
    box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
  }
`;

const TagName = styled.div`
  width: 100%;
  height: auto;
  padding: 2%;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  color: #8e44ad;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ImgUser = styled(Image)`
  width: 8%;
  height: 8%;
`;

const TagTopic = styled.div`
  font-family: "Mandali", sans-serif;
  padding: 1%;
  height: auto;
  font-weight: bold;
  font-size: 2rem;
  color: #2980b9;
`;

const TagDetail = styled.div`
  font-family: "Mandali", sans-serif;
  padding-left: 2%;
  padding-right: 2%;
  font-weight: bold;
  color: #2d3436;
`;

const DivPostedProfile = styled.div`
  width: 100%;
  height: auto;
  padding: 1.8%;
  margin: 0 auto;
`;

const Reload = styled.div`
  width: 100%;
  margin-top: 2%;
  margin-bottom: 5%;
  display: block;
`;

const ReloadIcon = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
  color: #333;
`;

const FormStyle = styled(Form)`
  margin-top: 1.5%;
`;

const FormControlStyle = styled(Form.Control)`
  width: 100%;
  resize: none;
`;

const DivButtonStyle = styled.div`
  width: 100%;
`;

const ButtonStyle = styled(Button)`
  width: 100%;
`;

class CommunityPost extends Component {
  //eslint-disable-next-line
  constructor(){
    super();
    this.state = {
      contents: [],
      currentTitle: "",
      currentDetail: "",
      show: false,
      currentInspectId: null
    }
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.topic) {
      console.log("current topic : " + this.props.match.params.topic)
      //fetch the first start
      this.fetchPost();
    }
  }
  fetchPost(){
    console.log("Starting to fetch")
    axios.get(`/api/post/topic/${this.props.match.params.topic}`)
      .then(res => {
        console.log(res.data)
        this.setState({ contents: res.data })
      })
      .catch(err => console.log(err));
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  commitPost(){
    console.log("Try to create the new post");
    const postData = {
      title: this.state.currentTitle,
      text: this.state.currentDetail,
      topic: this.props.match.params.topic
    }
    axios.post(`/api/post/topic`, postData)
      .then(res => {
        console.log(res.data);
        this.setState({currentDetail: "" , currentTitle: ""})
        this.fetchPost();
      })
      .catch(err => console.log(err));
  }
  handleClose(){
    this.setState({show: false})
  }
  render() {
    let renderTopic;
    if(this.state.contents.length > 0){
      renderTopic = this.state.contents.map((data,key) => (
        <Room key={key} onClick={e => this.setState({ show: !this.state.show, currentInspectId: data._id })}>
          <TagName>
            <ImgUser src={data._username.profileURL} roundedCircle />
            &nbsp;&nbsp;&nbsp;&nbsp;{data._username.username}
            </TagName>
          <TagTopic>{data.title}</TagTopic>
          <TagDetail>{data.text}</TagDetail>
        </Room>
      ))
    }else{
      renderTopic = null
    }
    return (
      <Scrollbar damping={0.1} continuousScrolling={true}>
        <Outside>
          <NavBar />
          
          <Animated animationIn="slideInUp" animationOut="zoomOutDown" animationInDuration={1400} animationOutDuration={1400} isVisible={true}>

          <Inside>
            <ColForm>
              <WallpaperForm />
              <TopicForm>{this.props.match.params.topic}</TopicForm>
              <RoomForm>
                <Room>
                  <FormStyle>
                    <Form.Group>
                      <label style={{ fontSize: "2rem", fontWeight: "500" }}>
                        New topic :
                      </label>
                      <FormControlStyle
                        onChange={this.onChange}
                        name="currentTitle"
                        value={this.state.currentTitle}
                        placeholder="  Please enter topic"
                        as="textarea"
                        rows="1"
                      />
                    </Form.Group>
                    <Form.Group>
                      <FormControlStyle
                        onChange={this.onChange}
                        name="currentDetail"
                        value={this.state.currentDetail}
                        placeholder="  Detail"
                        as="textarea"
                        rows="5"
                      />
                    </Form.Group>
                    <DivButtonStyle>
                      <ButtonStyle onClick={this.commitPost.bind(this)} size="md">Post</ButtonStyle>
                    </DivButtonStyle>
                  </FormStyle>
                </Room>

                {renderTopic}

                <DivPostedProfile>
                  {/* <Reload>
                    <ReloadIcon icon="spinner" spin />
                  </Reload> */}
                </DivPostedProfile>
              </RoomForm>
            </ColForm>
          </Inside>
          </Animated>
          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#eee" }}>
              <ModalHack fetchedcomment={this.state.currentComment} postid={this.state.currentInspectId} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
            </Modal.Footer>
          </Modal>
        </Outside>
      </Scrollbar>
    );
  }
}

export default withRouter(CommunityPost);