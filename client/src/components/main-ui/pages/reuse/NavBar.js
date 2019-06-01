import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom'
import {logoutUser} from '../../../../redux/actions/authActions'

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
class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            contentShow: true,
        };

    }

    onChangePage(changeTo) {
        this.props.history.push(changeTo);
    }
    //this.props.history.push(changeTo);
  render() {
    return (
            <MenuBar bg="dark" variant="dark" expand="lg">
                <NavStyle>2Days Project</NavStyle>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <NavCollapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                        <Button onClick={this.onChangePage.bind(this,'/')} className="mr-2" variant="dark">
                            Home
                        </Button>
                    <Button onClick={this.onChangePage.bind(this, '/Community')} className="mr-2" variant="dark">
                            Community
                        </Button>
                        <Button onClick={this.onChangePage.bind(this,'/Challenge')} className="mr-2" variant="dark">
                            Challenge
                        </Button>
                    </Nav>

                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button className="mr-2" variant="dark">
                            Search
                        </Button>

                        <Button onClick={() => this.props.logoutUser()} className="mr-2" variant="dark">
                          Log Out
                        </Button>
                    </Form>
                </NavCollapse>
            </MenuBar>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(withRouter(NavBar));