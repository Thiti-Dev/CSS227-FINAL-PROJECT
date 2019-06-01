import React, { Component } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { Image , InputGroup , FormControl , Button } from "react-bootstrap";

import axios from 'axios'


const Profile =
    "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/49810318_2021701417897824_2087752524202246144_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk12-2.fna&oh=2af3673cd124b9475281cbf4f41b7924&oe=5D8FEF9C";

const Outside = styled.div`
  width: 100%;
  height: auto;
`;

const Inside = styled.div`
  width: 100%;
  height: auto;
`;

const FollowersUser = styled.div`
  width: 95%;
  height: 20%;
  margin: 0 auto;
  margin-top: 3%;
  padding: 1.5%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`;

const ImgUser = styled(Image)`
  width: 8%;
  height: 8%;
`;

class FollowingTab extends Component {
    constructor() {
        super()
        this.state = {
            following: []
        }
    }

    componentDidMount() {
        console.log("view follower of id : " + this.props.currentid)
        console.log("view follower of profile : " + this.props.currentprofile)
        this.fetchFollower();
    }
    fetchFollower() {
        axios.get(`/api/profile/${this.props.currentprofile}`)
            .then(res => {
                console.log("The follower data length")
                console.log(res.data.following.length);
                this.setState({ following: res.data.following })
                console.log(this.state.following)
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {

        let renderFollower;
        if (this.state.following.length > 0) {
            console.log("Fetching follower")
            renderFollower = this.state.following.map((data, key) => (
                <FollowersUser key={key}>
                    <ImgUser src={data.profileURL} roundedCircle /> <a href={`/profile/${data.username}`}>{data.username}</a>
                </FollowersUser>
            ))
        } else {
            renderFollower = null
        }
        return (
            <Outside>
                <Inside>
                    {renderFollower}
                </Inside>
            </Outside>
        );
    }
}

export default FollowingTab