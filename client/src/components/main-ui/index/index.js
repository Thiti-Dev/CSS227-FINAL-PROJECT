import React, { Component } from 'react'

import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

import { Animated } from "react-animated-css";
import styled from 'styled-components';

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

// --------------- Commonly Used -------------------//
import {Row,Container,Col,Card,Button} from 'react-bootstrap'
// ------------------------------------------------ //

SmoothScrollbar.use(OverscrollPlugin);

class index extends Component {
  //eslint-disable-next-line
  constructor(){
    super();
    this.state = {
      show: true,
      content: []
    };

    this.loadMoreContent = this.loadMoreContent.bind(this);
  }

  componentDidMount(){
    console.log(`This is working -> ${this.props.global.isWork}`);
    console.log(`Query : ${this.props.location.search}`)
    let loopedContent = [];

    for (let x = 0; x < 20; x++) {
      loopedContent.push(
        <Card className="mb-3" style={{ width: '18rem'}}>
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card>
      )
    }
    this.setState({
      content: loopedContent
    })
  }
  goToNextPage(){
    //this.LoadingBar.continousStart();
    this.props.history.push('/register')
  }

  hideContent(){
    console.log("clicked == " , this.state.show);
    this.setState({
      show: !this.state.show
    })
    
  }

  loadMoreContent(){
    setTimeout(() => {
      console.log("hello")
      let loopedContent = [];

      for (let x = 0; x < 20; x++) {
        loopedContent.push(
          <p>testnew</p>
        )
      }
      this.setState({
        content: this.state.content.concat(loopedContent)
      })
    }, 1000)
  }

  scrollHander(e){
    //console.log("Scrolling + " + JSON.stringify(e));
    if(e.offset.y >= e.limit.y){
      console.log("Loading new fetch item");
      this.loadMoreContent();
    }
  }

  render() {
    return (
      <Scrollbar damping={0.1} continuousScrolling={true} onScroll={this.scrollHander.bind(this)}>
        <Container fluid style={{height: "100vh"}}>
            <div className="text-center justify-content-center">
                {/* {this.state.content} */}
            <Button variant="outline-primary" onClick={this.goToNextPage.bind(this)}>Go to another page</Button>
            </div>
          </Container>
      </Scrollbar>
    )
  }
}

const mapStateToProps = state => ({
  global: state.global
})

export default connect(mapStateToProps)(withRouter(index))