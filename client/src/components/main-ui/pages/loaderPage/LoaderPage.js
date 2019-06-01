import React, { Component } from "react";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);

const Outside = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Inside = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Loader = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
  margin-top: 40vh;
  color: #81ecec;
`;

class LoaderPage extends Component {
    render() {
        return (
            <Outside>
                <Inside>
                    <Loader className="fa-6x" icon="spinner" spin />
                </Inside>
            </Outside>
        );
    }
}

export default LoaderPage;