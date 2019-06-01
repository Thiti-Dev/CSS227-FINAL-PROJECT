import React, { Component } from "react";
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { dummyAction } from '../../../../redux/actions/globalActions'

import styled from "styled-components";
import { Form, FormGroup, Button, Col, Row, Modal , Image } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faCommentAlt,
    faShare,
    faSpinner,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";

import CommentSection from '../homePage/CommentSection'

import axios from 'axios'

library.add(faHeart, faCommentAlt, faShare, faSpinner, faTrashAlt);


const ImgUser = styled(Image)`
  width: 7%;
  height: 7%;
`;

const Outside = styled.div`
  height: "auto";
  overflow: hidden;
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

const DivPosted = styled(Col)`
  width: 98%;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  box-shadow: 0px 0px 17px -1px rgba(0, 0, 0, 0.2);
`;

const DivPostedProfile = styled.div`
  width: 100%;
  height: auto;
  padding: 2%;
  margin: 0 auto;
`;

const Delete = styled(FontAwesomeIcon)`
  font-family: "Mandali", sans-serif;
  margin-left: 2%;
  font-weight: bold;
  color: #333;

  &:hover{
      color: red;
  }
`;

const LineName = styled.div`
  margin-left: 2%;
  font-weight: bold;
  color: #2980b9;
  display: inline;
`;

const LineDate = styled.div`
  margin-left: 5%;
  font-weight: lighter;
  color: black;
  display: inline;
`;

const DivPostedContent = styled(Row)`
  width: 100%;
  height: auto;
  min-height: 15vh;
  margin: 0 auto;
`;

const LineContent = styled.div`
  padding: 2%;
`;

const DivPostedBar = styled(Row)`
  width: 100%;
  height: 5vh;
  margin: 0 auto;
  background-color: #ccc;
`;

const ButtonIconsStyleLove = styled(Button)`
  width: 50%;
  border: 0px;
  border-radius: 0px;
  color: #c0392b;
  background-color: #fff;
  margin: 0 auto;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const ButtonIconsStyleComment = styled(Button)`
  width: 50%;
  border: 0px;
  border-radius: 0px;
  color: #2980b9;
  background-color: #fff;
  margin: 0 auto;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
`;

// const ButtonIconsStyleShare = styled(Button)`
//   width: 33%;
//   border: 0px;
//   border-radius: 0px;
//   color: #16a085;
//   background-color: #fff;
//   margin: 0 auto;
// `;

const ButtonIcons = styled(FontAwesomeIcon)`
  margin: 0 auto;
`;

const Reload = styled.div`
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
  display: block;
`;

const ReloadIcon = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
  color: #333;
`;

class PostFeed extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            feeds: [],
            loaded: false,
            currentPostText: "",
            currentPage: 1,
            lastId: "dummy",
            fetching: true,
            currentPostId: null,
            nomore: false
        };

        this.onChange = this.onChange.bind(this);
    }
    

    componentDidMount() {
        console.log("current profile : " + this.props.currentid)
        this.fetchLastestFeed();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.global.currentEvent && !this.state.fetching) {
            console.log("Fetch please")
            this.setState({ currentPage: this.state.currentPage + 1 })
            this.fetchLastestFeed();
        }
    }

    fetchLastestFeed() {
        if (this.state.nomore === false) {
            this.setState({ fetching: true })
            setTimeout(() => {
                console.log("axios here")
                axios.get(`/api/post/inspect/${this.props.currentid}/status/${this.state.currentPage}/${this.state.lastId}`)
                    .then(res => {
                        //console.log(res.data)
                        let joined = this.state.feeds.concat(res.data);
                        this.setState({ feeds: joined, loaded: true, lastId: res.data[res.data.length - 1]._id, fetching: false })
                        console.log(this.state.lastId)
                    })
                    .catch(err => {
                        console.log("no More content")
                        this.setState({ fetching: false, nomore: true })
                    })
            }, 1300);
        }
    }

    /*removePost(id, dataId) {
        console.log("Tryna remove : " + dataId)
        axios.delete(`/api/post/${dataId}`)
            .then(() => {
                let array = [...this.state.feeds]; // make a separate copy of the array
                //let index = array.indexOf(id)
                if (id !== -1) {
                    array.splice(id, 1);
                    this.setState({ feeds: array });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }*/

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(postId, comments) {
        console.log("postId : " + postId);
        console.log(comments);
        this.setState({ show: true, currentComment: comments, currentPostId: postId });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    commitNewPost() {
        //this.setState({ loaded: false })
        //console.log("tryna post new feed")
        const postData = {
            text: this.state.currentPostText
        }

        axios.post('/api/post/status', postData)
            .then(res => {
                console.log(res.data)
                let array = [...this.state.feeds]; // make a separate copy of the array
                array.unshift(res.data);
                console.log(array)
                this.setState({ currentPostText: "", feeds: array ,nomore:false})
                //this.fetchLastestFeed();
            })
    }

    onLike(postId, index) {
        console.log("Liking : " + postId)
        axios.post(`/api/post/like/${postId}`)
            .then(res => {
                console.log(res.data)
                let array = [...this.state.feeds]; // make a separate copy of the array
                array[index].likes = res.data.likes
                this.setState({ feeds: array })
                //this.setState({feeds: })
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    render() {

        let renderFeed;
        let renderSpinner;
        if (this.state.fetching) {
            renderSpinner = (
                <DivPostedProfile>
                    <Reload>
                        <ReloadIcon icon="spinner" spin />
                    </Reload>
                </DivPostedProfile>
            )
        } else {
            renderSpinner = null;
        }
        if (this.state.loaded) {
            renderFeed = this.state.feeds.map((data, key) => (
                <React.Fragment key={key}>
                    <DivPosted>
                        <DivPostedProfile>
                            <LineName><ImgUser src={this.props.currentprofileurl} roundedCircle />{this.props.currentprofile}</LineName>
                            <LineDate><Moment fromNow>{data.date}</Moment></LineDate>
                            {/* <Delete onClick={() => this.removePost(key, data._id)} icon="trash-alt" /> */}
                        </DivPostedProfile>
                        <DivPostedContent>
                            <LineContent>{data.text}</LineContent>
                        </DivPostedContent>
                        <DivPostedBar>
                            <ButtonIconsStyleLove onClick={this.onLike.bind(this, data._id, key)}>
                                <ButtonIcons icon="heart" /> {data.likes.length}
                            </ButtonIconsStyleLove>
                            <ButtonIconsStyleComment onClick={this.handleShow.bind(this, data._id, data.comments)}>
                                <ButtonIcons icon="comment-alt" />
                            </ButtonIconsStyleComment>
                            {/* <ButtonIconsStyleShare>
                                <ButtonIcons icon="share" />
                            </ButtonIconsStyleShare> */}
                        </DivPostedBar>
                    </DivPosted>
                </React.Fragment>
            ))
        }
        else {
            renderFeed = (
                null
            )
        }


        return (
            <Outside>
                {/* <FormStyle>
                    <Form.Group>
                        <FormControlStyle
                            placeholder="  What are you thinking?"
                            as="textarea"
                            rows="6"
                            name="currentPostText"
                            value={this.state.currentPostText}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <DivButtonStyle>
                        <ButtonStyle size="md" onClick={this.commitNewPost.bind(this)}>Post</ButtonStyle>
                    </DivButtonStyle>
                </FormStyle> */}

                {renderFeed}

                {renderSpinner}

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#eee" }}>
                        <CommentSection fetchedcomment={this.state.currentComment} postid={this.state.currentPostId} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
            </Button>
                    </Modal.Footer>
                </Modal>
            </Outside>
        );
    }
}

const mapStateToProps = state => ({
    global: state.global
})

export default connect(mapStateToProps, { dummyAction })(PostFeed);