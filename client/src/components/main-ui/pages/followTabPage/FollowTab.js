import React, { Component } from "react";
import {Link,withRouter} from 'react-router-dom'
import styled from "styled-components";
import { Image, InputGroup, FormControl, Button } from "react-bootstrap";

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

class FollowTab extends Component {
    constructor(){
        super()
        this.state = {
            findtarget: '',
            followers: []
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        console.log("view follower of id : " + this.props.currentid)
        console.log("view follower of profile : " + this.props.currentprofile)
        this.fetchFollower();
    }
    fetchFollower(){
        axios.get(`/api/profile/${this.props.currentprofile}`)
            .then(res => {
                console.log("The follower data length")
                console.log(res.data.followers.length);
                this.setState({followers: res.data.followers})
                console.log(this.state.followers)
            })
            .catch(err => {
                console.log(err);
            })
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    simepleFind(){
        console.log(this.state.findtarget);
        //this.props.history.push(`/profile/${this.state.findtarget}`);
        window.location.href = `/profile/${this.state.findtarget}`;
    }
    render() {
        let renderFollower;
        if(this.state.followers.length > 0){
            console.log("Fetching follower")
            renderFollower = this.state.followers.map((data,key) => (
                <FollowersUser key={key}>
                    <ImgUser src={data.profileURL} roundedCircle /> <a href={`/profile/${data.username}`}>{data.username}</a>
                </FollowersUser>
            ))
        }else{
            renderFollower = null
        }
        return (
            <Outside>
                <Inside>
                    <InputGroup className="mb-3 mt-3">
                        <FormControl
                            value={this.state.findtarget} onChange={this.onChange} name="findtarget" placeholder="Find friend"
                        />
                        <InputGroup.Append>
                            <Button onClick={this.simepleFind.bind(this)} variant="outline-secondary">Find</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {renderFollower}
                </Inside>
            </Outside>
        );
    }
}

export default withRouter(FollowTab);