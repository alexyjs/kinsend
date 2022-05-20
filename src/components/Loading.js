import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import SPINNER_GIF from "../assets/loading.gif";
export default class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool,
  };
  render() {
    let { loading } = this.props;
    if (!loading) return null;
    return (
      <div
        className={classnames(
          "d-flex align-items-center justify-content-center loading-full"
        )}
      >
        <img src={SPINNER_GIF} />
      </div>
    );
  }
}
