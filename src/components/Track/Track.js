import React, { Component } from "react";

export default class Track extends Component {
  convertSeconds(seconds) {
    return Math.floor(seconds / 60) + "m" + Math.floor(seconds % 60) + "s";
  }

  saveTrackHandler() {
    console.log(this.props.track);
    fetch("https://react-api-lab.herokuapp.com/playlists/@pablo", {
      method: "POST",
      body: JSON.stringify({ track: this.props.track }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response;
      })
      .catch(error => console.log(error));
  }

  render() {
    const { trackNumber, name, durationInSeconds } = this.props.track;

    return (
      <div className="row mb-4">
        <div className="col-1">
          <h4>{trackNumber}</h4>
        </div>

        <div className="col-9">
          <h3>{name}</h3>
          <p>
            <em>{this.convertSeconds(durationInSeconds)}</em>
          </p>
        </div>

        <div className="col-2">
          <button onClick={() => this.saveTrackHandler()}>
            Save to playlist
          </button>
        </div>
      </div>
    );
  }
}
