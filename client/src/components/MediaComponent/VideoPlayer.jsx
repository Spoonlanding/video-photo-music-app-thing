import React, { Component } from 'react';
import PropTypes from 'prop-types';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './video.css';

class VideoPlayer extends Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  sources: PropTypes.array.isRequired,
  fluid: PropTypes.bool.isRequired,
  controls: PropTypes.bool.isRequired
};

export default VideoPlayer;