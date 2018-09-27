import React, { Component } from "react";
import Track from "../Track";

export default class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.albumId = "";
    this.state = {
      loading: true,
      album: ""
    };
  }

  componentDidMount() {
    this.setAlbumId();
    this.fetchAlbum();
  }

  setAlbumId() {
    this.albumId = this.props.match.params.albumId;
  }

  fetchAlbum() {
    fetch(`https://react-api-lab.herokuapp.com/albums/${this.albumId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          album: data.data
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { tracks, name, imageUrl } = this.state.album;

    return (
      <div className="row">
        <div className="col-12">
          <div className="row mb-5">
            <div className="col-3">
              <img className="img-fluid" src={imageUrl} alt="Album Cover" />
            </div>
            <div className="col-9">
              <h2>{name}</h2>
            </div>
          </div>
          <h2>TRACKS:</h2>
          <ol className="list-unstyled">
            {tracks &&
              tracks.map(track => {
                return (
                  <li key={track.trackNumber}>
                    <Track track={track} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}
