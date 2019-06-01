import React, { Component } from "react";

import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import { registerUser } from '../../../../redux/actions/authActions'



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

SmoothScrollbar.use(OverscrollPlugin);

library.add(faCheckCircle);

const Outside = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
`;

const FixedScroll = styled.div`
    @media (max-width: 769px) {
        height: 130vh;
    }
`;

const Inside = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  width: 35vw;
  height: auto;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 5%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media (max-width: 1025px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 35vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 769px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 55vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 426px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 376px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 5%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  @media (max-width: 321px) {
    background-color: rgba(255, 255, 255, 0.1);
    width: 90vw;
    height: auto;
    margin: 0 auto;
    margin-top: 2%;
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
  /* color: green; */
  color: ${props => props.istrue === "true" ? "green" : "grey"};
`;

class RegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            password2: "",
            contentShow: true,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        document.title = "Register 📝"
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/Home')
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            //console.log(nextProps.errors)
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit(done) {
        console.log("Attempting to register")
        let passCheck = this.state.password.length >= 8 && this.hasLowerCase(this.state.password) && this.hasUpperCase(this.state.password) && this.hasContainedNumber(this.state.password);
        console.log(passCheck)
        const userData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(userData, this, done);
    }

    hasLowerCase(str) {
        //console.log(/[a-z]/.test(str).toString())
        return (/[a-z]/.test(str));
    }

    hasUpperCase(str) {
        return (/[A-Z]/.test(str));
    }

    hasContainedNumber(str) {
        return (/[0-9]/.test(str));
    }
    hasPassed(){
        
        let passCheck = this.state.password.length >= 8 && this.hasLowerCase(this.state.password) && this.hasUpperCase(this.state.password) && this.hasContainedNumber(this.state.password);
        console.log(passCheck);
        if(passCheck && this.state.errors.password){
            setTimeout(() => {
                let allError = this.state.errors;
                allError.password = '';
                //this.setState({ errors: { password: '' } });
                this.setState({ errors: allError });
            }, 500);
            /*var allError = this.state.errors;
            allError.password = '';
            //this.setState({ errors: { password: '' } });
            this.setState({ errors: allError });*/
        }
        return passCheck;
    }

    onChangePage(changeTo, done) {
        done();
        //this.setState({contentShow:false})
        setTimeout(() => {
            this.setState({ contentShow: false })
            setTimeout(() => {
                this.props.history.push(changeTo);
            }, 700);
        }, 700);
        //this.props.history.push(changeTo);
    }



    render() {
        return (
            <Animated animationIn="fadeInLeft" animationOut="fadeOutRight" animationInDuration={700} animationOutDuration={700} isVisible={this.state.contentShow}>
                <Scrollbar damping={0.1} continuousScrolling={true}>
                    <Outside>
                        <FixedScroll>
                            <Inside>
                                <FormInside>
                                    <Topic>Register</Topic>
                                    <Form onSubmit={(e) => e.preventDefault()} >
                                        <Form.Group>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control isInvalid={this.state.errors.firstname} name="firstname" onChange={this.onChange} type="text" placeholder="Enter first name"/>
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.errors.firstname}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control isInvalid={this.state.errors.lastname} name="lastname" onChange={this.onChange} type="text" placeholder="Enter last name" />
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.errors.lastname}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control isInvalid={this.state.errors.username} name="username" onChange={this.onChange} type="text" placeholder="Enter username" />
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.errors.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>

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
                                            <Form.Control isValid={this.hasPassed()} isInvalid={this.state.errors.password && !this.hasPassed()} name="password" onChange={this.onChange} type="password" placeholder="Password" />
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.errors.password}
                                            </Form.Control.Feedback>
                                            <FormTextStyle>
                                                Password should be
                                            <br />
                                                <IconStyle istrue={this.state.password.length >= 8 ? "true" : "false" } icon="check-circle" />
                                                &nbsp;At least 8 characters long
                                            <br />
                                                <IconStyle istrue={this.hasLowerCase(this.state.password) ? "true" : "false"} icon="check-circle" />
                                                &nbsp;Minimum one lowercase
                                            <br />
                                                <IconStyle istrue={this.hasUpperCase(this.state.password) ? "true" : "false"} icon="check-circle" />
                                                &nbsp;Minimum one uppercase
                                            <br />
                                                <IconStyle istrue={this.hasContainedNumber(this.state.password) ? "true" : "false"} icon="check-circle" />
                                                &nbsp;Minimum one number
                                            <br />
                                            </FormTextStyle>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Confirm password</Form.Label>
                                            <Form.Control isInvalid={this.state.errors.password2} name="password2" onChange={this.onChange} type="password" placeholder="Confirm password" />
                                            <Form.Control.Feedback type="invalid">
                                                {this.state.errors.password2}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check type="checkbox" label="Accept the agreement and rules" />
                                        </Form.Group>
                                        <AwesomeButtonProgress
                                            type="secondary"
                                            size="medium"
                                            action={(element, next) => this.handleSubmit(next)}
                                            loadingLabel="Registering"
                                            resultLabel="👍🏽"
                                        >
                                            Register
                                    </AwesomeButtonProgress>
                                    </Form>
                                </FormInside>
                            </Inside>
                        </FixedScroll>
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

export default connect(mapStateToProps, { registerUser })(withRouter(RegisterPage))