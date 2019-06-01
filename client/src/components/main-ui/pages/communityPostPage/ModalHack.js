import React, { Component } from "react";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

import styled from "styled-components";
import { Form, Button, Image, FormGroup , Col, Row , Modal } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'

library.add(faHeart);
const Profile =
    "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/49810318_2021701417897824_2087752524202246144_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk12-2.fna&oh=2af3673cd124b9475281cbf4f41b7924&oe=5D8FEF9C";

const Outside = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const Inside = styled.div`
  width: 100%;
  height: auto;
`;

const FieldFormComment = styled.div`
  width: 100%;
  height: auto;
  max-height: 45vh;
  overflow-y: scroll;
`;

const CommentForm = styled.div`
  width: 100%;
  height: auto;
  margin: 5% auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
`;

const TagName = styled.div`
  width: 100%;
  height: auto;
  padding: 2%;
  border-radius: 10px 10px 0 0;
  /* background-color: #fff; */
  color: #8e44ad;
  font-size: 1.2rem;
  font-weight: 500;
  display: inline;
`;

const ImgUser = styled(Image)`
  width: 8%;
  height: 8%;
  padding: 2%;
`;

const TagLineComment = styled.div`
  width: 100%;
  height: auto;
  padding: 3%;
  background-color: #fff;
`;

const TagFeelBar = styled.div`
  width: 100%;
  height: auto;
  border-radius: 0 0 10px 10px;
  background-color: #ff7675;
  padding: 2%;
`;

const FormIcon = styled.div`
  margin: 0 auto;
  width: 100%;
  height: auto;
`;

const Icon = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
  color: #fff;
`;

const CommentFiledInput = styled.div`
  width: 100%;
  height: auto;
`;

const FormGroupStyle = styled(Form.Group)`
  width: 100%;
  height: auto;
  margin-top: 2%;
  margin-bottom: 2%;
`;

const FormControlStyle = styled(Form.Control)`
  width: 100%;
  resize: none;
`;

class ModalHack extends Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            commentText: "",
            fetchedComment: [],
            loaded: false,
            timer: null
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.fetchedcomment)
        console.log(this.props.postid)

        //start fetched
        this.fetchComment();
        this.setState({
            timer: setInterval(() => {
                this.fetchComment();
            }, 3000)
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    commitComment() {
        console.log("comment now")
        const commentData = {
            text: this.state.commentText
        }
        axios.post(`/api/post/comment/${this.props.postid}`, commentData)
            .then(res => {
                console.log(res);
                this.fetchComment();
                this.setState({ commentText: "" })
            })
            .catch(err => {
                console.log(err);
            })
    }
    fetchComment() {
        axios.get(`/api/post/comment/${this.props.postid}`)
            .then(res => {
                this.setState({ fetchedComment: res.data, loaded: true })
            })
    }
    render() {
        let renderComment;
        if (this.state.loaded && this.state.fetchedComment.length > 0) {
            console.log("Found comment");
            renderComment = this.state.fetchedComment.map((data, key) => (
                <CommentForm key={key}>
                    {/* <Link to={`/profile/${data.username}`}>
            <TagName>
              <ImgUser src={data.profileURL} roundedCircle />
              {data.username}
            </TagName>
          </Link> */}
                    <a href={`/profile/${data.username}`}>
                        <TagName>
                            <ImgUser src={data.profileURL} roundedCircle />
                            {data.username}
                        </TagName>
                    </a>
                    <Moment fromNow>{data.date}</Moment>
                    <TagLineComment>{data.text}</TagLineComment>
                    <TagFeelBar>
                        <FormIcon>
                            <Icon icon="heart" />
                        </FormIcon>
                    </TagFeelBar>
                </CommentForm>
            ))
        } else {
            renderComment = null
        }
        return (
            <Outside>
                <Inside>
                    <FieldFormComment>
                        {renderComment}
                        {/* <CommentForm>
              <TagName>
                <ImgUser src={Profile} roundedCircle />
                User
              </TagName>
              <TagLineComment>Hello World</TagLineComment>
              <TagFeelBar>
                <FormIcon>
                  <Icon icon="heart" />
                </FormIcon>
              </TagFeelBar>
            </CommentForm>

            <CommentForm>
              <TagName>
                <ImgUser src={Profile} roundedCircle />
                User
              </TagName>
              <TagLineComment>Hello World</TagLineComment>
              <TagFeelBar>
                <FormIcon>
                  <Icon icon="heart" />
                </FormIcon>
              </TagFeelBar>
            </CommentForm>

            <CommentForm>
              <TagName>
                <ImgUser src={Profile} roundedCircle />
                User
              </TagName>
              <TagLineComment>Hello World</TagLineComment>
              <TagFeelBar>
                <FormIcon>
                  <Icon icon="heart" />
                </FormIcon>
              </TagFeelBar>
            </CommentForm>

            <CommentForm>
              <TagName>
                <ImgUser src={Profile} roundedCircle />
                User
              </TagName>
              <TagLineComment>Hello World</TagLineComment>
              <TagFeelBar>
                <FormIcon>
                  <Icon icon="heart" />
                </FormIcon>
              </TagFeelBar>
            </CommentForm>*/}
                    </FieldFormComment>

                    <CommentFiledInput>
                        <FormGroupStyle>
                            <FormControlStyle value={this.state.commentText} onChange={this.onChange} name="commentText" as="textarea" rows="3" />
                        </FormGroupStyle>
                        <Button onClick={this.commitComment.bind(this)} style={{ width: "100%" }}>Comment</Button>
                    </CommentFiledInput>
                </Inside>
            </Outside>
        );
    }
}

export default ModalHack;
