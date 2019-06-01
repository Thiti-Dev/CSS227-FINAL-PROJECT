import React, { Component } from "react";

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loginUser } from '../../../../redux/actions/authActions'

import styled from "styled-components";
import { Form, Button , Spinner } from "react-bootstrap";

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

import { Animated } from "react-animated-css";

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';
//import "react-awesome-button/dist/styles.css";

SmoothScrollbar.use(OverscrollPlugin);

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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media (max-width: 1025px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 35vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 769px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 55vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 426px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 376px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 321px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 5%;
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

const FormTextStyle = styled(Form.Text)`
  font-family: "Mandali", sans-serif;
  color: #aaa;
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

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            remember: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      document.title = "LogIn 🔑"
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/Home')
      };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            //this.props.history.push('/');
          /*if (nextProps.auth.isAuthenticated){
            this.onChangePage('/');
          }*/
        }

        if (nextProps.errors) {
            //console.log(nextProps.errors)
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onChangePage(changeTo,done) {
      done();
      setTimeout(() => {
        this.setState({ contentShow: false })
        setTimeout(() => {
          this.props.history.push(changeTo);
        }, 700);
      }, 700);
        //this.props.history.push(changeTo);
    }

    handleSubmit(done) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      }
      this.props.loginUser(userData, this, done);
    }
    render() {
        return (
          <Animated animationIn="fadeInLeft" animationOut="fadeOut" animationInDuration={700} animationOutDuration={1000} isVisible={this.state.contentShow}>
                <Scrollbar damping={0.1} continuousScrolling={true}>
                    <Outside>
                        <Inside>
                            <FormInside>
                                <Topic>Login</Topic>
                                <Form onSubmit={(e) => e.preventDefault()} noValidate>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control isInvalid={this.state.errors.email} name="email" onChange={this.onChange} type="email" placeholder="Enter email" />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors.email}
                                        </Form.Control.Feedback>
                                        <FormTextStyle>
                                            We'll never share your email with anyone else.
                                        </FormTextStyle>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control isInvalid={this.state.errors.password} name="password" onChange={this.onChange} type="password" placeholder="Password" />
                                        <Form.Control.Feedback type="invalid">
                                            {this.state.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check type="checkbox" label="Remember me?" id="cb-4"
                                            checked={this.state.remember}
                                            onChange={e => this.setState({ remember: e.target.checked })} />
                                    </Form.Group>
                                    <AwesomeButtonProgress
                                      type="secondary"
                                      size="small"
                                      action={(element, next) => this.handleSubmit(next)}
                                      loadingLabel="Logging In"
                                      resultLabel="👍🏽"
                                    >
                                      LogIn
                                    </AwesomeButtonProgress>
                                </Form>
                            </FormInside>
                        </Inside>
                    </Outside>
                </Scrollbar>
            </Animated>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(LoginPage));