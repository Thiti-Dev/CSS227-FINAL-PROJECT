import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

import axios from 'axios'

SmoothScrollbar.use(OverscrollPlugin);

library.add(faCheckCircle);

const Outside = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
`;

const Inside = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 35vw;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media (max-width: 1025px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 35vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 769px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 55vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 426px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 376px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 321px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
`;

const FormInside = styled.div`
  width: 30vw;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  @media (max-width: 1025px) {
    width: 30vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  @media (max-width: 769px) {
    width: 50vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  @media (max-width: 426px) {
    width: 80vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  @media (max-width: 376px) {
    width: 80vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  @media (max-width: 321px) {
    width: 80vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

const Topic = styled.div`
  text-align: start;
  font-family: "Mandali", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #2d3436;
`;

const ButtonStyle = styled(Button)`
  font-family: "Mandali", sans-serif;
  background-color: #d63031;
  border: 0px;
`;

const FormTextStyle = styled(Form.Text)`
  font-family: "Mandali", sans-serif;
  color: #aaa;
`;

const IconStyle = styled(FontAwesomeIcon)`
  color: green;
`;

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      photo: null,
      cover: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    axios.get('/api/profile')
      .then(res => {
        console.log(res.data)
        this.setState({firstname: res.data.firstname , lastname: res.data.lastname})
      })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangePicture(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    })
  }

  handleSubmit(done){
    const newEditedProfile = {
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }
    axios.post('/api/profile/edit', newEditedProfile)
      .then(() => {
        if (this.state.photo != null && this.state.cover != null){
          console.log("found photo attached with both")
          const data = new FormData()
          data.append('file', this.state.photo)
          console.log(data)
          axios.post('/api/profile/upload', data)
            .then(res => {
               console.log(res.data);
              const data2 = new FormData()
              data2.append('file', this.state.cover)
              console.log(data)
                axios.post('/api/profile/uploadCover', data2)
                    .then(res => {
                      done();
                      setTimeout(() => {
                        this.props.history.push('/Home')
                      }, 1500);
                  })
            })
            .catch(err => console.log(err))
        }
        else if (this.state.photo != null && this.state.cover === null){
          console.log("found only photo attached")
          const data = new FormData()
          data.append('file', this.state.photo)
          console.log(data)
          axios.post('/api/profile/upload', data)
            .then(res => {
              console.log(res.data);
              done();
              setTimeout(() => {
                this.props.history.push('/Home')
              }, 1500);
            })
            .catch(err => {
              console.log(err);
            })
        }
        else if (this.state.photo === null && this.state.cover != null) {
          console.log("found only cover attached")
          const data = new FormData()
          data.append('file', this.state.cover)
          console.log(data)
          axios.post('/api/profile/uploadCover', data)
            .then(res => {
              console.log(res.data);
              done();
              setTimeout(() => {
                this.props.history.push('/Home')
              }, 1500);
            })
            .catch(err => {
              console.log(err);
            })
        }
        else {
          done();
          setTimeout(() => {
            this.props.history.push('/Home')
          }, 1500);
        }
      })
  }

    render() {
        return (
          <Scrollbar damping={0.1} continuousScrolling={true}>
              <Outside>
                  <Inside>
                      <FormInside>
                          <Topic>Edit Profile</Topic>
                          <Form onSubmit={e => e.preventDefault()}>
                              <Form.Group>
                                  <Form.Label>First name</Form.Label>
                                  <Form.Control name="firstname" onChange={this.onChange} value={this.state.firstname} type="text" placeholder="Enter first name" />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Last name</Form.Label>
                                <Form.Control name="lastname" onChange={this.onChange} value={this.state.lastname} type="text" placeholder="Enter last name" />
                              </Form.Group>
                              {/* <Form.Group>
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control type="password" placeholder="Password" />
                                  <FormTextStyle>
                                      Password should be
                    <br />
                                      <IconStyle icon="check-circle" />
                                      &nbsp;At least 8 characters long
                    <br />
                                      <FontAwesomeIcon icon="check-circle" />
                                      &nbsp;Minimum one lowercase
                    <br />
                                      <FontAwesomeIcon icon="check-circle" />
                                      &nbsp;Minimum one uppercase
                    <br />
                                      <FontAwesomeIcon icon="check-circle" />
                                      &nbsp;Minimum one number
                    <br />
                                  </FormTextStyle>
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Confirm password</Form.Label>
                                  <Form.Control type="password" placeholder="Confirm password" />
                              </Form.Group> */}
                    Select a picture: <input name="photo" type="file" onChange={this.onChangePicture.bind(this)} />
                              <Form.Group />
                    Select a wallpaper: <input name="cover" type="file" onChange={this.onChangePicture.bind(this)} />
                    <br /><br />
                            <AwesomeButtonProgress
                                    type="secondary"
                                    size="small"
                                    action={(element, next) => this.handleSubmit(next)}
                                    loadingLabel="Editing"
                                    resultLabel="👍🏽"
                                  >
                              Edit
                              </AwesomeButtonProgress>
                          </Form>
                      </FormInside>
                  </Inside>
              </Outside>
          </Scrollbar>
        );
    }
}

export default withRouter(EditProfile);